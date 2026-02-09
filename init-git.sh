#!/bin/bash

# Git初始化脚本
# 用于初始化Git仓库并推送到GitHub

set -e  # 遇到错误时退出

echo "=== My OpenCode Tool Git初始化 ==="
echo ""

# 检查是否已初始化
if [ -d ".git" ]; then
    echo "⚠️  Git仓库已初始化"
    echo "   跳过初始化步骤"
else
    echo "1. 初始化Git仓库..."
    git init
    echo "✅ Git仓库初始化完成"
fi
echo ""

# 添加所有文件
echo "2. 添加文件到Git..."
git add .
echo "✅ 文件已添加"
echo ""

# 检查是否有未提交的更改
if git diff --cached --quiet; then
    echo "⚠️  没有需要提交的更改"
    echo "   跳过提交步骤"
else
    echo "3. 提交更改..."
    git commit -m "Initial release v1.0.0

- Add package.json for npm installation
- Add comprehensive README.md (English/Chinese)
- Add Node.js installation instructions and links
- Add offline packages system with download/install scripts
- Add GitHub issue and PR templates
- Add complete project documentation
- Add license file (MIT)
- Add dependency management instructions
- Add disclaimer (not official OpenCode tool)"
    echo "✅ 提交完成"
fi
echo ""

# 检查远程仓库
echo "4. 检查远程仓库..."
if git remote | grep -q origin; then
    echo "✅ 远程仓库已设置: $(git remote get-url origin)"
else
    echo "⚠️  远程仓库未设置"
    echo "   请手动设置: git remote add origin https://github.com/jabing/my-opencode.git"
fi
echo ""

# 推送到GitHub
echo "5. 推送到GitHub..."
echo "   运行: git push -u origin main"
echo "   注意: 如果分支名不是main，请相应调整"
echo ""

# 创建标签
echo "6. 创建版本标签..."
echo "   运行: git tag v1.0.0"
echo "   运行: git push --tags"
echo ""

# GitHub Releases
echo "7. 创建GitHub Release:"
echo "   访问: https://github.com/jabing/my-opencode/releases/new"
echo "   选择标签: v1.0.0"
echo "   标题: v1.0.0 - Initial Release"
echo "   描述: 包含完整的安装说明和离线支持"
echo ""

# 验证
echo "8. 验证安装:"
echo "   测试命令: npm install -g https://github.com/jabing/my-opencode.git"
echo "   验证: oad --help"
echo ""

echo "=== 初始化完成 ==="
echo ""
echo "手动执行以下命令完成推送:"
echo ""
echo "1. 设置远程仓库 (如果未设置):"
echo "   git remote add origin https://github.com/jabing/my-opencode.git"
echo ""
echo "2. 推送到GitHub:"
echo "   git push -u origin main"
echo ""
echo "3. 创建标签:"
echo "   git tag v1.0.0"
echo "   git push --tags"
echo ""
echo "4. 创建GitHub Release (在网页界面完成)"
echo ""
echo "5. 测试安装:"
echo "   npm install -g https://github.com/jabing/my-opencode.git"
echo "   oad --help"
echo ""
echo "更多信息请查看:"
echo "- INITIAL_SETUP.md - GitHub仓库设置指南"
echo "- README.md - 完整项目文档"
echo "- offline-packages/README.md - 离线安装指南"