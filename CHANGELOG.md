# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-08

### Added
- 初始版本发布
- 支持从GitHub直接安装：`npm install -g https://github.com/jabing/my-opencode.git`
- 支持从GitCode安装：`npm install -g https://gitcode.com/jabing/my-opencode.git`
- 提供三个命令别名：`my-opencode`, `opencode-setup`, `oad`
- 完整的双语文档（英文/中文）
- 支持部署6角色Agent Constitution
- Node.js安装说明和下载链接
- 完整的离线安装包系统
  - `offline-packages/` 目录结构
  - 下载脚本：`download-packages.sh`
  - 安装脚本：`install-offline.sh`
  - 详细离线安装指南
- GitHub集成模板
  - Bug报告模板
  - 功能请求模板
  - Pull Request模板
- 完整项目文档
  - 贡献者指南
  - 版本记录
  - 项目总结
  - 安装验证指南
- 免责声明：明确说明非OpenCode官方团队出品

### Technical
- 添加package.json配置，支持npm安装
- 添加README.md完整双语文档
- 添加LICENSE文件（MIT许可证）
- 添加.gitignore和.npmignore文件
- 添加测试和验证脚本
- 完善依赖管理说明
- 添加自动检测和安装OpenCode的功能
- 添加GitCode镜像支持

### Technical
- 添加package.json配置
- 添加README.md完整文档
- 添加LICENSE文件（MIT许可证）
- 添加.gitignore文件
- 添加测试安装脚本
- 添加CHANGELOG版本记录

## [Unreleased]

### Planned Features
- ✅ OpenCode自动安装功能
- ✅ 网络检测和智能回退
- ✅ GitCode镜像支持
- 离线安装包管理
- 更多命令行选项
- 单元测试和集成测试
- CI/CD自动化发布