const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// 配置中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', '../views');
app.use(express.static('../public'));

// 路由
app.get('/', (req, res) => {
  try {
    res.render('index');
  } catch (error) {
    console.error('Error rendering index:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/questionnaire', (req, res) => {
  try {
    res.render('questionnaire');
  } catch (error) {
    console.error('Error rendering questionnaire:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/analyze', (req, res) => {
  try {
    // 直接返回默认分析结果，避免API调用
    const defaultAnalysis = {
      riskScore: 50,
      strengths: ['有创业热情', '有一定的预算规划'],
      weaknesses: ['需要更多行业经验', '市场调研不足'],
      opportunities: ['咖啡市场潜力大', '消费者对品质咖啡的需求增长'],
      threats: ['市场竞争激烈', '成本上升压力'],
      recommendations: [
        '建议进行更详细的市场调研',
        '考虑聘请有经验的咖啡行业顾问',
        '制定详细的运营计划和营销策略'
      ],
      industryInsights: [
        '咖啡行业注重产品品质和顾客体验，建议在这两方面下功夫',
        '选址对咖啡店成功至关重要，建议进行详细的区位分析',
        '员工培训和 retention 是长期成功的关键因素'
      ]
    };
    res.render('report', { analysis: defaultAnalysis });
  } catch (error) {
    console.error('Error analyzing:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 导出服务器less函数
module.exports = app;
module.exports.handler = serverless(app);