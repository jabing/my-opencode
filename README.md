# My OpenCode Tool

OpenCode Agent Constitution 部署工具 / OpenCode Agent Constitution Deployment Tool

[English](#english) | [中文](#中文)

---

## English

### Overview

My OpenCode Tool is a professional deployment utility for setting up OpenCode Agent Constitution in any project. It automates the installation and configuration of the 6-role AI development team framework.

### Features

- 🚀 **One-command deployment** of Agent Constitution
- 🔧 **Automatic OpenCode installation** with offline fallback
- 📦 **Smart network detection** - tries multiple sources
- 🌐 **Multi-platform support** (Windows, macOS, Linux)
- 🔄 **GitCode mirror support** for Chinese users
- 🛡️ **Offline installation** capability

### Installation

#### Method 1: Install from GitHub (Recommended for international users)

```bash
# Install globally
npm install -g https://github.com/jabing/my-opencode.git

# Or install locally in your project
npm install --save-dev https://github.com/jabing/my-opencode.git
```

#### Method 2: Install from GitCode (Recommended for users in China)

```bash
# Install globally
npm install -g https://gitcode.com/jabing/my-opencode.git

# Or install locally in your project
npm install --save-dev https://gitcode.com/jabing/my-opencode.git
```

#### Method 3: Clone and install locally

```bash
# Clone from GitHub
git clone https://github.com/jabing/my-opencode.git
# Or clone from GitCode (faster in China)
git clone https://gitcode.com/jabing/my-opencode.git

cd my-opencode

# Install globally
npm install -g .

# Or use directly
node setup-opencode.js
```

#### Method 4: Use npx (no installation)

```bash
# Run directly without installation
npx https://raw.githubusercontent.com/jabing/my-opencode/main/setup-opencode.js deploy
# Or from GitCode
npx https://gitcode.com/jabing/my-opencode/raw/main/setup-opencode.js deploy
```

### Quick Start

1. **Install the tool**:
   ```bash
   npm install -g https://github.com/jabing/my-opencode.git
   ```

2. **Navigate to your project**:
   ```bash
   cd /path/to/your/project
   ```

3. **Deploy Agent Constitution**:
   ```bash
   oad deploy
   ```

4. **Follow the prompts** to install OpenCode if needed

### Offline Installation

If you're in an environment without internet access:

#### Option 1: Use pre-downloaded offline packages

1. **Download packages when online**:
   ```bash
   # Clone the repository
   git clone https://github.com/jabing/my-opencode.git
   cd my-opencode/offline-packages
   
   # Download all dependencies (requires internet)
   ./download-packages.sh
   ```

2. **Copy to offline environment**:
   ```bash
   # Copy the entire offline-packages directory
   cp -r offline-packages/ /path/to/offline/environment/
   ```

3. **Install in offline environment**:
   ```bash
   cd /path/to/offline/environment/offline-packages
   ./install-offline.sh
   ```

#### Option 2: Manual offline installation

1. **Install Node.js manually**:
   - Windows: Run `offline-packages/nodejs/windows/node-installer.msi`
   - macOS: Run `offline-packages/nodejs/macos/node-installer.pkg`
   - Linux: Extract `offline-packages/nodejs/linux/node-*.tar.xz`

2. **Install Git manually** (if needed):
   - Windows: Run `offline-packages/git/windows/git-installer.exe`
   - macOS: Run `offline-packages/git/macos/git-installer.pkg`
   - Linux: Install `offline-packages/git/linux/git*.deb`

3. **Install OpenCode manually**:
   ```bash
   # Extract OpenCode to user directory
   mkdir -p ~/.opencode/bin
   
   # Windows
   unzip offline-packages/opencode/windows/opencode-windows-x64.zip -d ~/.opencode/bin
   
   # macOS (Intel)
   unzip offline-packages/opencode/macos/opencode-darwin-x64.zip -d ~/.opencode/bin
   
   # macOS (Apple Silicon)
   unzip offline-packages/opencode/macos/opencode-darwin-arm64.zip -d ~/.opencode/bin
   
   # Linux
   tar -xzf offline-packages/opencode/linux/opencode-linux-x64.tar.gz -d ~/.opencode/bin
   
   # Set permissions (Linux/macOS)
   chmod +x ~/.opencode/bin/opencode
   ```

4. **Install My OpenCode Tool**:
   ```bash
   # Navigate to project directory
   cd /path/to/my-opencode
   
   # Install locally
   npm install -g .
   ```

### Available Commands

After installation, you can use any of these commands:

```bash
# Using the full command
my-opencode

# Using the alias
opencode-setup

# Short alias
oad

# With options
oad --force
oad --global
oad --source /path/to/agent-constitution
```

### Command Options

```bash
# Deploy Agent Constitution
oad deploy [options]

Options:
  -f, --force                 Overwrite existing files
  --no-disable-builtins       Do not disable built-in agents
  -s, --source <path>         Path to agent-constitution source
  -g, --global                Install globally (user config)
  -p, --project               Install to project (default)
  -h, --help                  Display help

# Check OpenCode installation
oad check-opencode

# Install OpenCode only
oad install-opencode [--offline]
```

### Agent Constitution Overview

This tool deploys a 6-role professional AI development team:

1. **🎼 Conductor** - Final arbiter, controls iteration and termination
2. **🔍 Analyst** - Defines problem boundaries and verifiability
3. **📋 Planner** - Produces executable tasks without implementation details
4. **🔨 Implementer** - Executes tasks exactly as specified
5. **✅ Reviewer** - Validates compliance only
6. **🧪 Tester** - Provides reproducible evidence only

### Requirements

#### Required Dependencies

1. **Node.js 12.0 or higher**
   - Download: [https://nodejs.org/](https://nodejs.org/)
   - Recommended: LTS version (Long Term Support)
   - Verification: `node --version`

2. **Git** (required for downloading Agent Constitution)
   - Download: [https://git-scm.com/downloads](https://git-scm.com/downloads)
   - Verification: `git --version`

3. **Internet connection** (or offline packages)

#### Optional Dependencies

4. **OpenCode CLI** (will be installed automatically if missing)
   - Official: [https://opencode.ai](https://opencode.ai)
   - Verification: `opencode --version`

5. **curl or wget** (for downloading OpenCode)
   - Usually pre-installed on macOS and Linux
   - Windows: Included in Windows 10+ or install separately

### Dependency Management

#### Offline Installation Support

When official networks are unavailable, you can use offline packages from the `offline-packages/` directory:

```bash
# Structure of offline-packages directory
offline-packages/
├── nodejs/           # Node.js installers (planned)
│   ├── windows/
│   ├── macos/
│   └── linux/
├── git/              # Git installers (planned)
│   ├── windows/
│   ├── macos/
│   └── linux/
├── opencode/         # OpenCode binaries (planned)
│   ├── windows/
│   ├── macos/
│   └── linux/
└── README.md         # Offline installation guide
```

#### Installing Node.js

**Windows:**
1. Download installer from [nodejs.org](https://nodejs.org/)
2. Run the installer (.msi file)
3. Check "Add to PATH" during installation
4. Verify: Open Command Prompt and run `node --version`

**macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Or download from website
# https://nodejs.org/download/
```

**Linux:**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Fedora/RHEL
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install nodejs

# Arch Linux
sudo pacman -S nodejs npm
```

#### Verifying Installation

```bash
# Check Node.js
node --version  # Should show v12.0.0 or higher
npm --version   # Should show npm version

# Check Git
git --version   # Should show git version

# Check OpenCode (after installation)
opencode --version
```

### Troubleshooting

#### Permission Issues

```bash
# On Linux/macOS
sudo npm install -g https://github.com/jabing/my-opencode.git

# Or install without sudo
npm install -g --prefix ~/.npm-global https://github.com/jabing/my-opencode.git
```

#### Command Not Found

```bash
# Add npm global bin to PATH
export PATH="$PATH:$(npm bin -g)"
```

#### Network Issues in China

```bash
# The tool automatically tries GitCode mirrors
# You can also set proxy:
export https_proxy=http://your-proxy:port
```

### Development

```bash
# Clone the repository
git clone https://github.com/jabing/my-opencode.git
cd my-opencode

# Run the tool
node setup-opencode.js

# Or install locally for testing
npm install -g .
```

### License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 中文

### 概述

My OpenCode Tool 是一个专业的部署工具，用于在任何项目中设置 OpenCode Agent Constitution。它自动化了6角色AI开发团队框架的安装和配置。

### 功能特点

- 🚀 **一键部署** Agent Constitution
- 🔧 **自动安装OpenCode**，支持离线回退
- 📦 **智能网络检测** - 尝试多个源
- 🌐 **多平台支持** (Windows, macOS, Linux)
- 🔄 **GitCode镜像支持** - 为中国用户优化
- 🛡️ **离线安装** 能力

### 安装方法

#### 方法1：从GitHub安装（国际用户推荐）

```bash
# 全局安装
npm install -g https://github.com/jabing/my-opencode.git

# 或在项目中本地安装
npm install --save-dev https://github.com/jabing/my-opencode.git
```

#### 方法2：从GitCode安装（中国用户推荐）

```bash
# 全局安装
npm install -g https://gitcode.com/jabing/my-opencode.git

# 或在项目中本地安装
npm install --save-dev https://gitcode.com/jabing/my-opencode.git
```

#### 方法3：克隆并本地安装

```bash
# 从GitHub克隆
git clone https://github.com/jabing/my-opencode.git
# 或从GitCode克隆（中国用户更快）
git clone https://gitcode.com/jabing/my-opencode.git

cd my-opencode

# 全局安装
npm install -g .

# 或直接使用
node setup-opencode.js
```

#### 方法4：使用npx（无需安装）

```bash
# 直接运行，无需安装
npx https://raw.githubusercontent.com/jabing/my-opencode/main/setup-opencode.js deploy
# 或从GitCode
npx https://gitcode.com/jabing/my-opencode/raw/main/setup-opencode.js deploy
```

### 快速开始

1. **安装工具**：
   ```bash
   npm install -g https://github.com/jabing/my-opencode.git
   ```

2. **进入项目目录**：
   ```bash
   cd /path/to/your/project
   ```

3. **部署Agent Constitution**：
   ```bash
   oad deploy
   ```

4. **按照提示** 安装OpenCode（如果需要）

### 离线安装

如果您在没有网络访问的环境中使用：

#### 选项1：使用预下载的离线包

1. **在有网络时下载包**：
   ```bash
   # 克隆仓库
   git clone https://github.com/jabing/my-opencode.git
   cd my-opencode/offline-packages
   
   # 下载所有依赖（需要网络）
   ./download-packages.sh
   ```

2. **复制到离线环境**：
   ```bash
   # 复制整个 offline-packages 目录
   cp -r offline-packages/ /path/to/offline/environment/
   ```

3. **在离线环境中安装**：
   ```bash
   cd /path/to/offline/environment/offline-packages
   ./install-offline.sh
   ```

#### 选项2：手动离线安装

1. **手动安装Node.js**：
   - Windows: 运行 `offline-packages/nodejs/windows/node-installer.msi`
   - macOS: 运行 `offline-packages/nodejs/macos/node-installer.pkg`
   - Linux: 解压 `offline-packages/nodejs/linux/node-*.tar.xz`

2. **手动安装Git**（如果需要）：
   - Windows: 运行 `offline-packages/git/windows/git-installer.exe`
   - macOS: 运行 `offline-packages/git/macos/git-installer.pkg`
   - Linux: 安装 `offline-packages/git/linux/git*.deb`

3. **手动安装OpenCode**：
   ```bash
   # 解压OpenCode到用户目录
   mkdir -p ~/.opencode/bin
   
   # Windows
   unzip offline-packages/opencode/windows/opencode-windows-x64.zip -d ~/.opencode/bin
   
   # macOS (Intel)
   unzip offline-packages/opencode/macos/opencode-darwin-x64.zip -d ~/.opencode/bin
   
   # macOS (Apple Silicon)
   unzip offline-packages/opencode/macos/opencode-darwin-arm64.zip -d ~/.opencode/bin
   
   # Linux
   tar -xzf offline-packages/opencode/linux/opencode-linux-x64.tar.gz -d ~/.opencode/bin
   
   # 设置权限 (Linux/macOS)
   chmod +x ~/.opencode/bin/opencode
   ```

4. **安装My OpenCode Tool**：
   ```bash
   # 进入项目目录
   cd /path/to/my-opencode
   
   # 本地安装
   npm install -g .
   ```

### 可用命令

安装后，您可以使用以下命令：

```bash
# 使用完整命令
my-opencode

# 使用别名
opencode-setup

# 简短别名
oad

# 带选项
oad --force
oad --global
oad --source /path/to/agent-constitution
```

### 命令选项

```bash
# 部署Agent Constitution
oad deploy [选项]

选项：
  -f, --force                 覆盖现有文件
  --no-disable-builtins       不禁用内置代理
  -s, --source <路径>         agent-constitution源路径
  -g, --global                全局安装（用户配置）
  -p, --project               安装到项目（默认）
  -h, --help                  显示帮助

# 检查OpenCode安装
oad check-opencode

# 仅安装OpenCode
oad install-opencode [--offline]
```

### Agent Constitution 概述

此工具部署一个6角色的专业AI开发团队：

1. **🎼 指挥家 (Conductor)** - 最终决策者，控制迭代和终止
2. **🔍 分析师 (Analyst)** - 定义问题边界和可验证性
3. **📋 规划师 (Planner)** - 生成可执行任务，不包含实现细节
4. **🔨 实施者 (Implementer)** - 严格按照规划执行任务
5. **✅ 评审员 (Reviewer)** - 仅验证合规性
6. **🧪 测试员 (Tester)** - 仅提供可复现的证据

### 系统要求

#### 必需依赖

1. **Node.js 12.0 或更高版本**
   - 下载地址：[https://nodejs.org/](https://nodejs.org/)
   - 推荐：LTS版本（长期支持版）
   - 验证：`node --version`

2. **Git**（用于下载Agent Constitution）
   - 下载地址：[https://git-scm.com/downloads](https://git-scm.com/downloads)
   - 验证：`git --version`

3. **网络连接**（或离线包）

#### 可选依赖

4. **OpenCode CLI**（如果缺失会自动安装）
   - 官方网站：[https://opencode.ai](https://opencode.ai)
   - 验证：`opencode --version`

5. **curl 或 wget**（用于下载OpenCode）
   - macOS和Linux通常已预装
   - Windows：Windows 10+已包含或需单独安装

### 依赖管理

#### 离线安装支持

当官方网络不可用时，您可以使用 `offline-packages/` 目录中的离线包：

```bash
# offline-packages 目录结构
offline-packages/
├── nodejs/           # Node.js安装程序（计划中）
│   ├── windows/
│   ├── macos/
│   └── linux/
├── git/              # Git安装程序（计划中）
│   ├── windows/
│   ├── macos/
│   └── linux/
├── opencode/         # OpenCode二进制文件（计划中）
│   ├── windows/
│   ├── macos/
│   └── linux/
└── README.md         # 离线安装指南
```

#### 安装Node.js

**Windows：**
1. 从 [nodejs.org](https://nodejs.org/) 下载安装程序
2. 运行安装程序（.msi文件）
3. 安装过程中勾选"Add to PATH"
4. 验证：打开命令提示符并运行 `node --version`

**macOS：**
```bash
# 使用Homebrew（推荐）
brew install node

# 或从网站下载
# https://nodejs.org/download/
```

**Linux：**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Fedora/RHEL
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install nodejs

# Arch Linux
sudo pacman -S nodejs npm
```

#### 验证安装

```bash
# 检查Node.js
node --version  # 应显示 v12.0.0 或更高版本
npm --version   # 应显示npm版本

# 检查Git
git --version   # 应显示git版本

# 检查OpenCode（安装后）
opencode --version
```

### 故障排除

#### 权限问题

```bash
# 在Linux/macOS上
sudo npm install -g https://github.com/jabing/my-opencode.git

# 或不使用sudo安装
npm install -g --prefix ~/.npm-global https://github.com/jabing/my-opencode.git
```

#### 命令未找到

```bash
# 将npm全局bin目录添加到PATH
export PATH="$PATH:$(npm bin -g)"
```

#### 中国网络问题

```bash
# 工具会自动尝试GitCode镜像
# 您也可以设置代理：
export https_proxy=http://your-proxy:port
```

### 开发

```bash
# 克隆仓库
git clone https://github.com/jabing/my-opencode.git
cd my-opencode

# 运行工具
node setup-opencode.js

# 或本地安装测试
npm install -g .
```

### 许可证

MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

---

## 重要声明

**⚠️ 免责声明：此项目非OpenCode官方团队出品**

This project is NOT officially affiliated with or endorsed by the OpenCode team. It is an independent tool created by the community to enhance the OpenCode experience.

此项目**不是**OpenCode官方团队的产品或官方支持的工具。这是一个由社区创建的独立工具，旨在增强OpenCode的使用体验。

### 与官方工具的区别

| 特性 | 官方OpenCode | My OpenCode Tool |
|------|-------------|------------------|
| 开发团队 | OpenCode官方团队 | 社区开发者 |
| 主要功能 | AI代码助手核心功能 | Agent Constitution部署工具 |
| 安装方式 | 官方安装脚本 | npm/GitHub安装 |
| 支持渠道 | 官方文档和支持 | GitHub Issues |
| 更新频率 | 定期官方发布 | 社区维护 |

### 使用建议

1. **官方工具优先**：对于核心AI编码功能，请使用官方OpenCode工具
2. **互补使用**：此工具用于部署和管理Agent Constitution环境
3. **问题反馈**：遇到问题请在GitHub Issues中报告
4. **贡献欢迎**：欢迎提交Pull Request改进工具

### 相关链接

- [OpenCode官方网站](https://opencode.ai)
- [OpenCode GitHub仓库](https://github.com/anomalyco/opencode)
- [Agent Constitution项目](https://github.com/jabing/agent-constitution)

---

**最后更新**: 2026年2月8日  
**版本**: 1.0.0  
**维护者**: jabing  
**许可证**: MIT