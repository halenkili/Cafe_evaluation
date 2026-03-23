// 配置选项
const CONFIG = {
  // 分析模式: 'rule-based' (基于规则) 或 'deepseek' (Deepseek API)
  analysisMode: 'rule-based',
  // Deepseek API配置 (当analysisMode为'deepseek'时使用)
  deepseek: {
    apiKey: 'sk-35cc1904053f48bda11c893bdec0f8a6', // 替换为您的Deepseek API密钥
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat'
  }
};

// 处理表单提交并返回分析报告
module.exports = async (req, res) => {
  try {
    // 解析请求体
    if (req.method === 'POST') {
      // 解析表单数据
      let body = '';
      for await (const chunk of req) {
        body += chunk;
      }
      
      // 解析表单数据
      const formData = new URLSearchParams(body);
      const formDataObject = Object.fromEntries(formData.entries());
      
      // 构建分析请求
      let analysis;
      if (CONFIG.analysisMode === 'deepseek') {
        analysis = await getDeepseekAnalysis(formDataObject);
      } else {
        analysis = getRuleBasedAnalysis(formDataObject);
      }
      
      // 生成HTML报告
      const reportHtml = generateReportHtml(analysis);
      
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(reportHtml);
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } catch (error) {
    console.error('Error processing analyze request:', error);
    // 出错时返回默认分析结果
    const defaultAnalysis = {
      riskScore: 50,
      strengths: ['有创业热情', '有一定的预算规划', '对咖啡行业有基本了解'],
      weaknesses: ['需要更多行业经验', '市场调研不足', '可能缺乏专业的运营管理知识'],
      opportunities: ['咖啡市场潜力大', '消费者对品质咖啡的需求增长', '特色咖啡体验有发展空间'],
      threats: ['市场竞争激烈', '成本上升压力', '消费者偏好变化快'],
      recommendations: [
        '建议进行更详细的市场调研，了解目标客户需求和竞争情况',
        '考虑聘请有经验的咖啡行业顾问，获取专业指导',
        '制定详细的运营计划和营销策略，明确品牌定位',
        '建立稳定的供应商关系，确保原材料质量和供应稳定性',
        '加强员工培训，提升服务质量和产品一致性',
        '制定合理的价格策略，平衡利润和市场竞争力',
        '建立应急资金储备，应对可能的经营风险'
      ],
      industryInsights: [
        '咖啡行业注重产品品质和顾客体验，建议在这两方面下功夫',
        '选址对咖啡店成功至关重要，建议进行详细的区位分析',
        '员工培训和 retention 是长期成功的关键因素',
        '数字化营销和会员体系可以有效提升客户忠诚度',
        '可持续发展和环保理念正成为行业趋势，可考虑融入品牌价值'
      ]
    };
    const reportHtml = generateReportHtml(defaultAnalysis);
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(reportHtml);
  }
};

// 基于规则的分析引擎
function getRuleBasedAnalysis(formData) {
  let riskScore = 50;
  const strengths = [];
  const weaknesses = [];
  const opportunities = [];
  const threats = [];
  const recommendations = [];
  const industryInsights = [
    '咖啡行业注重产品品质和顾客体验，建议在这两方面下功夫',
    '选址对咖啡店成功至关重要，建议进行详细的区位分析',
    '员工培训和 retention 是长期成功的关键因素',
    '数字化营销和会员体系可以有效提升客户忠诚度',
    '可持续发展和环保理念正成为行业趋势，可考虑融入品牌价值'
  ];
  
  // 分析市场调研情况
  if (formData.marketResearch === 'yes') {
    strengths.push('进行了详细的市场调研');
    riskScore -= 10;
  } else if (formData.marketResearch === 'partial') {
    strengths.push('进行了部分市场调研');
    weaknesses.push('市场调研不够全面');
  } else {
    weaknesses.push('缺乏市场调研');
    riskScore += 15;
    recommendations.push('建议进行详细的市场调研，了解目标客户需求和竞争情况');
  }
  
  // 分析行业经验
  if (formData.industryExperience === 'moreThan5') {
    strengths.push('拥有5年以上咖啡行业经验');
    riskScore -= 15;
  } else if (formData.industryExperience === '1-5') {
    strengths.push('拥有1-5年咖啡行业经验');
  } else if (formData.industryExperience === 'lessThan1') {
    weaknesses.push('咖啡行业经验不足1年');
    riskScore += 10;
  } else {
    weaknesses.push('缺乏咖啡行业经验');
    riskScore += 20;
    recommendations.push('考虑聘请有经验的咖啡行业顾问，获取专业指导');
  }
  
  // 分析咖啡制作技术水平
  if (formData.coffeeSkills === 'expert' || formData.coffeeSkills === 'advanced') {
    strengths.push('咖啡制作技术水平较高');
    riskScore -= 5;
  } else {
    weaknesses.push('咖啡制作技术水平需要提升');
    recommendations.push('加强咖啡制作技术培训，提升产品品质');
  }
  
  // 分析供应商资源
  if (formData.suppliers === 'secured') {
    strengths.push('已确定供应商资源');
    riskScore -= 5;
  } else if (formData.suppliers === 'inProgress') {
    strengths.push('正在洽谈供应商');
  } else {
    weaknesses.push('尚未开始寻找供应商');
    riskScore += 10;
    recommendations.push('建立稳定的供应商关系，确保原材料质量和供应稳定性');
  }
  
  // 分析预算情况
  const budget = parseInt(formData.budget) || 0;
  if (budget >= 50) {
    strengths.push('创业预算充足');
    riskScore -= 10;
  } else if (budget >= 20) {
    strengths.push('创业预算基本合理');
  } else {
    weaknesses.push('创业预算可能不足');
    riskScore += 15;
    recommendations.push('重新评估预算，确保有足够的资金支持初期运营');
  }
  
  // 分析盈亏平衡点
  const breakEven = parseInt(formData.breakEven) || 0;
  if (breakEven <= 6) {
    strengths.push('预计盈亏平衡点合理');
    riskScore -= 5;
  } else if (breakEven <= 12) {
    strengths.push('预计盈亏平衡点在可接受范围内');
  } else {
    weaknesses.push('预计盈亏平衡点过长');
    riskScore += 10;
    recommendations.push('优化成本结构，缩短盈亏平衡时间');
  }
  
  // 分析产品定位
  if (formData.productPositioning) {
    strengths.push('有明确的产品定位');
    riskScore -= 5;
  } else {
    weaknesses.push('产品定位不明确');
    riskScore += 10;
    recommendations.push('明确产品定位，制定差异化竞争策略');
  }
  
  // 分析营销策略
  if (formData.marketingStrategy && formData.marketingStrategy.length > 50) {
    strengths.push('有详细的营销策略');
    riskScore -= 5;
  } else {
    weaknesses.push('营销策略不够详细');
    recommendations.push('制定详细的营销策略，提升品牌知名度');
  }
  
  // 分析现金流规划
  if (formData.cashFlow && formData.cashFlow.length > 50) {
    strengths.push('有详细的现金流规划');
    riskScore -= 5;
  } else {
    weaknesses.push('现金流规划不够详细');
    riskScore += 10;
    recommendations.push('制定详细的现金流规划，确保资金链稳定');
  }
  
  // 添加通用机会和威胁
  opportunities.push('咖啡市场潜力大');
  opportunities.push('消费者对品质咖啡的需求增长');
  opportunities.push('特色咖啡体验有发展空间');
  
  threats.push('市场竞争激烈');
  threats.push('成本上升压力');
  threats.push('消费者偏好变化快');
  
  // 添加通用建议
  if (!recommendations.includes('制定详细的运营计划和营销策略，明确品牌定位')) {
    recommendations.push('制定详细的运营计划和营销策略，明确品牌定位');
  }
  if (!recommendations.includes('加强员工培训，提升服务质量和产品一致性')) {
    recommendations.push('加强员工培训，提升服务质量和产品一致性');
  }
  if (!recommendations.includes('制定合理的价格策略，平衡利润和市场竞争力')) {
    recommendations.push('制定合理的价格策略，平衡利润和市场竞争力');
  }
  if (!recommendations.includes('建立应急资金储备，应对可能的经营风险')) {
    recommendations.push('建立应急资金储备，应对可能的经营风险');
  }
  
  // 确保风险评分在0-100之间
  riskScore = Math.max(0, Math.min(100, riskScore));
  
  // 如果没有优势，添加默认优势
  if (strengths.length === 0) {
    strengths.push('有创业热情');
    strengths.push('有一定的预算规划');
    strengths.push('对咖啡行业有基本了解');
  }
  
  return {
    riskScore,
    strengths,
    weaknesses,
    opportunities,
    threats,
    recommendations,
    industryInsights
  };
}

// 调用Deepseek API进行分析
async function getDeepseekAnalysis(formData) {
  try {
    // 构建分析提示
    const prompt = `你是一位专业的咖啡行业创业顾问，请根据以下用户提交的咖啡创业问卷信息，生成一份详细的风险评估分析报告。

问卷信息：
姓名: ${formData.name || '未提供'}
开店地点: ${formData.location || '未提供'}
店铺面积: ${formData.storeSize || '未提供'}平方米
创业预算: ${formData.budget || '未提供'}万元
计划开业时间: ${formData.openingTime || '未提供'}

市场分析：
市场调研情况: ${formData.marketResearch || '未提供'}
目标客户群体: ${formData.targetAudience || '未提供'}
周边竞争情况: ${formData.competition || '未提供'}
产品定位: ${formData.productPositioning || '未提供'}
对咖啡市场趋势的了解: ${formData.marketTrends || '未提供'}

运营管理：
咖啡行业经验: ${formData.industryExperience || '未提供'}
咖啡制作技术水平: ${formData.coffeeSkills || '未提供'}
设备配置计划: ${formData.equipment || '未提供'}
人员配置计划: ${formData.staffing || '未提供'}
供应商资源: ${formData.suppliers || '未提供'}
营销策略: ${formData.marketingStrategy || '未提供'}

财务规划：
月均营收预期: ${formData.revenueProjection || '未提供'}万元
成本结构: ${formData.costStructure || '未提供'}
定价策略: ${formData.pricingStrategy || '未提供'}
预计盈亏平衡点: ${formData.breakEven || '未提供'}个月
现金流规划: ${formData.cashFlow || '未提供'}
资金来源: ${formData.fundingSources || '未提供'}

风险认知：
主要风险: ${formData.mainRisks || '未提供'}
风险应对措施: ${formData.riskMitigation || '未提供'}

请生成一份详细的分析报告，包括：
1. 风险评分（0-100）
2. 优势分析
3. 劣势分析
4. 机会分析
5. 威胁分析
6. 改进建议
7. 行业洞察

请使用JSON格式输出，字段如下：
{
  "riskScore": 数字,
  "strengths": ["优势1", "优势2"...],
  "weaknesses": ["劣势1", "劣势2"...],
  "opportunities": ["机会1", "机会2"...],
  "threats": ["威胁1", "威胁2"...],
  "recommendations": ["建议1", "建议2"...],
  "industryInsights": ["洞察1", "洞察2"...]
}`;
    
    // 调用Deepseek API
    const response = await fetch(CONFIG.deepseek.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.deepseek.apiKey}`
      },
      body: JSON.stringify({
        model: CONFIG.deepseek.model,
        messages: [
          {
            role: 'system',
            content: '你是一位专业的咖啡行业创业顾问，擅长分析创业风险并提供专业建议。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });
    
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }
    
    const data = await response.json();
    const analysisContent = data.choices[0].message.content;
    
    // 提取JSON内容
    const jsonMatch = analysisContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('无法解析API响应');
    }
  } catch (error) {
    console.error('Deepseek API分析错误:', error);
    // 出错时返回基于规则的分析结果
    return getRuleBasedAnalysis(formData);
  }
}

// 生成HTML报告
function generateReportHtml(analysis) {
  return `
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
        <div class="score">${analysis.riskScore}</div>
        <p>${getRiskLevel(analysis.riskScore)}</p>
      </div>
      
      <div class="section">
        <h2>优势分析</h2>
        <ul>
          ${analysis.strengths.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
      <div class="section">
        <h2>劣势分析</h2>
        <ul>
          ${analysis.weaknesses.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
      <div class="section">
        <h2>机会分析</h2>
        <ul>
          ${analysis.opportunities.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
      <div class="section">
        <h2>威胁分析</h2>
        <ul>
          ${analysis.threats.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
      <div class="section">
        <h2>改进建议</h2>
        <ul>
          ${analysis.recommendations.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
      <div class="section">
        <h2>行业洞察</h2>
        <ul>
          ${analysis.industryInsights.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
     <a href="/index.html" class="back-btn">返回首页</a>
    </div>
  </div>
</body>
</html>
  `;
}

// 获取风险等级描述
function getRiskLevel(score) {
  if (score >= 80) return '高风险水平';
  if (score >= 60) return '中等偏高风险水平';
  if (score >= 40) return '中等风险水平';
  if (score >= 20) return '中等偏低风险水平';
  return '低风险水平';
}
