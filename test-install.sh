#!/bin/bash

# My OpenCode Tool 安装测试脚本
# 测试各种安装方式

echo "=== My OpenCode Tool 安装测试 ==="
echo ""

# 检查Node.js
echo "1. 检查Node.js版本..."
node --version
if [ $? -ne 0 ]; then
    echo "❌ Node.js未安装，请先安装Node.js"
    exit 1
fi
echo "✅ Node.js已安装"
echo ""

# 检查npm
echo "2. 检查npm..."
npm --version
if [ $? -ne 0 ]; then
    echo "❌ npm未安装"
    exit 1
fi
echo "✅ npm已安装"
echo ""

# 测试本地安装
echo "3. 测试本地安装..."
echo "   运行: npm install -g ."
npm install -g .
if [ $? -eq 0 ]; then
    echo "✅ 本地安装成功"
    
    # 测试命令
    echo "   测试命令: oad --help"
    oad --help
    if [ $? -eq 0 ]; then
        echo "✅ 命令运行正常"
    else
        echo "❌ 命令运行失败"
    fi
else
    echo "❌ 本地安装失败"
fi
echo ""

# 测试卸载
echo "4. 测试卸载..."
echo "   运行: npm uninstall -g my-opencode-tool"
npm uninstall -g my-opencode-tool
if [ $? -eq 0 ]; then
    echo "✅ 卸载成功"
else
    echo "⚠️  卸载可能失败或未安装"
fi
echo ""

# 测试直接运行
echo "5. 测试直接运行脚本..."
echo "   运行: node setup-opencode.js --help"
node setup-opencode.js --help
if [ $? -eq 0 ]; then
    echo "✅ 直接运行正常"
else
    echo "❌ 直接运行失败"
fi
echo ""

echo "=== 测试完成 ==="
echo ""
echo "安装方式总结:"
echo "1. 本地安装: npm install -g ."
echo "2. GitHub安装: npm install -g https://github.com/jabing/my-opencode.git"
echo "3. 直接运行: node setup-opencode.js"
echo "4. npx运行: npx https://raw.githubusercontent.com/jabing/my-opencode/main/setup-opencode.js"
echo ""
echo "更多信息请查看 README.md"