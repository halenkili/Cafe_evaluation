// 语言配置
const LANG = {
  zh: {
    nav: {
      home: '首页',
      questionnaire: '问卷',
      language: 'English'
    },
    index: {
      title: '咖啡创业风险评估平台',
      hero: {
        title: '评估您的咖啡创业风险',
        subtitle: '通过AI分析，获取定制化的创业风险评估报告，助您做出明智的商业决策',
        button: '开始评估'
      },
      services: {
        title: '我们的服务',
        features: [
          {
            title: '专业评估',
            description: '基于行业数据和AI分析，提供专业的风险评估'
          },
          {
            title: '定制化报告',
            description: '根据您的具体情况，生成个性化的分析报告'
          },
          {
            title: '改进建议',
            description: '针对风险点，提供具体的改进建议和解决方案'
          }
        ]
      },
      footer: '© 2026 咖啡创业风险评估平台'
    },
    questionnaire: {
      title: '咖啡创业风险评估问卷',
      sections: {
        basic: '基本信息',
        market: '市场分析',
        operation: '运营管理',
        finance: '财务规划',
        risk: '风险认知'
      },
      fields: {
        name: '您的姓名',
        location: '计划开店地点',
        storeSize: '店铺面积（平方米）',
        budget: '创业预算（万元）',
        openingTime: '计划开业时间',
        openingTimePlaceholder: '如：2024年6月',
        marketResearch: '您是否进行了市场调研？',
        marketResearchOptions: {
          placeholder: '请选择',
          yes: '是，详细调研',
          partial: '部分调研',
          no: '否，未调研'
        },
        targetAudience: '目标客户群体',
        competition: '周边竞争情况',
        productPositioning: '产品定位',
        productPositioningOptions: {
          placeholder: '请选择',
          premium: '高端精品咖啡',
          midRange: '中端品质咖啡',
          budget: '平价快捷咖啡',
          specialty: '特色主题咖啡'
        },
        marketTrends: '您对当前咖啡市场趋势的了解',
        industryExperience: '咖啡行业经验',
        industryExperienceOptions: {
          placeholder: '请选择',
          moreThan5: '5年以上',
          '1-5': '1-5年',
          lessThan1: '1年以下',
          none: '无'
        },
        coffeeSkills: '咖啡制作技术水平',
        coffeeSkillsOptions: {
          placeholder: '请选择',
          expert: '专家级（Q-Grader认证）',
          advanced: '高级（专业培训经历）',
          intermediate: '中级（基本制作技能）',
          beginner: '初级（基础了解）'
        },
        equipment: '设备配置计划',
        staffing: '人员配置计划',
        suppliers: '供应商资源',
        suppliersOptions: {
          placeholder: '请选择',
          secured: '已确定',
          inProgress: '正在洽谈',
          notStarted: '尚未开始'
        },
        marketingStrategy: '营销策略',
        revenueProjection: '月均营收预期（万元）',
        costStructure: '成本结构',
        pricingStrategy: '定价策略',
        breakEven: '预计盈亏平衡点（月）',
        cashFlow: '现金流规划',
        fundingSources: '资金来源',
        mainRisks: '您认为主要风险是什么？',
        riskMitigation: '风险应对措施'
      },
      submit: '提交评估'
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
    index: {
      title: 'Coffee Shop Business Risk Assessment',
      hero: {
        title: 'Assess Your Coffee Shop Business Risk',
        subtitle: 'Get customized business risk assessment reports through AI analysis to help you make informed business decisions',
        button: 'Start Assessment'
      },
      services: {
        title: 'Our Services',
        features: [
          {
            title: 'Professional Assessment',
            description: 'Provide professional risk assessment based on industry data and AI analysis'
          },
          {
            title: 'Customized Reports',
            description: 'Generate personalized analysis reports based on your specific situation'
          },
          {
            title: 'Improvement Suggestions',
            description: 'Provide specific improvement suggestions and solutions for risk points'
          }
        ]
      },
      footer: '© 2026 Coffee Shop Business Risk Assessment Platform'
    },
    questionnaire: {
      title: 'Coffee Shop Business Risk Assessment Questionnaire',
      sections: {
        basic: 'Basic Information',
        market: 'Market Analysis',
        operation: 'Operation Management',
        finance: 'Financial Planning',
        risk: 'Risk Awareness'
      },
      fields: {
        name: 'Your Name',
        location: 'Planned Store Location',
        storeSize: 'Store Area (square meters)',
        budget: 'Startup Budget (10,000 yuan)',
        openingTime: 'Planned Opening Time',
        openingTimePlaceholder: 'e.g., June 2024',
        marketResearch: 'Have you conducted market research?',
        marketResearchOptions: {
          placeholder: 'Please select',
          yes: 'Yes, detailed research',
          partial: 'Partial research',
          no: 'No, no research'
        },
        targetAudience: 'Target Customer Group',
        competition: 'Surrounding Competition',
        productPositioning: 'Product Positioning',
        productPositioningOptions: {
          placeholder: 'Please select',
          premium: 'High-end specialty coffee',
          midRange: 'Mid-range quality coffee',
          budget: 'Affordable quick coffee',
          specialty: 'Themed specialty coffee'
        },
        marketTrends: 'Your understanding of current coffee market trends',
        industryExperience: 'Coffee industry experience',
        industryExperienceOptions: {
          placeholder: 'Please select',
          moreThan5: 'More than 5 years',
          '1-5': '1-5 years',
          lessThan1: 'Less than 1 year',
          none: 'None'
        },
        coffeeSkills: 'Coffee making skill level',
        coffeeSkillsOptions: {
          placeholder: 'Please select',
          expert: 'Expert level (Q-Grader certified)',
          advanced: 'Advanced (professional training)',
          intermediate: 'Intermediate (basic skills)',
          beginner: 'Beginner (basic understanding)'
        },
        equipment: 'Equipment configuration plan',
        staffing: 'Staffing plan',
        suppliers: 'Supplier resources',
        suppliersOptions: {
          placeholder: 'Please select',
          secured: 'Confirmed',
          inProgress: 'In negotiation',
          notStarted: 'Not started yet'
        },
        marketingStrategy: 'Marketing strategy',
        revenueProjection: 'Monthly revenue expectation (10,000 yuan)',
        costStructure: 'Cost structure',
        pricingStrategy: 'Pricing strategy',
        breakEven: 'Expected break-even point (months)',
        cashFlow: 'Cash flow planning',
        fundingSources: 'Funding sources',
        mainRisks: 'What do you think are the main risks?',
        riskMitigation: 'Risk response measures'
      },
      submit: 'Submit Assessment'
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

// 语言切换功能
function changeLanguage(lang) {
  localStorage.setItem('language', lang);
  // 更新隐藏的语言字段
  const langInput = document.getElementById('lang');
  if (langInput) {
    langInput.value = lang;
  }
  updateContent();
  // 重新加载页面以应用所有更改
  location.reload();
}

// 获取当前语言
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'en'; // 默认英文
}

// 更新页面内容
function updateContent() {
  const lang = getCurrentLanguage();
  const translations = LANG[lang];
  
  // 更新语言切换按钮
  const langButton = document.getElementById('lang-button');
  if (langButton) {
    langButton.textContent = translations.nav.language;
    langButton.onclick = () => changeLanguage(lang === 'zh' ? 'en' : 'zh');
  }
  
  // 更新隐藏的语言字段
  const langInput = document.getElementById('lang');
  if (langInput) {
    langInput.value = lang;
  }
  
  // 更新页面标题
  if (document.title.includes('咖啡创业')) {
    document.title = translations.index.title;
  } else if (document.title.includes('问卷')) {
    document.title = translations.questionnaire.title;
  } else if (document.title.includes('报告')) {
    document.title = translations.report.title;
  }
  
  // 更新首页内容
  if (document.querySelector('.hero')) {
    const hero = document.querySelector('.hero');
    const heroTitle = hero.querySelector('h2');
    const heroSubtitle = hero.querySelector('p');
    const heroButton = hero.querySelector('.btn');
    
    if (heroTitle) heroTitle.textContent = translations.index.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = translations.index.hero.subtitle;
    if (heroButton) {
      heroButton.textContent = translations.index.hero.button;
      if (lang === 'en') {
        heroButton.href = '/questionnaire?lang=en';
      } else {
        heroButton.href = '/questionnaire?lang=zh';
      }
    }
    
    // 更新服务部分
    const servicesTitle = document.querySelector('.container h2');
    if (servicesTitle) {
      servicesTitle.textContent = translations.index.services.title;
    }
    
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
      if (translations.index.services.features[index]) {
        const title = feature.querySelector('h3');
        const description = feature.querySelector('p');
        if (title) title.textContent = translations.index.services.features[index].title;
        if (description) description.textContent = translations.index.services.features[index].description;
      }
    });
    
    // 更新页脚
    const footer = document.querySelector('footer p');
    if (footer) footer.textContent = translations.index.footer;
  }
  
  // 更新问卷页面内容
  if (document.querySelector('form')) {
    // 更新标题
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) headerTitle.textContent = translations.questionnaire.title;
    
    // 更新基本信息部分
    const basicSection = document.querySelector('.section:nth-child(1) h2');
    if (basicSection) basicSection.textContent = translations.questionnaire.sections.basic;
    
    // 更新市场分析部分
    const marketSection = document.querySelector('.section:nth-child(2) h2');
    if (marketSection) marketSection.textContent = translations.questionnaire.sections.market;
    
    // 更新运营管理部分
    const operationSection = document.querySelector('.section:nth-child(3) h2');
    if (operationSection) operationSection.textContent = translations.questionnaire.sections.operation;
    
    // 更新财务规划部分
    const financeSection = document.querySelector('.section:nth-child(4) h2');
    if (financeSection) financeSection.textContent = translations.questionnaire.sections.finance;
    
    // 更新风险认知部分
    const riskSection = document.querySelector('.section:nth-child(5) h2');
    if (riskSection) riskSection.textContent = translations.questionnaire.sections.risk;
    
    // 更新表单字段
    const nameLabel = document.querySelector('label[for="name"]');
    if (nameLabel) nameLabel.textContent = translations.questionnaire.fields.name;
    
    const locationLabel = document.querySelector('label[for="location"]');
    if (locationLabel) locationLabel.textContent = translations.questionnaire.fields.location;
    
    const storeSizeLabel = document.querySelector('label[for="storeSize"]');
    if (storeSizeLabel) storeSizeLabel.textContent = translations.questionnaire.fields.storeSize;
    
    const budgetLabel = document.querySelector('label[for="budget"]');
    if (budgetLabel) budgetLabel.textContent = translations.questionnaire.fields.budget;
    
    const openingTimeLabel = document.querySelector('label[for="openingTime"]');
    if (openingTimeLabel) openingTimeLabel.textContent = translations.questionnaire.fields.openingTime;
    
    const openingTimeInput = document.getElementById('openingTime');
    if (openingTimeInput) openingTimeInput.placeholder = translations.questionnaire.fields.openingTimePlaceholder;
    
    const marketResearchLabel = document.querySelector('label[for="marketResearch"]');
    if (marketResearchLabel) marketResearchLabel.textContent = translations.questionnaire.fields.marketResearch;
    
    const marketResearchSelect = document.getElementById('marketResearch');
    if (marketResearchSelect) {
      const options = marketResearchSelect.options;
      options[0].text = translations.questionnaire.fields.marketResearchOptions.placeholder;
      options[1].text = translations.questionnaire.fields.marketResearchOptions.yes;
      options[2].text = translations.questionnaire.fields.marketResearchOptions.partial;
      options[3].text = translations.questionnaire.fields.marketResearchOptions.no;
    }
    
    const targetAudienceLabel = document.querySelector('label[for="targetAudience"]');
    if (targetAudienceLabel) targetAudienceLabel.textContent = translations.questionnaire.fields.targetAudience;
    
    const competitionLabel = document.querySelector('label[for="competition"]');
    if (competitionLabel) competitionLabel.textContent = translations.questionnaire.fields.competition;
    
    const productPositioningLabel = document.querySelector('label[for="productPositioning"]');
    if (productPositioningLabel) productPositioningLabel.textContent = translations.questionnaire.fields.productPositioning;
    
    const productPositioningSelect = document.getElementById('productPositioning');
    if (productPositioningSelect) {
      const options = productPositioningSelect.options;
      options[0].text = translations.questionnaire.fields.productPositioningOptions.placeholder;
      options[1].text = translations.questionnaire.fields.productPositioningOptions.premium;
      options[2].text = translations.questionnaire.fields.productPositioningOptions.midRange;
      options[3].text = translations.questionnaire.fields.productPositioningOptions.budget;
      options[4].text = translations.questionnaire.fields.productPositioningOptions.specialty;
    }
    
    const marketTrendsLabel = document.querySelector('label[for="marketTrends"]');
    if (marketTrendsLabel) marketTrendsLabel.textContent = translations.questionnaire.fields.marketTrends;
    
    const industryExperienceLabel = document.querySelector('label[for="industryExperience"]');
    if (industryExperienceLabel) industryExperienceLabel.textContent = translations.questionnaire.fields.industryExperience;
    
    const industryExperienceSelect = document.getElementById('industryExperience');
    if (industryExperienceSelect) {
      const options = industryExperienceSelect.options;
      options[0].text = translations.questionnaire.fields.industryExperienceOptions.placeholder;
      options[1].text = translations.questionnaire.fields.industryExperienceOptions.moreThan5;
      options[2].text = translations.questionnaire.fields.industryExperienceOptions['1-5'];
      options[3].text = translations.questionnaire.fields.industryExperienceOptions.lessThan1;
      options[4].text = translations.questionnaire.fields.industryExperienceOptions.none;
    }
    
    const coffeeSkillsLabel = document.querySelector('label[for="coffeeSkills"]');
    if (coffeeSkillsLabel) coffeeSkillsLabel.textContent = translations.questionnaire.fields.coffeeSkills;
    
    const coffeeSkillsSelect = document.getElementById('coffeeSkills');
    if (coffeeSkillsSelect) {
      const options = coffeeSkillsSelect.options;
      options[0].text = translations.questionnaire.fields.coffeeSkillsOptions.placeholder;
      options[1].text = translations.questionnaire.fields.coffeeSkillsOptions.expert;
      options[2].text = translations.questionnaire.fields.coffeeSkillsOptions.advanced;
      options[3].text = translations.questionnaire.fields.coffeeSkillsOptions.intermediate;
      options[4].text = translations.questionnaire.fields.coffeeSkillsOptions.beginner;
    }
    
    const equipmentLabel = document.querySelector('label[for="equipment"]');
    if (equipmentLabel) equipmentLabel.textContent = translations.questionnaire.fields.equipment;
    
    const staffingLabel = document.querySelector('label[for="staffing"]');
    if (staffingLabel) staffingLabel.textContent = translations.questionnaire.fields.staffing;
    
    const suppliersLabel = document.querySelector('label[for="suppliers"]');
    if (suppliersLabel) suppliersLabel.textContent = translations.questionnaire.fields.suppliers;
    
    const suppliersSelect = document.getElementById('suppliers');
    if (suppliersSelect) {
      const options = suppliersSelect.options;
      options[0].text = translations.questionnaire.fields.suppliersOptions.placeholder;
      options[1].text = translations.questionnaire.fields.suppliersOptions.secured;
      options[2].text = translations.questionnaire.fields.suppliersOptions.inProgress;
      options[3].text = translations.questionnaire.fields.suppliersOptions.notStarted;
    }
    
    const marketingStrategyLabel = document.querySelector('label[for="marketingStrategy"]');
    if (marketingStrategyLabel) marketingStrategyLabel.textContent = translations.questionnaire.fields.marketingStrategy;
    
    const revenueProjectionLabel = document.querySelector('label[for="revenueProjection"]');
    if (revenueProjectionLabel) revenueProjectionLabel.textContent = translations.questionnaire.fields.revenueProjection;
    
    const costStructureLabel = document.querySelector('label[for="costStructure"]');
    if (costStructureLabel) costStructureLabel.textContent = translations.questionnaire.fields.costStructure;
    
    const pricingStrategyLabel = document.querySelector('label[for="pricingStrategy"]');
    if (pricingStrategyLabel) pricingStrategyLabel.textContent = translations.questionnaire.fields.pricingStrategy;
    
    const breakEvenLabel = document.querySelector('label[for="breakEven"]');
    if (breakEvenLabel) breakEvenLabel.textContent = translations.questionnaire.fields.breakEven;
    
    const cashFlowLabel = document.querySelector('label[for="cashFlow"]');
    if (cashFlowLabel) cashFlowLabel.textContent = translations.questionnaire.fields.cashFlow;
    
    const fundingSourcesLabel = document.querySelector('label[for="fundingSources"]');
    if (fundingSourcesLabel) fundingSourcesLabel.textContent = translations.questionnaire.fields.fundingSources;
    
    const mainRisksLabel = document.querySelector('label[for="mainRisks"]');
    if (mainRisksLabel) mainRisksLabel.textContent = translations.questionnaire.fields.mainRisks;
    
    const riskMitigationLabel = document.querySelector('label[for="riskMitigation"]');
    if (riskMitigationLabel) riskMitigationLabel.textContent = translations.questionnaire.fields.riskMitigation;
    
    // 更新提交按钮
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) submitButton.textContent = translations.questionnaire.submit;
  }
  
  // 更新报告页面内容
  if (document.querySelector('.report-container')) {
    // 更新标题
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) headerTitle.textContent = translations.report.title;
    
    // 更新风险评分部分
    const scoreSection = document.querySelector('.score-card h2');
    if (scoreSection) scoreSection.textContent = translations.report.sections.score;
    
    // 更新优势分析部分
    const strengthsSection = document.querySelector('.section:nth-child(2) h2');
    if (strengthsSection) strengthsSection.textContent = translations.report.sections.strengths;
    
    // 更新劣势分析部分
    const weaknessesSection = document.querySelector('.section:nth-child(3) h2');
    if (weaknessesSection) weaknessesSection.textContent = translations.report.sections.weaknesses;
    
    // 更新机会分析部分
    const opportunitiesSection = document.querySelector('.section:nth-child(4) h2');
    if (opportunitiesSection) opportunitiesSection.textContent = translations.report.sections.opportunities;
    
    // 更新威胁分析部分
    const threatsSection = document.querySelector('.section:nth-child(5) h2');
    if (threatsSection) threatsSection.textContent = translations.report.sections.threats;
    
    // 更新改进建议部分
    const recommendationsSection = document.querySelector('.section:nth-child(6) h2');
    if (recommendationsSection) recommendationsSection.textContent = translations.report.sections.recommendations;
    
    // 更新行业洞察部分
    const insightsSection = document.querySelector('.section:nth-child(7) h2');
    if (insightsSection) insightsSection.textContent = translations.report.sections.insights;
    
    // 更新返回首页按钮
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
      backButton.textContent = translations.report.back;
      if (lang === 'en') {
        backButton.href = '/index.html?lang=en';
      } else {
        backButton.href = '/index.html?lang=zh';
      }
    }
  }
}

// 页面加载时更新内容
document.addEventListener('DOMContentLoaded', updateContent);
