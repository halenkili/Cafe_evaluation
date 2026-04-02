// 语言切换功能
function switchLanguage(event) {
  event.preventDefault();
  console.log('Switching language...');
  console.log('Current pathname:', window.location.pathname);
  
  // 检查当前页面是中文版还是英文版
  const isChinese = window.location.pathname.includes('-zh');
  console.log('Is Chinese:', isChinese);
  
  // 确定目标语言和目标URL
  let targetLang, targetUrl;
  if (isChinese) {
    // 当前是中文版，切换到英文版
    targetLang = 'en';
    // 移除-zh后缀
    targetUrl = window.location.pathname.replace('-zh', '');
    // 如果移除后是/index.html，保持不变
    // 如果移除后是/，则使用/index.html
    if (targetUrl === '/') {
      targetUrl = '/index.html';
    }
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
  
  console.log('Target language:', targetLang);
  console.log('Target URL:', targetUrl);
  
  // 保存语言偏好到localStorage
  localStorage.setItem('language', targetLang);
  console.log('Language preference saved to localStorage');
  
  // 跳转到目标URL
  window.location.href = targetUrl;
  console.log('Redirecting to:', targetUrl);
}

// 页面加载时绑定语言切换按钮事件
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM content loaded, binding language switcher...');
  const langButton = document.getElementById('lang-button');
  console.log('Language button element:', langButton);
  if (langButton) {
    console.log('Binding click event to language button');
    langButton.addEventListener('click', switchLanguage);
    console.log('Click event bound successfully');
  } else {
    console.error('Language button not found!');
  }
});

// 确保脚本加载完成
console.log('lang.js loaded successfully');
