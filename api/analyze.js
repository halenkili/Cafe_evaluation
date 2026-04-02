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
      
      // 获取语言参数
      let lang = 'en'; // 默认英文
      const langParam = formData.get('lang');
      if (langParam === 'zh') {
        lang = 'zh';
      }
      
      // 构建分析请求
      let analysis;
      if (CONFIG.analysisMode === 'deepseek') {
        analysis = await getDeepseekAnalysis(formDataObject);
      } else {
        analysis = getRuleBasedAnalysis(formDataObject, lang);
      }
      
      // 生成HTML报告
      const reportHtml = generateReportHtml(analysis, lang);
      
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(reportHtml);
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } catch (error) {
    console.error('Error processing analyze request:', error);
    // 出错时返回默认分析结果
    const defaultAnalysis = lang === 'zh' ? {
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
    } : {
      riskScore: 50,
      strengths: ['Has entrepreneurial enthusiasm', 'Has certain budget planning', 'Has basic understanding of coffee industry'],
      weaknesses: ['Needs more industry experience', 'Insufficient market research', 'May lack professional operation and management knowledge'],
      opportunities: ['Coffee market has great potential', 'Consumer demand for quality coffee is growing', 'Specialty coffee experience has development space'],
      threats: ['Intense market competition', 'Cost increase pressure', 'Consumer preferences change quickly'],
      recommendations: [
        'It is recommended to conduct more detailed market research to understand target customer needs and competitive situation',
        'Consider hiring experienced coffee industry consultants for professional guidance',
        'Develop detailed operation plan and marketing strategy to clarify brand positioning',
        'Establish stable supplier relationships to ensure raw material quality and supply stability',
        'Strengthen employee training to improve service quality and product consistency',
        'Develop reasonable pricing strategy to balance profit and market competitiveness',
        'Establish emergency fund reserve to应对 possible business risks'
      ],
      industryInsights: [
        'The coffee industry focuses on product quality and customer experience; it is recommended to focus on these two aspects',
        'Location is crucial for coffee shop success; it is recommended to conduct detailed location analysis',
        'Employee training and retention are key factors for long-term success',
        'Digital marketing and membership systems can effectively improve customer loyalty',
        'Sustainable development and environmental protection concepts are becoming industry trends; consider integrating them into brand value'
      ]
    };
    const reportHtml = generateReportHtml(defaultAnalysis, lang);
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(reportHtml);
  }
};

