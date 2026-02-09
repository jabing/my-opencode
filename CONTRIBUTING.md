# 贡献指南

欢迎为 My OpenCode Tool 项目做出贡献！本指南将帮助您了解如何参与贡献。

## 行为准则

请尊重所有社区成员，保持友好和专业的交流环境。

## 如何贡献

### 报告问题

1. 在提交问题前，请先搜索是否已有类似问题
2. 使用问题模板（如果提供）
3. 提供详细的信息：
   - 操作系统和版本
   - Node.js版本
   - 重现步骤
   - 期望行为 vs 实际行为
   - 错误日志或截图

### 功能建议

1. 描述您想要的功能
2. 解释为什么这个功能有用
3. 提供使用场景示例
4. 如果可以，提供实现思路

### 提交代码

#### 开发环境设置

```bash
# 1. 克隆仓库
git clone https://github.com/jabing/my-opencode.git
cd my-opencode

# 2. 安装依赖（目前没有外部依赖）
# 3. 运行测试
./test-install.sh
```

#### 代码规范

1. **JavaScript风格**：
   - 使用2个空格缩进
   - 使用单引号
   - 添加必要的注释
   - 保持代码简洁

2. **提交信息**：
   - 使用英文提交信息
   - 遵循约定式提交规范
   - 示例：`feat: add OpenCode auto-installation`

3. **测试要求**：
   - 新功能需要添加测试
   - 确保现有测试通过
   - 测试脚本：`./test-install.sh`

#### 提交流程

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'feat: add some feature'`
4. 推送到分支：`git push origin feature/your-feature`
5. 提交 Pull Request

### Pull Request 流程

1. 确保您的分支基于最新的 main 分支
2. 更新 CHANGELOG.md（如果适用）
3. 运行测试确保通过
4. 填写 Pull Request 模板
5. 等待代码审查

## 开发路线图

### 高优先级
- [ ] OpenCode自动安装功能
- [ ] 网络检测和智能回退
- [ ] GitCode镜像支持

### 中优先级
- [ ] 离线安装包管理
- [ ] 更多命令行选项
- [ ] 单元测试框架

### 低优先级
- [ ] 配置文件管理
- [ ] 插件系统
- [ ] 图形界面

## 代码结构

```
my-opencode/
├── setup-opencode.js    # 主脚本
├── package.json         # npm配置
├── README.md           # 项目文档
├── AGENTS.md           # Agent指南
├── CONTRIBUTING.md     # 贡献指南
├── CHANGELOG.md        # 版本记录
├── LICENSE             # 许可证
├── .gitignore          # 忽略文件
└── test-install.sh     # 测试脚本
```

## 沟通渠道

- **GitHub Issues**: 问题报告和功能建议
- **GitHub Discussions**: 一般讨论（如果启用）
- **Pull Requests**: 代码贡献

## 许可证

通过贡献代码，您同意您的贡献将使用与本项目相同的 MIT 许可证。

## 致谢

感谢所有贡献者的时间和努力！您的贡献使这个项目变得更好。

---

**最后更新**: 2026年2月8日  
**维护者**: jabing