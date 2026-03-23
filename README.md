# 咖啡创业风险评估平台

## 项目概述

这是一个咖啡创业风险评估平台，旨在帮助咖啡创业者评估自身创业风险并提供定制化的分析报告。用户通过填写详细的问卷，系统会进行分析，生成包含风险评分、优势劣势分析和改进建议的定制化报告。

## 技术栈

- **前端**：HTML5, CSS3, EJS模板引擎
- **后端**：Node.js, Express.js
- **分析引擎**：
  - 基于规则的分析（默认）
  - Deepseek API（可配置）
- **依赖管理**：npm

## 项目结构

```
├── api/
│   ├── analyze.js        # 分析API
│   └── index.js          # 服务器less函数
├── views/
│   ├── index.ejs         # 首页
│   ├── questionnaire.ejs # 问卷页面
│   └── report.ejs        # 报告页面
├── index.html            # 静态首页
├── questionnaire.html    # 静态问卷页面
├── server.js             # 服务器文件
├── package.json          # 项目配置和依赖
├── vercel.json           # Vercel部署配置
└── README.md             # 项目说明
```

## 安装与部署

### 1. 环境要求

- Node.js (v14.0+)
- npm (v6.0+)
- （可选）Deepseek API密钥

### 2. 安装步骤

1. 克隆项目到本地
   ```bash
   git clone <repository-url>
   cd Cafe_evaluation
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 配置分析引擎（可选）
   - 打开 `api/analyze.js` 文件
   - 配置 `CONFIG` 对象：
     - `analysisMode`：设置为 `'rule-based'`（基于规则，默认）或 `'deepseek'`（Deepseek API）
     - `deepseek.apiKey`：当 `analysisMode` 为 `'deepseek'` 时，设置您的Deepseek API密钥

### 3. 启动服务器

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

服务器将在 `http://localhost:3000` 上运行

## 部署到Vercel

1. 推送代码到GitHub仓库
2. 在Vercel上导入该仓库
3. Vercel会自动配置部署设置
4. 部署完成后，您将获得一个公网URL

## 使用流程

1. 访问首页 `http://localhost:3000` 或部署后的公网URL
2. 点击「开始评估」按钮进入问卷页面
3. 填写完整的问卷信息
4. 提交问卷后，系统会生成定制化的风险评估报告
5. 查看报告中的风险评分、分析结果和改进建议
6. 点击「返回首页」按钮返回初始界面

## 功能特点

- **科学的风险评估**：基于咖啡行业的专业知识和分析
- **定制化报告**：根据用户的具体情况生成个性化分析
- **详细的改进建议**：针对风险点提供具体的解决方案
- **用户友好界面**：简洁明了的问卷和报告展示
- **可扩展架构**：支持未来切换到Deepseek API进行更高级的分析

## 维护计划

### 定期维护

1. **数据备份**：定期备份用户数据和分析结果
2. **依赖更新**：定期更新项目依赖，确保安全性和稳定性
3. **API密钥管理**：定期轮换Deepseek API密钥（如使用），确保安全性

### 功能扩展

1. **用户账户系统**：添加用户注册和登录功能，保存历史评估记录
2. **数据可视化**：添加图表和数据可视化功能，使报告更加直观
3. **行业基准比较**：添加行业平均水平对比功能
4. **多语言支持**：添加多语言界面，扩大用户群体

### 性能优化

1. **缓存机制**：添加缓存机制，提高系统响应速度
2. **负载均衡**：在高流量情况下添加负载均衡
3. **数据库优化**：使用数据库存储用户数据，提高数据处理效率

## 升级到Deepseek API

要使用Deepseek API进行更高级的分析，请按照以下步骤操作：

1. 确保您已拥有Deepseek API密钥
2. 打开 `api/analyze.js` 文件
3. 修改 `CONFIG` 对象：
   ```javascript
   const CONFIG = {
     analysisMode: 'deepseek', // 改为 'deepseek'
     deepseek: {
       apiKey: 'YOUR_DEEPSEEK_API_KEY', // 替换为您的API密钥
       apiUrl: 'https://api.deepseek.com/v1/chat/completions',
       model: 'deepseek-chat'
     }
   };
   ```
4. 保存文件并重新部署

## 故障排查

### 常见问题

1. **服务器无法启动**：检查Node.js版本和依赖安装情况
2. **API调用失败**：检查Deepseek API密钥是否正确，以及网络连接
3. **报告生成缓慢**：可能是API响应时间较长，建议优化提示词或增加超时设置
4. **返回首页链接下载文件**：确保返回首页链接指向 `index.html`

### 日志管理

- 系统运行日志会输出到控制台
- 建议在生产环境中配置更详细的日志系统

## 联系方式

如有问题或建议，请联系项目维护者。

---

© 2026 咖啡创业风险评估平台