// 基于规则的分析引擎
function getRuleBasedAnalysis(formData, lang = 'en') {
  let riskScore = 50;
  const strengths = [];
  const weaknesses = [];
  const opportunities = [];
  const threats = [];
  const recommendations = [];
  const industryInsights = lang === 'zh' ? [
    '咖啡行业注重产品品质和顾客体验，建议在这两方面下功夫',
    '选址对咖啡店成功至关重要，建议进行详细的区位分析',
    '员工培训和 retention 是长期成功的关键因素',
    '数字化营销和会员体系可以有效提升客户忠诚度',
    '可持续发展和环保理念正成为行业趋势，可考虑融入品牌价值'
  ] : [
    'The coffee industry focuses on product quality and customer experience; it is recommended to focus on these two aspects',
    'Location is crucial for coffee shop success; it is recommended to conduct detailed location analysis',
    'Employee training and retention are key factors for long-term success',
    'Digital marketing and membership systems can effectively improve customer loyalty',
    'Sustainable development and environmental protection concepts are becoming industry trends; consider integrating them into brand value'
  ];
  
  // 分析市场调研情况
  if (formData.marketResearch === 'yes') {
    strengths.push(lang === 'zh' ? '进行了详细的市场调研' : 'Conducted detailed market research');
    riskScore -= 10;
  } else if (formData.marketResearch === 'partial') {
    strengths.push(lang === 'zh' ? '进行了部分市场调研' : 'Conducted partial market research');
    weaknesses.push(lang === 'zh' ? '市场调研不够全面' : 'Market research is not comprehensive enough');
  } else {
    weaknesses.push(lang === 'zh' ? '缺乏市场调研' : 'Lacks market research');
    riskScore += 15;
    recommendations.push(lang === 'zh' ? '建议进行详细的市场调研，了解目标客户需求和竞争情况' : 'It is recommended to conduct detailed market research to understand target customer needs and competitive situation');
  }
  
  // 分析行业经验
  if (formData.industryExperience === 'moreThan5') {
    strengths.push(lang === 'zh' ? '拥有5年以上咖啡行业经验' : 'Has more than 5 years of coffee industry experience');
    riskScore -= 15;
  } else if (formData.industryExperience === '1-5') {
    strengths.push(lang === 'zh' ? '拥有1-5年咖啡行业经验' : 'Has 1-5 years of coffee industry experience');
  } else if (formData.industryExperience === 'lessThan1') {
    weaknesses.push(lang === 'zh' ? '咖啡行业经验不足1年' : 'Less than 1 year of coffee industry experience');
    riskScore += 10;
  } else {
    weaknesses.push(lang === 'zh' ? '缺乏咖啡行业经验' : 'Lacks coffee industry experience');
    riskScore += 20;
    recommendations.push(lang === 'zh' ? '考虑聘请有经验的咖啡行业顾问，获取专业指导' : 'Consider hiring experienced coffee industry consultants for professional guidance');
  }
  
  // 分析咖啡制作技术水平
  if (formData.coffeeSkills === 'expert' || formData.coffeeSkills === 'advanced') {
    strengths.push(lang === 'zh' ? '咖啡制作技术水平较高' : 'Has high coffee making skill level');
    riskScore -= 5;
  } else {
    weaknesses.push(lang === 'zh' ? '咖啡制作技术水平需要提升' : 'Coffee making skill level needs improvement');
    recommendations.push(lang === 'zh' ? '加强咖啡制作技术培训，提升产品品质' : 'Strengthen coffee making technical training to improve product quality');
  }
  
  // 分析供应商资源
  if (formData.suppliers === 'secured') {
    strengths.push(lang === 'zh' ? '已确定供应商资源' : 'Supplier resources confirmed');
    riskScore -= 5;
  } else if (formData.suppliers === 'inProgress') {
    strengths.push(lang === 'zh' ? '正在洽谈供应商' : 'Negotiating with suppliers');
  } else {
    weaknesses.push(lang === 'zh' ? '尚未开始寻找供应商' : 'Has not started looking for suppliers');
    riskScore += 10;
    recommendations.push(lang === 'zh' ? '建立稳定的供应商关系，确保原材料质量和供应稳定性' : 'Establish stable supplier relationships to ensure raw material quality and supply stability');
  }
  
  // 分析预算情况
  const budget = parseInt(formData.budget) || 0;
  if (budget >= 50) {
    strengths.push(lang === 'zh' ? '创业预算充足' : 'Sufficient startup budget');
    riskScore -= 10;
  } else if (budget >= 20) {
    strengths.push(lang === 'zh' ? '创业预算基本合理' : 'Startup budget is basically reasonable');
  } else {
    weaknesses.push(lang === 'zh' ? '创业预算可能不足' : 'Startup budget may be insufficient');
    riskScore += 15;
    recommendations.push(lang === 'zh' ? '重新评估预算，确保有足够的资金支持初期运营' : 'Re-evaluate the budget to ensure sufficient funds to support initial operations');
  }
  
  // 分析盈亏平衡点
  const breakEven = parseInt(formData.breakEven) || 0;
  if (breakEven <= 6) {
    strengths.push(lang === 'zh' ? '预计盈亏平衡点合理' : 'Expected break-even point is reasonable');
    riskScore -= 5;
  } else if (breakEven <= 12) {
    strengths.push(lang === 'zh' ? '预计盈亏平衡点在可接受范围内' : 'Expected break-even point is within acceptable range');
  } else {
    weaknesses.push(lang === 'zh' ? '预计盈亏平衡点过长' : 'Expected break-even point is too long');
    riskScore += 10;
    recommendations.push(lang === 'zh' ? '优化成本结构，缩短盈亏平衡时间' : 'Optimize cost structure to shorten break-even time');
  }
  
  // 分析产品定位
  if (formData.productPositioning) {
    strengths.push(lang === 'zh' ? '有明确的产品定位' : 'Has clear product positioning');
    riskScore -= 5;
  } else {
    weaknesses.push(lang === 'zh' ? '产品定位不明确' : 'Product positioning is not clear');
    riskScore += 10;
    recommendations.push(lang === 'zh' ? '明确产品定位，制定差异化竞争策略' : 'Clarify product positioning and develop differentiated competition strategy');
  }
  
  // 分析营销策略
  if (formData.marketingStrategy && formData.marketingStrategy.length > 50) {
    strengths.push(lang === 'zh' ? '有详细的营销策略' : 'Has detailed marketing strategy');
    riskScore -= 5;
  } else {
    weaknesses.push(lang === 'zh' ? '营销策略不够详细' : 'Marketing strategy is not detailed enough');
    recommendations.push(lang === 'zh' ? '制定详细的营销策略，提升品牌知名度' : 'Develop detailed marketing strategy to enhance brand awareness');
  }
  
  // 分析现金流规划
  if (formData.cashFlow && formData.cashFlow.length > 50) {
    strengths.push(lang === 'zh' ? '有详细的现金流规划' : 'Has detailed cash flow planning');
    riskScore -= 5;
  } else {
    weaknesses.push(lang === 'zh' ? '现金流规划不够详细' : 'Cash flow planning is not detailed enough');
    riskScore += 10;
    recommendations.push(lang === 'zh' ? '制定详细的现金流规划，确保资金链稳定' : 'Develop detailed cash flow planning to ensure stable capital chain');
  }
  
  // 添加通用机会和威胁
  opportunities.push(lang === 'zh' ? '咖啡市场潜力大' : 'Coffee market has great potential');
  opportunities.push(lang === 'zh' ? '消费者对品质咖啡的需求增长' : 'Consumer demand for quality coffee is growing');
  opportunities.push(lang === 'zh' ? '特色咖啡体验有发展空间' : 'Specialty coffee experience has development space');
  
  threats.push(lang === 'zh' ? '市场竞争激烈' : 'Intense market competition');
  threats.push(lang === 'zh' ? '成本上升压力' : 'Cost increase pressure');
  threats.push(lang === 'zh' ? '消费者偏好变化快' : 'Consumer preferences change quickly');
  
  // 添加通用建议
  const recommend1 = lang === 'zh' ? '制定详细的运营计划和营销策略，明确品牌定位' : 'Develop detailed operation plan and marketing strategy to clarify brand positioning';
  const recommend2 = lang === 'zh' ? '加强员工培训，提升服务质量和产品一致性' : 'Strengthen employee training to improve service quality and product consistency';
  const recommend3 = lang === 'zh' ? '制定合理的价格策略，平衡利润和市场竞争力' : 'Develop reasonable pricing strategy to balance profit and market competitiveness';
  const recommend4 = lang === 'zh' ? '建立应急资金储备，应对可能的经营风险' : 'Establish emergency fund reserve to应对 possible business risks';
  
  if (!recommendations.includes(recommend1)) {
    recommendations.push(recommend1);
  }
  if (!recommendations.includes(recommend2)) {
    recommendations.push(recommend2);
  }
  if (!recommendations.includes(recommend3)) {
    recommendations.push(recommend3);
  }
  if (!recommendations.includes(recommend4)) {
    recommendations.push(recommend4);
  }
  
  // 确保风险评分在0-100之间
  riskScore = Math.max(0, Math.min(100, riskScore));
  
  // 如果没有优势，添加默认优势
  if (strengths.length === 0) {
    strengths.push(lang === 'zh' ? '有创业热情' : 'Has entrepreneurial enthusiasm');
    strengths.push(lang === 'zh' ? '有一定的预算规划' : 'Has certain budget planning');
    strengths.push(lang === 'zh' ? '对咖啡行业有基本了解' : 'Has basic understanding of coffee industry');
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

// 语言配置
const LANG = {
  zh: {
    nav: {
      home: '首页',
      questionnaire: '问卷',
      language: 'English'
    },
    report: {
      title: '咖啡创业风险评估报告',
      sections: {
        score: '风险评分',
        strengths: '优势分析',
        weaknesses: '劣势分析',
        opportunities: '机会分析',
        threats: '威胁分析',
        recommendations: '改进建议',
        insights: '行业洞察'
      },
      riskLevels: {
        high: '高风险水平',
        mediumHigh: '中等偏高风险水平',
        medium: '中等风险水平',
        mediumLow: '中等偏低风险水平',
        low: '低风险水平'
      },
      back: '返回首页'
    }
  },
  en: {
    nav: {
      home: 'Home',
      questionnaire: 'Questionnaire',
      language: '中文'
    },
    report: {
      title: 'Coffee Shop Business Risk Assessment Report',
      sections: {
        score: 'Risk Score',
        strengths: 'Strengths Analysis',
        weaknesses: 'Weaknesses Analysis',
        opportunities: 'Opportunities Analysis',
        threats: 'Threats Analysis',
        recommendations: 'Improvement Suggestions',
        insights: 'Industry Insights'
      },
      riskLevels: {
        high: 'High Risk Level',
        mediumHigh: 'Medium-High Risk Level',
        medium: 'Medium Risk Level',
        mediumLow: 'Medium-Low Risk Level',
        low: 'Low Risk Level'
      },
      back: 'Back to Home'
    }
  }
};

// 获取风险等级描述
function getRiskLevel(score, lang = 'en') {
  const translations = LANG[lang];
  if (score >= 80) return translations.report.riskLevels.high;
  if (score >= 60) return translations.report.riskLevels.mediumHigh;
  if (score >= 40) return translations.report.riskLevels.medium;
  if (score >= 20) return translations.report.riskLevels.mediumLow;
  return translations.report.riskLevels.low;
}

// 生成HTML报告
function generateReportHtml(analysis, lang = 'en') {
  const translations = LANG[lang];
  return `
<!DOCTYPE html>
<html lang="${lang === 'zh' ? 'zh-CN' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${translations.report.title}</title>
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
      position: relative;
    }
    .lang-switcher {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
    .lang-button {
      background: #4CAF50;
      color: #fff;
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .lang-button:hover {
      background: #45a049;
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
  <script src="lang.js"></script>
</head>
<body>
  <header>
    <div class="lang-switcher">
      <button id="lang-button" class="lang-button">${translations.nav.language}</button>
    </div>
    <h1>${translations.report.title}</h1>
  </header>
  
  <div class="container">
    <div class="report-container">
      <div class="score-card">
        <h2>${translations.report.sections.score}</h2>
        <div class="score">${analysis.riskScore}</div>
        <p>${getRiskLevel(analysis.riskScore, lang)}</p>
      </div>
      
      <div class="section">
        <h2>${translations.report.sections.strengths}</h2>
        <ul>
          ${analysis.strengths.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
      <div class="section">
        <h2>${translations.report.sections.weaknesses}</h2>
        <ul>
          ${analysis.weaknesses.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
      <div class="section">
        <h2>${translations.report.sections.opportunities}</h2>
        <ul>
          ${analysis.opportunities.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
      <div class="section">
        <h2>${translations.report.sections.threats}</h2>
        <ul>
          ${analysis.threats.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
      <div class="section">
        <h2>${translations.report.sections.recommendations}</h2>
        <ul>
          ${analysis.recommendations.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
      <div class="section">
        <h2>${translations.report.sections.insights}</h2>
        <ul>
          ${analysis.industryInsights.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
      <a href="/index.html" class="back-btn">${translations.report.back}</a>
    </div>
  </div>
</body>
</html>
  `;
}


