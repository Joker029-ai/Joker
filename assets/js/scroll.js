(function() {
  // 仅在博客列表页执行：检查 body 是否含有 blog-page 类
  if (!document.body.classList.contains('blog-page')) {
    return;
  }
  
  function initScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (!scrollContainer) {
      console.warn('Scroll container not found, skipping initScroll');
      return;
    }
    
    const articleList = document.querySelector('.article-list');
    const articles = document.querySelectorAll('.article');
    if (!articles.length) {
      console.warn('No articles found');
      return;
    }
    
    // 计算单篇文章高度（包含外边距）
    const articleHeight = articles[0].offsetHeight;
    // 设置文章列表容器高度
    articleList.style.height = (articleHeight * articles.length) + "px";
    
    let currentIndex = 0;
    const SCREEN_LIMIT = 3; // 每屏显示文章数量
    
    // 更新滚动位置及各篇文章透明度
    function updateScroll() {
      const scrollPosition = currentIndex * articleHeight;
      articleList.style.transform = `translateY(-${scrollPosition}px)`;
      articles.forEach((article, index) => {
        const pos = (index - currentIndex + articles.length) % articles.length;
        article.style.opacity = pos < SCREEN_LIMIT ? '1' : '0';
      });
    }
    
    // 桌面端：绑定鼠标滚轮事件
    scrollContainer.addEventListener('wheel', function(e) {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      currentIndex = (currentIndex + delta + articles.length) % articles.length;
      updateScroll();
    }, { passive: false });
    
    // 移动端：绑定触摸事件实现滑动
    let startY = null;
    scrollContainer.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        startY = e.touches[0].clientY;
      }
    }, { passive: true });
    
    scrollContainer.addEventListener('touchend', function(e) {
      if (startY === null) return;
      const endY = e.changedTouches[0].clientY;
      const deltaY = startY - endY;
      if (Math.abs(deltaY) > 30) { // 滑动阈值
        const delta = deltaY > 0 ? 1 : -1;
        currentIndex = (currentIndex + delta + articles.length) % articles.length;
        updateScroll();
      }
      startY = null;
    }, { passive: false });
  }
  
  document.addEventListener('DOMContentLoaded', initScroll);
})();
