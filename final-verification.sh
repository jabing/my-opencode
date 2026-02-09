#!/bin/bash

# My OpenCode Tool 最终验证脚本
# 验证所有功能和文件

echo "=== My OpenCode Tool 最终验证 ==="
echo "生成时间: $(date)"
echo ""

# 1. 检查基本文件
echo "1. 检查基本文件..."
required_files=(
    "setup-opencode.js"
    "package.json"
    "README.md"
    "LICENSE"
    ".gitignore"
    "AGENTS.md"
)

missing_files=0
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (缺失)"
        missing_files=$((missing_files + 1))
    fi
done

if [ $missing_files -gt 0 ]; then
    echo "  ❌ 缺失 $missing_files 个必需文件"
else
    echo "  ✅ 所有必需文件存在"
fi
echo ""

# 2. 检查离线包目录
echo "2. 检查离线包目录..."
offline_dirs=(
    "offline-packages/"
    "offline-packages/nodejs/"
    "offline-packages/git/"
    "offline-packages/opencode/"
)

missing_dirs=0
for dir in "${offline_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "  ✅ $dir"
    else
        echo "  ❌ $dir (缺失)"
        missing_dirs=$((missing_dirs + 1))
    fi
done

offline_files=(
    "offline-packages/README.md"
    "offline-packages/download-packages.sh"
    "offline-packages/install-offline.sh"
)

for file in "${offline_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (缺失)"
        missing_dirs=$((missing_dirs + 1))
    fi
done

if [ $missing_dirs -gt 0 ]; then
    echo "  ⚠️  缺失 $missing_dirs 个离线包目录/文件"
else
    echo "  ✅ 离线包目录完整"
fi
echo ""

# 3. 检查GitHub模板
echo "3. 检查GitHub模板..."
github_files=(
    ".github/ISSUE_TEMPLATE/bug_report.md"
    ".github/ISSUE_TEMPLATE/feature_request.md"
    ".github/PULL_REQUEST_TEMPLATE.md"
)

missing_github=0
for file in "${github_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (缺失)"
        missing_github=$((missing_github + 1))
    fi
done

if [ $missing_github -gt 0 ]; then
    echo "  ⚠️  缺失 $missing_github 个GitHub模板文件"
else
    echo "  ✅ GitHub模板完整"
fi
echo ""

# 4. 检查文档文件
echo "4. 检查文档文件..."
doc_files=(
    "CHANGELOG.md"
    "CONTRIBUTING.md"
    "INITIAL_SETUP.md"
    "PROJECT_SUMMARY.md"
    "verify-installation.md"
    "test-install.sh"
)

missing_docs=0
for file in "${doc_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (缺失)"
        missing_docs=$((missing_docs + 1))
    fi
done

if [ $missing_docs -gt 0 ]; then
    echo "  ⚠️  缺失 $missing_docs 个文档文件"
else
    echo "  ✅ 文档文件完整"
fi
echo ""

# 5. 测试主脚本
echo "5. 测试主脚本..."
if [ -f "setup-opencode.js" ]; then
    # 检查shebang
    if head -1 setup-opencode.js | grep -q "#!/usr/bin/env node"; then
        echo "  ✅ shebang正确"
    else
        echo "  ❌ shebang错误"
    fi
    
    # 测试帮助命令
    if node setup-opencode.js --help 2>&1 | grep -q "Universal OpenCode deployer"; then
        echo "  ✅ 帮助命令工作正常"
    else
        echo "  ❌ 帮助命令失败"
    fi
    
    # 检查文件权限
    if [ -x "setup-opencode.js" ]; then
        echo "  ✅ 文件有执行权限"
    else
        echo "  ⚠️  文件无执行权限"
    fi
else
    echo "  ❌ 主脚本缺失"
fi
echo ""

# 6. 检查package.json
echo "6. 检查package.json..."
if [ -f "package.json" ]; then
    # 检查必要字段
    if grep -q '"name":' package.json; then
        echo "  ✅ 包名已设置"
    else
        echo "  ❌ 包名缺失"
    fi
    
    if grep -q '"bin":' package.json; then
        echo "  ✅ bin字段已设置"
    else
        echo "  ❌ bin字段缺失"
    fi
    
    if grep -q '"repository":' package.json; then
        echo "  ✅ 仓库信息已设置"
    else
        echo "  ❌ 仓库信息缺失"
    fi
    
    # 检查命令别名
    if grep -q '"my-opencode"' package.json && \
       grep -q '"opencode-setup"' package.json && \
       grep -q '"oad"' package.json; then
        echo "  ✅ 所有命令别名已设置"
    else
        echo "  ❌ 命令别名缺失"
    fi
else
    echo "  ❌ package.json缺失"
fi
echo ""

# 7. 检查README内容
echo "7. 检查README关键内容..."
if [ -f "README.md" ]; then
    # 检查关键部分
    check_readme_section() {
        if grep -q "$1" README.md; then
            echo "  ✅ $2"
        else
            echo "  ❌ $2 缺失"
        fi
    }
    
    check_readme_section "npm install -g https://github.com/jabing/my-opencode.git" "GitHub安装说明"
    check_readme_section "oad deploy" "使用命令"
    check_readme_section "Node.js 12.0 or higher" "Node.js要求"
    check_readme_section "offline-packages/" "离线包说明"
    check_readme_section "非OpenCode官方团队出品" "免责声明"
    check_readme_section "## 中文" "中文文档"
    check_readme_section "## English" "英文文档"
else
    echo "  ❌ README.md缺失"
fi
echo ""

# 总结
echo "=== 验证总结 ==="
echo ""
echo "项目状态:"
echo "✅ 核心文件: $((${#required_files[@]} - missing_files))/${#required_files[@]}"
echo "✅ 离线包: $((${#offline_dirs[@]} + ${#offline_files[@]} - missing_dirs))/$((${#offline_dirs[@]} + ${#offline_files[@]}))"
echo "✅ GitHub模板: $((${#github_files[@]} - missing_github))/${#github_files[@]}"
echo "✅ 文档文件: $((${#doc_files[@]} - missing_docs))/${#doc_files[@]}"
echo ""
echo "下一步操作:"
echo "1. 初始化Git仓库: git init"
echo "2. 添加所有文件: git add ."
echo "3. 提交: git commit -m 'Initial release v1.0.0'"
echo "4. 推送到GitHub: git push -u origin main"
echo "5. 创建标签: git tag v1.0.0 && git push --tags"
echo ""
echo "用户安装命令:"
echo "  npm install -g https://github.com/jabing/my-opencode.git"
echo "  或使用: oad deploy"
echo ""
echo "离线安装:"
echo "  查看: offline-packages/README.md"
echo ""
echo "=== 验证完成 ==="