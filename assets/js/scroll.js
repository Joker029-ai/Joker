(function() {
  // 确保代码只在博客列表页执行
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
    if (articles.length === 0) {
      console.warn('No articles found');
      return;
    }

    // 获取文章高度
    const articleHeight = articles[0].offsetHeight;
    let currentIndex = 0; // 文章索引
    const SCREEN_LIMIT = 3; // 每屏最多显示的文章数

    // 确保 `.article-list` 高度足够，防止文章消失
    articleList.style.height = `${articleHeight * articles.length}px`;

    // **更新滚动状态**
    function updateScroll() {
      const scrollPosition = currentIndex * articleHeight;
      articleList.style.transform = `translateY(-${scrollPosition}px)`;
      
      articles.forEach((article, index) => {
        const pos = (index - currentIndex + articles.length) % articles.length;
        // **修正 opacity 避免隐藏全部文章**
        article.style.opacity = pos < SCREEN_LIMIT ? '1' : '1';
      });
    }

    // **桌面端：鼠标滚轮事件**
    scrollContainer.addEventListener('wheel', function(e) {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      currentIndex = (currentIndex + delta + articles.length) % articles.length;
      updateScroll();
    }, { passive: false });

    // **移动端：触摸滑动事件**
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
      if (Math.abs(deltaY) > 30) { // 设定滑动触发阈值
        const delta = deltaY > 0 ? 1 : -1;
        currentIndex = (currentIndex + delta + articles.length) % articles.length;
        updateScroll();
      }
      startY = null;
    }, { passive: false });

    // **初始化更新滚动**
    updateScroll();
  }

  document.addEventListener('DOMContentLoaded', initScroll);
})();
