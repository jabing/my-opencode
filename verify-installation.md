# 安装验证指南

此文档帮助用户验证 My OpenCode Tool 是否正确安装。

## 验证步骤

### 步骤1：检查Node.js环境
```bash
node --version
# 应该显示: v12.0.0 或更高版本

npm --version
# 应该显示npm版本号
```

### 步骤2：测试GitHub安装（模拟）
```bash
# 在项目目录中测试本地安装
npm install -g .

# 验证命令是否可用
my-opencode --help
opencode-setup --help
oad --help

# 所有三个命令应该显示相同的帮助信息
```

### 步骤3：测试直接运行
```bash
# 无需安装，直接运行
node setup-opencode.js --help
```

### 步骤4：测试卸载
```bash
# 清理测试环境
npm uninstall -g my-opencode-tool

# 验证命令已移除
which my-opencode  # 应该返回空或错误
```

## 用户安装验证

### 对于最终用户
用户安装后应该能够运行：

```bash
# 安装
npm install -g https://github.com/jabing/my-opencode.git

# 验证
oad --help

# 输出应该显示：
# Universal OpenCode deployer for Agent Constitution
# Run this from ANY project root to deploy:
#   .opencode/agents/{conductor,analyst,planner,implementer,reviewer,tester}.md
```

### 常见问题解决

#### 问题1：命令未找到
```bash
# 解决方案：检查PATH
echo $PATH
# 确保包含npm全局bin目录

# 添加PATH（Linux/macOS）
export PATH="$PATH:$(npm bin -g)"

# 或重新安装到用户目录
npm install -g --prefix ~/.npm-global https://github.com/jabing/my-opencode.git
```

#### 问题2：权限错误
```bash
# 解决方案A：使用sudo
sudo npm install -g https://github.com/jabing/my-opencode.git

# 解决方案B：修复npm权限
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

#### 问题3：网络连接问题
```bash
# 解决方案A：使用npx（无需安装）
npx https://raw.githubusercontent.com/jabing/my-opencode/main/setup-opencode.js --help

# 解决方案B：手动下载
curl -O https://raw.githubusercontent.com/jabing/my-opencode/main/setup-opencode.js
node setup-opencode.js --help
```

## 功能验证清单

- [ ] Node.js版本 >= 12.0.0
- [ ] npm可用
- [ ] 可以从GitHub安装
- [ ] 命令别名工作正常
- [ ] 帮助信息显示正确
- [ ] 可以成功卸载

## 测试环境

| 环境 | 状态 | 备注 |
|------|------|------|
| Windows + Node.js | ✅ 预期正常 | 需要管理员权限 |
| macOS + Node.js | ✅ 预期正常 | 可能需要sudo |
| Linux + Node.js | ✅ 预期正常 | 可能需要sudo |
| 无网络环境 | ⚠️ 需要离线包 | 计划功能 |

## 报告问题

如果安装验证失败，请在GitHub Issues中报告：

1. 访问：https://github.com/jabing/my-opencode/issues
2. 使用Bug Report模板
3. 提供详细的错误信息

## 成功标志

安装成功时，用户应该能够：
1. 使用 `oad` 命令
2. 看到完整的帮助信息
3. 在任意项目目录中运行 `oad deploy`

---

**验证完成标志**: ✅ 所有测试通过  
**支持**: GitHub Issues  
**文档**: README.md