#!/usr/bin/env node
/**
 * Universal OpenCode Agent Constitution deployer (cross-platform).
 *
 * What it does (run from ANY project root):
 * 1) Finds an agent-constitution source repo (auto-detect)
 * 2) If not present in project, installs minimal files into:
 *      .opencode/vendor/agent-constitution/
 * 3) Generates .opencode/agents/*.md (primary conductor + 5 hidden subagents)
 * 4) Optionally writes .opencode/opencode.json (disable build/plan)
 *
 * Usage:
 *   node setup-opencode.js
 *   node setup-opencode.js --force
 *   node setup-opencode.js --no-disable-builtins
 *   node setup-opencode.js --source /path/to/agent-constitution
 *
 * Optional env:
 *   AGENT_CONSTITUTION_HOME=/path/to/agent-constitution
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

function parseArgs(argv) {
  const args = {
    force: false,
    disableBuiltins: true,
    source: null, // optional override
    installDir: ".opencode/vendor/agent-constitution", // where we install if project lacks vendor
    global: null, // true=global, false=project, null=ask
  };

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--force") args.force = true;
    else if (a === "--no-disable-builtins") args.disableBuiltins = false;
    else if (a === "--source" && argv[i + 1]) args.source = argv[++i];
    else if (a === "--global") args.global = true;
    else if (a === "--project") args.global = false;
    else if (a === "--help" || a === "-h") help(0);
    else {
      console.error(`Unknown arg: ${a}`);
      help(1);
    }
  }
  return args;
}

function help(code) {
  console.log(`
Universal OpenCode deployer for Agent Constitution

Run this from ANY project root to deploy:
  .opencode/agents/{conductor,analyst,planner,implementer,reviewer,tester}.md
  (and optionally .opencode/opencode.json)

Options:
  --force                 Overwrite existing files
  --no-disable-builtins    Do not write .opencode/opencode.json to disable build/plan
  --source <path>         Explicit path to agent-constitution source repo
  --global               Install globally to user config directory
  --project              Install to project directory (default)
  -h, --help              Show help

Env:
  AGENT_CONSTITUTION_HOME Path to agent-constitution source repo

Auto-detect order:
  1) <project>/vendor/agent-constitution
  2) AGENT_CONSTITUTION_HOME
  3) ~/.config/opencode/agent-constitution (Linux/Mac) or %APPDATA%\\opencode\\agent-constitution (Windows)
  4) (if none found) error with instructions

Installation modes:
  --global:   Installs to user's config directory, shared across all projects
  --project:  Installs to .opencode/vendor/agent-constitution/ in current project
`);
  process.exit(code);
}

function exists(p) {
  try {
    fs.accessSync(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filepath, content, force) {
  if (exists(filepath) && !force) return { written: false, reason: "exists" };
  fs.writeFileSync(filepath, content, "utf8");
  return { written: true };
}

// Windows-safe: OpenCode {file:...} expects forward slashes
function toPosix(p) {
  return p.split(path.sep).join("/");
}

function relFrom(baseDir, targetAbs) {
  const rel = path.relative(baseDir, targetAbs);
  return toPosix(rel);
}

function validateSourceRoot(srcRoot) {
  const required = [
    path.join(srcRoot, "agents", "analyst.md"),
    path.join(srcRoot, "agents", "planner.md"),
    path.join(srcRoot, "agents", "implementer.md"),
    path.join(srcRoot, "agents", "reviewer.md"),
    path.join(srcRoot, "agents", "tester.md"),
    path.join(srcRoot, "governance", "CONDUCTOR.md"),
    path.join(srcRoot, "governance", "AGENT_CONSTITUTION.md"),
  ];
  return required.every(exists);
}

function copyFileSyncSafe(src, dst) {
  ensureDir(path.dirname(dst));
  fs.copyFileSync(src, dst);
}

function installMinimalIntoProject(srcRoot, projectRoot, installRel) {
  const installRoot = path.resolve(projectRoot, installRel);

  const filesToCopy = [
    // governance
    ["governance/CONDUCTOR.md", "governance/CONDUCTOR.md"],
    ["governance/AGENT_CONSTITUTION.md", "governance/AGENT_CONSTITUTION.md"],
    // agents
    ["agents/analyst.md", "agents/analyst.md"],
    ["agents/planner.md", "agents/planner.md"],
    ["agents/implementer.md", "agents/implementer.md"],
    ["agents/reviewer.md", "agents/reviewer.md"],
    ["agents/tester.md", "agents/tester.md"],
  ];

  for (const [from, to] of filesToCopy) {
    const absFrom = path.join(srcRoot, from);
    const absTo = path.join(installRoot, to);
    copyFileSyncSafe(absFrom, absTo);
  }

  return installRoot;
}

function checkGitAvailable() {
  try {
    execSync('git --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

function checkOpenCodeInstalled() {
  try {
    execSync('opencode --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function getOpenCodeVersion() {
  try {
    const output = execSync('opencode --version', { stdio: 'pipe' }).toString().trim();
    // Extract version number (e.g., "1.1.53" from "opencode 1.1.53")
    const match = output.match(/(\d+\.\d+\.\d+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

function isOpenCodeVersionCompatible(version) {
  if (!version) return false;
  
  // Parse version components
  const [major, minor, patch] = version.split('.').map(Number);
  
  // Minimum compatible version: 1.0.0
  if (major < 1) return false;
  if (major === 1 && minor < 0) return false;
  
  // Check for known incompatible versions
  const incompatibleVersions = [
    '1.0.0-beta.1',
    '1.0.0-rc.1'
  ];
  
  if (incompatibleVersions.includes(version)) {
    return false;
  }
  
  return true;
}

function testNetworkConnection(url, timeout = 5000) {
  return new Promise((resolve) => {
    const https = require('https');
    const req = https.request(url, { method: 'HEAD', timeout }, (res) => {
      resolve(res.statusCode === 200 || res.statusCode === 302);
    });
    
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
}

function getCurrentPlatform() {
  const platform = os.platform();
  if (platform === 'win32') return 'windows';
  if (platform === 'darwin') return 'macos';
  return 'linux';
}

function getCurrentArchitecture() {
  const arch = os.arch();
  if (arch === 'arm64' || arch === 'aarch64') return 'arm64';
  return 'x64';
}

async function installOpenCodeFromBackup() {
  const platform = getCurrentPlatform();
  const arch = getCurrentArchitecture();
  
  console.log(`💻 Detected platform: ${platform}-${arch}`);
  console.log(`📦 Installing OpenCode from backup files...`);
  
  // 构建备份文件路径
  const backupDir = path.join(__dirname, 'offline-packages', 'opencode');
  let backupFile = null;
  
  // 根据平台选择备份文件
  if (platform === 'windows') {
    backupFile = path.join(backupDir, 'windows', 'opencode-windows-x64.zip');
  } else if (platform === 'macos') {
    if (arch === 'arm64') {
      backupFile = path.join(backupDir, 'macos', 'opencode-darwin-arm64.zip');
    } else {
      backupFile = path.join(backupDir, 'macos', 'opencode-darwin-x64.zip');
    }
  } else { // linux
    backupFile = path.join(backupDir, 'linux', 'opencode-linux-x64.tar.gz');
  }
  
  // 检查备份文件是否存在
  if (!exists(backupFile)) {
    console.log(`❌ Backup file not found: ${backupFile}`);
    console.log(`   Please download OpenCode manually from:`);
    console.log(`   https://github.com/anomalyco/opencode/releases`);
    return false;
  }
  
  console.log(`✅ Found backup file: ${path.basename(backupFile)}`);
  
  try {
    const installDir = path.join(os.homedir(), '.opencode', 'bin');
    const tempDir = path.join(os.tmpdir(), `opencode-install-${Date.now()}`);
    
    // 创建临时目录
    ensureDir(tempDir);
    
    // 解压文件
    console.log(`📦 Extracting OpenCode...`);
    if (backupFile.endsWith('.zip')) {
      // Windows/macOS ZIP文件
      if (platform === 'win32') {
        // Windows使用PowerShell解压
        execSync(`powershell -Command "Expand-Archive -Path '${backupFile}' -DestinationPath '${tempDir}' -Force"`, {
          stdio: 'inherit'
        });
      } else {
        // macOS使用unzip
        execSync(`unzip -q '${backupFile}' -d '${tempDir}'`, {
          stdio: 'inherit'
        });
      }
    } else if (backupFile.endsWith('.tar.gz')) {
      // Linux TAR.GZ文件
      execSync(`tar -xzf '${backupFile}' -C '${tempDir}'`, {
        stdio: 'inherit'
      });
    }
    
    // 复制到安装目录
    console.log(`📁 Copying to install directory...`);
    ensureDir(installDir);
    
    const sourceFile = path.join(tempDir, 'opencode');
    const targetFile = path.join(installDir, 'opencode');
    
    if (exists(sourceFile)) {
      fs.copyFileSync(sourceFile, targetFile);
      
      // 设置执行权限（Linux/macOS）
      if (platform !== 'win32') {
        fs.chmodSync(targetFile, 0o755);
      }
      
      console.log(`✅ OpenCode installed successfully!`);
      console.log(`   Installed to: ${installDir}`);
      
      // 尝试添加到PATH
      addToPathIfNeeded(installDir);
      
      return true;
    } else {
      console.log(`❌ OpenCode executable not found in backup package`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Installation error: ${error.message}`);
    return false;
  }
}

function addToPathIfNeeded(installDir) {
  // 简化版的PATH添加逻辑
  const pathEnv = process.env.PATH || '';
  if (!pathEnv.includes(installDir)) {
    console.log(`💡 Please add OpenCode to your PATH:`);
    console.log(`   export PATH="${installDir}:$PATH"`);
    console.log(`   Or restart your terminal`);
  }
}

async function installOpenCodeAuto() {
  console.log(`🔧 OpenCode not found, attempting automatic installation...`);
  
  // 首先尝试官方安装
  console.log(`🌐 Trying official installation...`);
  const officialUrl = 'https://opencode.ai';
  
  if (await testNetworkConnection(officialUrl)) {
    console.log(`✅ Official website accessible, trying curl installation...`);
    try {
      execSync('curl -fsSL https://opencode.ai/install | bash', {
        stdio: 'inherit',
        timeout: 300000,
        shell: true
      });
      
      // 验证安装
      if (checkOpenCodeInstalled()) {
        console.log(`✅ OpenCode installed successfully via official method`);
        return true;
      }
    } catch (error) {
      console.log(`❌ Official installation failed: ${error.message}`);
    }
  } else {
    console.log(`❌ Official website not accessible`);
  }
  
  // 官方安装失败，尝试备用安装
  console.log(`🔄 Trying backup installation from project files...`);
  return await installOpenCodeFromBackup();
}

function cloneRepo(repoUrl, targetDir) {
  try {
    console.log(`📥 Cloning from ${repoUrl}...`);
    
    // Clean up any existing directory first
    if (exists(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
    
    ensureDir(path.dirname(targetDir));
    
    // Use shell: true for Windows compatibility
    const options = { 
      stdio: 'pipe',
      shell: true,
      timeout: 60000 // 60 second timeout
    };
    
    execSync(`git clone "${repoUrl}" "${targetDir}"`, options);
    return true;
  } catch (error) {
    console.log(`❌ Failed to clone from ${repoUrl}: ${error.message}`);
    // Clean up partial clone
    try {
      if (exists(targetDir)) {
        fs.rmSync(targetDir, { recursive: true, force: true });
      }
    } catch (e) {
      // Ignore cleanup errors
    }
    return false;
  }
}

function downloadAndInstall(installDir, useGlobal) {
  const repoUrls = [
    "https://github.com/jabing/agent-constitution.git",
    "https://gitcode.com/jabing/agent-constitution.git"
  ];
  
  for (const url of repoUrls) {
    if (cloneRepo(url, installDir)) {
      if (validateSourceRoot(installDir)) {
        console.log(`✅ Successfully downloaded and installed to ${installDir}`);
        return { kind: "downloaded", root: installDir };
      } else {
        console.log(`❌ Downloaded repository but validation failed`);
        // Clean up the invalid directory
        try {
          fs.rmSync(installDir, { recursive: true, force: true });
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    }
  }
  
  return { kind: "download-failed", root: null };
}

function findSource(projectRoot, explicitSource, useGlobal = false) {
  // For explicit --source, always use that regardless of global/local choice
  if (explicitSource) {
    const abs = path.resolve(projectRoot, explicitSource);
    if (validateSourceRoot(abs)) return { kind: "explicit", root: abs };
    return { kind: "explicit-invalid", root: abs };
  }

  // Check env var next (can be global or local)
  const env = process.env.AGENT_CONSTITUTION_HOME;
  if (env) {
    const abs = path.resolve(env);
    if (validateSourceRoot(abs)) return { kind: "env", root: abs };
    return { kind: "env-invalid", root: abs };
  }

  if (useGlobal) {
    // --global: ONLY check global directory
    const globalDefault = getGlobalConfigDir();
    if (validateSourceRoot(globalDefault)) return { kind: "global", root: globalDefault };
  } else {
    // --project or default: ONLY check project directory
    const projectVendor = path.join(projectRoot, "vendor", "agent-constitution");
    if (validateSourceRoot(projectVendor)) return { kind: "project-vendor", root: projectVendor };
  }

  // 5) Try to download if no local installation found
  console.log("🔍 No local agent-constitution found, attempting to download...");
  
  if (!checkGitAvailable()) {
    console.log("❌ Git is not available. Please install git first.");
    return { kind: "none", root: null };
  }
  
  // Install to the appropriate directory based on user's choice
  let installDir;
  if (useGlobal) {
    installDir = getGlobalConfigDir();
    console.log(`🌍 Installing globally to: ${installDir}`);
  } else {
    installDir = path.join(projectRoot, "vendor", "agent-constitution");
    console.log(`📁 Installing locally to: ${installDir}`);
  }
  
  const downloadResult = downloadAndInstall(installDir, useGlobal);
  if (downloadResult.kind === "downloaded") {
    return downloadResult;
  }

  return { kind: "none", root: null };
}

function getGlobalConfigDir() {
  const platform = os.platform();
  if (platform === "win32") {
    return path.join(process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming"), "opencode", "agent-constitution");
  } else {
    return path.join(os.homedir(), ".config", "opencode", "agent-constitution");
  }
}

function askInstallationMode() {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question("Choose installation mode:\n  1) Project-level (.opencode/vendor/agent-constitution/)\n  2) Global (~/.config/opencode/agent-constitution/ or %APPDATA%\\opencode\\agent-constitution\\)\n  Enter choice [1-2]: ", (answer) => {
      rl.close();
      const choice = answer.trim();
      if (choice === "2") {
        resolve(true); // global
      } else {
        resolve(false); // project (default)
      }
    });
  });
}

async function main() {
  const args = parseArgs(process.argv);
  const projectRoot = process.cwd();

  // Check if OpenCode is installed
  console.log(`🔍 Checking OpenCode installation...`);
  if (!checkOpenCodeInstalled()) {
    console.log(`⚠️  OpenCode is not installed`);
    
    // Try to install OpenCode automatically
    const installed = await installOpenCodeAuto();
    
    if (!installed) {
      console.log(`
❌ Failed to install OpenCode

Please install OpenCode manually:
1. Visit: https://opencode.ai
2. Or download from: https://github.com/anomalyco/opencode/releases
3. Or use backup files in: offline-packages/opencode/

Then run this script again.
`);
      process.exit(1);
    }
    
    // Verify installation after auto-install
    if (!checkOpenCodeInstalled()) {
      console.log(`❌ OpenCode installation verification failed`);
      console.log(`💡 Please restart your terminal or add to PATH manually`);
      process.exit(1);
    }
    
    console.log(`✅ OpenCode installed successfully, continuing...`);
  } else {
    console.log(`✅ OpenCode is already installed`);
    
    // Check version compatibility
    const version = getOpenCodeVersion();
    if (version) {
      console.log(`📦 OpenCode version: ${version}`);
      
      if (!isOpenCodeVersionCompatible(version)) {
        console.log(`⚠️  Warning: OpenCode version ${version} may not be fully compatible`);
        console.log(`💡 Recommended: Update to latest version from https://opencode.ai`);
      }
    }
  }

  // Determine installation mode early to use in findSource
  let useGlobal = args.global;
  if (useGlobal === null) {
    useGlobal = await askInstallationMode();
  }

  const src = findSource(projectRoot, args.source, useGlobal);

  if (src.kind.endsWith("invalid")) {
    console.error(`❌ Invalid agent-constitution source: ${src.root}`);
    console.error("   Missing required files (agents/* and governance/*).");
    process.exit(1);
  }

  // Installation mode was determined above

  let effectiveRoot = null;
  let installed = false;
  let installLocation = "";

  if (src.kind === "project-vendor") {
    effectiveRoot = src.root;
    installLocation = "project vendor";
  } else if (src.kind === "downloaded") {
    effectiveRoot = src.root;
    installed = false; // Already installed during download
    installLocation = useGlobal ? "global download" : "project download";
  } else if (src.kind === "explicit" || src.kind === "env" || src.kind === "global") {
    if (useGlobal) {
      // Install to global config directory
      const globalDir = getGlobalConfigDir();
      effectiveRoot = installMinimalIntoProject(src.root, path.dirname(globalDir), path.basename(globalDir));
      installed = true;
      installLocation = "global config";
    } else {
      // Install minimal to project-local .opencode/vendor/... to keep paths stable & portable.
      effectiveRoot = installMinimalIntoProject(src.root, projectRoot, args.installDir);
      installed = true;
      installLocation = "project-local";
    }
  } else {
    console.error("❌ Cannot find or download agent-constitution source repo.");
    console.error("Options:");
    console.error("  A) Ensure git is installed and you have internet access");
    console.error("  B) Add it to this project: vendor/agent-constitution/");
    console.error("  C) Set env: AGENT_CONSTITUTION_HOME=/path/to/agent-constitution");
    const globalDir = getGlobalConfigDir();
    console.error(`  D) Put it here: ${globalDir}`);
    console.error("  E) Or run with: --source /path/to/agent-constitution");
    process.exit(1);
  }

  const opencodeDir = path.join(projectRoot, ".opencode");
  const opencodeAgentsDir = path.join(opencodeDir, "agents");
  ensureDir(opencodeAgentsDir);

  // Build include paths from .opencode/agents -> effectiveRoot
  const inc = {
    conductor: relFrom(opencodeAgentsDir, path.join(effectiveRoot, "governance", "CONDUCTOR.md")),
    analyst: relFrom(opencodeAgentsDir, path.join(effectiveRoot, "agents", "analyst.md")),
    planner: relFrom(opencodeAgentsDir, path.join(effectiveRoot, "agents", "planner.md")),
    implementer: relFrom(opencodeAgentsDir, path.join(effectiveRoot, "agents", "implementer.md")),
    reviewer: relFrom(opencodeAgentsDir, path.join(effectiveRoot, "agents", "reviewer.md")),
    tester: relFrom(opencodeAgentsDir, path.join(effectiveRoot, "agents", "tester.md")),
  };

  const agentFiles = [
    ["conductor.md", `---
description: Final arbiter. Controls iteration and termination.
mode: primary
temperature: 0.0
permission:
  task:
    "*": deny
    analyst: allow
    planner: allow
    implementer: allow
    reviewer: allow
    tester: allow
---

{file:${inc.conductor}}
`],
    ["analyst.md", `---
description: Defines problem boundaries and verifiability. No solutions.
mode: subagent
temperature: 0.1
tools:
  write: false
  edit: false
  bash: false
hidden: true
---

{file:${inc.analyst}}
`],
    ["planner.md", `---
description: Produces executable tasks without implementation details.
mode: subagent
temperature: 0.1
tools:
  write: false
  edit: false
  bash: false
hidden: true
---

{file:${inc.planner}}
`],
    ["implementer.md", `---
description: Executes tasks exactly as specified. No scope expansion.
mode: subagent
temperature: 0.2
tools:
  write: true
  edit: true
  bash: true
hidden: true
---

{file:${inc.implementer}}
`],
    ["reviewer.md", `---
description: Validates compliance only. No suggestions.
mode: subagent
temperature: 0.1
tools:
  write: false
  edit: false
  bash: false
hidden: true
---

{file:${inc.reviewer}}
`],
    ["tester.md", `---
description: Provides reproducible evidence only.
mode: subagent
temperature: 0.1
tools:
  write: false
  edit: false
  bash: false
hidden: true
---

{file:${inc.tester}}
`],
  ];

  const results = [];
  for (const [name, content] of agentFiles) {
    const out = path.join(opencodeAgentsDir, name);
    results.push({ file: out, ...writeFile(out, content, args.force) });
  }

  if (args.disableBuiltins) {
    const opencodeJsonPath = path.join(opencodeDir, "opencode.json");
    const opencodeJson = `{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "build": { "disable": true },
    "plan": { "disable": true }
  }
}
`;
    results.push({ file: opencodeJsonPath, ...writeFile(opencodeJsonPath, opencodeJson, args.force) });
  }

console.log("✅ Agent Constitution deployed for OpenCode.");
  console.log(`Project root: ${projectRoot}`);
  console.log(`Source used : ${src.kind}${installed ? ` (installed to ${installLocation})` : ""}`);
  console.log("");

  for (const r of results) {
    const rel = path.relative(projectRoot, r.file);
    if (r.written) console.log(`  ✔ wrote: ${rel}`);
    else console.log(`  ↷ skip : ${rel} (exists; use --force to overwrite)`);
  }

  if (installed) {
    console.log("\nNote:");
    if (useGlobal) {
      const globalDir = getGlobalConfigDir();
      console.log(`  Minimal agent-constitution files were installed to: ${globalDir}`);
      console.log("  This will be shared across all projects.");
    } else {
      console.log(`  Minimal agent-constitution files were installed into: ${args.installDir}/`);
      console.log("  This keeps the project portable and avoids requiring a global setup.");
    }
  }

  console.log("\nNext:");
  console.log("  1) Open this project in OpenCode");
  console.log("  2) Switch primary agent to: conductor");
  console.log("  3) Talk only to conductor (subagents are hidden by design)");
}

main().catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
