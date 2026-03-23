const bodyParser = require('body-parser');

// 处理表单提交并返回分析报告
module.exports = async (req, res) => {
  try {
    // 解析请求体
    if (req.method === 'POST') {
      // 模拟表单数据解析
      let body = '';
      for await (const chunk of req) {
        body += chunk;
      }
      
      // 直接返回默认分析结果的HTML报告
      const reportHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>咖啡创业风险评估报告</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      background: #333;
      color: #fff;
      padding: 1rem;
      text-align: center;
    }
    .report-container {
      background: #fff;
      padding: 2rem;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      margin-top: 2rem;
    }
    h2 {
      color: #333;
      margin-bottom: 1.5rem;
      border-bottom: 2px solid #4CAF50;
      padding-bottom: 0.5rem;
    }
    .score-card {
      background: #f9f9f9;
      padding: 1.5rem;
      border-radius: 5px;
      text-align: center;
      margin-bottom: 2rem;
    }
    .score {
      font-size: 3rem;
      font-weight: bold;
      color: #4CAF50;
    }
    .section {
      margin-bottom: 2rem;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
    }
    li:last-child {
      border-bottom: none;
    }
    .back-btn {
      display: inline-block;
      background: #333;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      text-decoration: none;
      margin-top: 2rem;
    }
    .back-btn:hover {
      background: #555;
    }
  </style>
</head>
<body>
  <header>
    <h1>咖啡创业风险评估报告</h1>
  </header>
  
  <div class="container">
    <div class="report-container">
      <div class="score-card">
        <h2>风险评分</h2>
        <div class="score">50</div>
        <p>中等风险水平</p>
      </div>
      
      <div class="section">
        <h2>优势分析</h2>
        <ul>
          <li>有创业热情</li>
          <li>有一定的预算规划</li>
          <li>对咖啡行业有基本了解</li>
        </ul>
      </div>
      
      <div class="section">
        <h2>劣势分析</h2>
        <ul>
          <li>需要更多行业经验</li>
          <li>市场调研不足</li>
          <li>可能缺乏专业的运营管理知识</li>
        </ul>
      </div>
      
      <div class="section">
        <h2>机会分析</h2>
        <ul>
          <li>咖啡市场潜力大</li>
          <li>消费者对品质咖啡的需求增长</li>
          <li>特色咖啡体验有发展空间</li>
        </ul>
      </div>
      
      <div class="section">
        <h2>威胁分析</h2>
        <ul>
          <li>市场竞争激烈</li>
          <li>成本上升压力</li>
          <li>消费者偏好变化快</li>
        </ul>
      </div>
      
      <div class="section">
        <h2>改进建议</h2>
        <ul>
          <li>建议进行更详细的市场调研，了解目标客户需求和竞争情况</li>
          <li>考虑聘请有经验的咖啡行业顾问，获取专业指导</li>
          <li>制定详细的运营计划和营销策略，明确品牌定位</li>
          <li>建立稳定的供应商关系，确保原材料质量和供应稳定性</li>
          <li>加强员工培训，提升服务质量和产品一致性</li>
          <li>制定合理的价格策略，平衡利润和市场竞争力</li>
          <li>建立应急资金储备，应对可能的经营风险</li>
        </ul>
      </div>
      
      <div class="section">
        <h2>行业洞察</h2>
        <ul>
          <li>咖啡行业注重产品品质和顾客体验，建议在这两方面下功夫</li>
          <li>选址对咖啡店成功至关重要，建议进行详细的区位分析</li>
          <li>员工培训和 retention 是长期成功的关键因素</li>
          <li>数字化营销和会员体系可以有效提升客户忠诚度</li>
          <li>可持续发展和环保理念正成为行业趋势，可考虑融入品牌价值</li>
        </ul>
      </div>
      
      <a href="/" class="back-btn">返回首页</a>
    </div>
  </div>
</body>
</html>
      `;
      
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(reportHtml);
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } catch (error) {
    console.error('Error processing analyze request:', error);
    res.status(500).send('Internal Server Error');
  }
};
