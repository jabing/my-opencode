#!/bin/bash

# GitCode推送脚本
# 使用方法：在GitCode上创建访问令牌后运行此脚本

echo "🚀 准备推送到GitCode仓库..."

# 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
echo "当前分支: $CURRENT_BRANCH"

# 检查是否有未提交的更改
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  有未提交的更改，请先提交"
    git status
    exit 1
fi

# 推送到GitHub（确保最新）
echo "📤 推送到GitHub..."
git push origin $CURRENT_BRANCH

# 提示用户如何推送到GitCode
echo ""
echo "📋 推送到GitCode的步骤："
echo ""
echo "1. 访问 https://gitcode.com/jabing/my-opencode"
echo "2. 点击右上角头像 → 设置 → 访问令牌"
echo "3. 创建新的访问令牌（选择所有仓库权限）"
echo "4. 复制令牌"
echo ""
echo "5. 使用以下命令推送："
echo "   git push https://<你的令牌>@gitcode.com/jabing/my-opencode.git $CURRENT_BRANCH"
echo ""
echo "或者使用SSH（需要添加SSH密钥到GitCode）："
echo "   git push git@gitcode.com:jabing/my-opencode.git $CURRENT_BRANCH"
echo ""
echo "6. 设置GitCode为默认推送仓库："
echo "   git remote set-url --push origin https://<令牌>@gitcode.com/jabing/my-opencode.git"
echo "   git remote set-url --add --push origin https://github.com/jabing/my-opencode.git"

echo ""
echo "✅ 所有文档已更新为支持GitCode"
echo "🌐 GitHub: https://github.com/jabing/my-opencode"
echo "🇨🇳 GitCode: https://gitcode.com/jabing/my-opencode"