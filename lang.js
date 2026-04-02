// 语言切换功能
function switchLanguage() {
  // 检查当前页面是中文版还是英文版
  const isChinese = window.location.pathname.includes('-zh');
  
  // 确定目标语言和目标URL
  let targetLang, targetUrl;
  if (isChinese) {
    // 当前是中文版，切换到英文版
    targetLang = 'en';
    // 移除-zh后缀
    targetUrl = window.location.pathname.replace('-zh', '');
  } else {
    // 当前是英文版，切换到中文版
    targetLang = 'zh';
    // 添加-zh后缀
    const pathname = window.location.pathname;
    if (pathname.endsWith('.html')) {
      targetUrl = pathname.replace('.html', '-zh.html');
    } else if (pathname === '/' || pathname === '') {
      targetUrl = '/index-zh.html';
    } else {
      targetUrl = pathname + '-zh';
    }
  }
  
  // 保存语言偏好到localStorage
  localStorage.setItem('language', targetLang);
  
  // 跳转到目标URL
  window.location.href = targetUrl;
}

// 页面加载时绑定语言切换按钮事件
document.addEventListener('DOMContentLoaded', function() {
  const langButton = document.getElementById('lang-button');
  if (langButton) {
    langButton.addEventListener('click', switchLanguage);
  }
});
