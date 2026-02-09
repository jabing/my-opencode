#!/usr/bin/env node
/**
 * OpenCode Agent Constitution deployer
 * 
 * Correct structure:
 * 1. Source files in: ~/.config/opencode/agent-constitution/
 * 2. Wrapper files in: ~/.config/opencode/agents/
 * 3. Only conductor.md is visible, others are hidden subagents
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

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

function copyFileSync(src, dst) {
  ensureDir(path.dirname(dst));
  fs.copyFileSync(src, dst);
}

function checkGitAvailable() {
  try {
    execSync('git --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function cloneRepo(repoUrl, targetDir) {
  try {
    console.log(`📥 Cloning from ${repoUrl}...`);
    
    if (exists(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
    
    ensureDir(path.dirname(targetDir));
    
    execSync(`git clone "${repoUrl}" "${targetDir}"`, {
      stdio: 'pipe',
      shell: true,
      timeout: 60000
    });
    return true;
  } catch (error) {
    console.log(`❌ Failed to clone: ${error.message}`);
    return false;
  }
}

function getSourceDir() {
  return path.join(os.homedir(), ".config", "opencode", "agent-constitution");
}

function getAgentsDir() {
  return path.join(os.homedir(), ".config", "opencode", "agents");
}

// Convert Windows paths to POSIX for OpenCode {file:...} references
function toPosix(p) {
  return p.split(path.sep).join("/");
}

// Get relative path from agents directory to source file
function getRelativePath(fromDir, toFile) {
  const rel = path.relative(fromDir, toFile);
  return toPosix(rel);
}

async function main() {
  console.log("🔧 OpenCode Agent Constitution Deployer");
  
  // Check git
  if (!checkGitAvailable()) {
    console.log("❌ Git is not available. Please install git first.");
    process.exit(1);
  }
  
  // Create source directory
  const sourceDir = getSourceDir();
  ensureDir(sourceDir);
  
  // Try to clone from GitHub or GitCode
  const repoUrls = [
    "https://github.com/jabing/agent-constitution.git",
    "https://gitcode.com/jabing/agent-constitution.git"
  ];
  
  let cloned = false;
  for (const url of repoUrls) {
    if (cloneRepo(url, sourceDir)) {
      cloned = true;
      break;
    }
  }
  
  if (!cloned) {
    console.log("❌ Failed to download agent-constitution");
    process.exit(1);
  }
  
  // Verify source files exist
  const requiredFiles = [
    path.join(sourceDir, "governance", "CONDUCTOR.md"),
    path.join(sourceDir, "agents", "analyst.md"),
    path.join(sourceDir, "agents", "planner.md"),
    path.join(sourceDir, "agents", "implementer.md"),
    path.join(sourceDir, "agents", "reviewer.md"),
    path.join(sourceDir, "agents", "tester.md"),
  ];
  
  for (const file of requiredFiles) {
    if (!exists(file)) {
      console.log(`❌ Required file not found: ${file}`);
      process.exit(1);
    }
  }
  
  console.log("✅ Source files verified");
  
  // Create agents directory
  const agentsDir = getAgentsDir();
  ensureDir(agentsDir);
  
  // Calculate relative paths for {file:...} references
  const inc = {
    conductor: getRelativePath(agentsDir, path.join(sourceDir, "governance", "CONDUCTOR.md")),
    analyst: getRelativePath(agentsDir, path.join(sourceDir, "agents", "analyst.md")),
    planner: getRelativePath(agentsDir, path.join(sourceDir, "agents", "planner.md")),
    implementer: getRelativePath(agentsDir, path.join(sourceDir, "agents", "implementer.md")),
    reviewer: getRelativePath(agentsDir, path.join(sourceDir, "agents", "reviewer.md")),
    tester: getRelativePath(agentsDir, path.join(sourceDir, "agents", "tester.md")),
  };
  
  // Create wrapper agent files
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
  
  console.log("📋 Creating agent wrapper files...");
  for (const [name, content] of agentFiles) {
    const filePath = path.join(agentsDir, name);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`  ✔ ${name}`);
  }
  
  console.log("\n✅ Agent Constitution deployed!");
  console.log(`📁 Source files: ${sourceDir}`);
  console.log(`📁 Agent wrappers: ${agentsDir}`);
  console.log("\n📝 Usage:");
  console.log("   1. Restart OpenCode");
  console.log("   2. Select 'conductor' as your primary agent");
  console.log("   3. Talk only to conductor (other agents are hidden subagents)");
  console.log("   4. Conductor will delegate to appropriate subagents as needed");
}

main().catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});