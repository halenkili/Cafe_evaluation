const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 配置Deepseek API
const deepseekApiKey = process.env.DEEPSEEK_API_KEY || 'sk-05f7787c0a704ad28547a01ef7b3bc2e'; // 已配置API密钥

// 配置中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// 路由
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/questionnaire', (req, res) => {
  res.render('questionnaire');
});

app.post('/analyze', async (req, res) => {
  try {
    const formData = req.body;
    // 集成AI分析逻辑
    const analysis = await analyzeBusinessRisk(formData);
    res.render('report', { analysis });
  } catch (error) {
    console.error('Error analyzing business risk:', error);
    res.status(500).send('Internal Server Error');
  }
});

// AI分析函数
async function analyzeBusinessRisk(formData) {
  try {
    // 构建提示词
    const prompt = `
    你是一位专业的咖啡行业创业顾问，具有10年以上的行业经验，请根据以下问卷数据，为咖啡创业者提供一份详细、专业的风险评估报告：
    
    基本信息：
    姓名：${formData.name}
    计划开店地点：${formData.location}
    店铺面积：${formData.storeSize}平方米
    创业预算：${formData.budget}万元
    计划开业时间：${formData.openingTime}
    
    市场分析：
    市场调研情况：${formData.marketResearch === 'yes' ? '详细调研' : formData.marketResearch === 'partial' ? '部分调研' : '未调研'}
    目标客户群体：${formData.targetAudience}
    周边竞争情况：${formData.competition}
    产品定位：${formData.productPositioning === 'premium' ? '高端精品咖啡' : formData.productPositioning === 'midRange' ? '中端品质咖啡' : formData.productPositioning === 'budget' ? '平价快捷咖啡' : '特色主题咖啡'}
    市场趋势了解：${formData.marketTrends}
    
    运营管理：
    咖啡行业经验：${formData.industryExperience === 'moreThan5' ? '5年以上' : formData.industryExperience === '1-5' ? '1-5年' : formData.industryExperience === 'lessThan1' ? '1年以下' : '无'}
    咖啡制作技术水平：${formData.coffeeSkills === 'expert' ? '专家级（Q-Grader认证）' : formData.coffeeSkills === 'advanced' ? '高级（专业培训经历）' : formData.coffeeSkills === 'intermediate' ? '中级（基本制作技能）' : '初级（基础了解）'}
    设备配置计划：${formData.equipment}
    人员配置计划：${formData.staffing}
    供应商资源：${formData.suppliers === 'secured' ? '已确定' : formData.suppliers === 'inProgress' ? '正在洽谈' : '尚未开始'}
    营销策略：${formData.marketingStrategy}
    
    财务规划：
    月均营收预期：${formData.revenueProjection}万元
    成本结构：${formData.costStructure}
    定价策略：${formData.pricingStrategy}
    预计盈亏平衡点：${formData.breakEven}个月
    现金流规划：${formData.cashFlow}
    资金来源：${formData.fundingSources}
    
    风险认知：
    主要风险：${formData.mainRisks}
    风险应对措施：${formData.riskMitigation}
    
    分析要求：
    1. 风险评分（0-100）：综合考虑市场、运营、财务、技术等因素，给出客观的风险评分
    2. 优势分析：突出创业者的核心竞争力和有利条件
    3. 劣势分析：客观指出潜在风险点和不足之处
    4. 机会分析：结合行业趋势和地区特点，识别潜在机会
    5. 威胁分析：识别市场竞争和外部挑战
    6. 具体建议：提供可操作的改进措施，包括短期和长期策略
    7. 行业洞察：基于咖啡行业专业知识，提供独到的见解和建议
    
    请以JSON格式返回，结构如下：
    {
      "riskScore": 数字,
      "strengths": ["优势1", "优势2"...],
      "weaknesses": ["劣势1", "劣势2"...],
      "opportunities": ["机会1", "机会2"...],
      "threats": ["威胁1", "威胁2"...],
      "recommendations": ["建议1", "建议2"...],
      "industryInsights": ["洞察1", "洞察2"...]
    }
    `;

    // 调用Deepseek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepseekApiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "你是一位专业的咖啡行业创业顾问，擅长分析创业风险并提供专业建议。" },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    // 解析响应
    const data = await response.json();
    const analysisContent = data.choices[0].message.content;
    const analysis = JSON.parse(analysisContent);
    return analysis;
  } catch (error) {
    console.error('Error calling Deepseek API:', error);
    // 返回默认分析结果
    return {
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
  }
}

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});