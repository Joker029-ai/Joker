(function() {
  console.log("📌 scroll.js 加载成功");  // ✅ 确保 JavaScript 文件被加载

  if (!document.body.classList.contains('blog-page')) {
    console.warn("❌ 当前页面不是博客列表页，scroll.js 不执行");
    return;
  }

  function initScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (!scrollContainer) {
      console.error("🚨 scroll-container 未找到，无法初始化滚动");
      return;
    }

    const articleList = document.querySelector('.article-list');
    const articles = document.querySelectorAll('.article');
    if (articles.length === 0) {
      console.error("🚨 文章列表为空");
      return;
    }

    console.log("✅ 文章列表找到，共", articles.length, "篇文章");

    // 设置文章列表的总高度
    const articleHeight = articles[0].offsetHeight;
    let currentIndex = 0; // 当前索引
    const SCREEN_LIMIT = 3; // 每屏最多显示的文章数

    articleList.style.height = `${articleHeight * articles.length}px`;

    function updateScroll() {
      const scrollPosition = currentIndex * articleHeight;
      articleList.style.transform = `translateY(-${scrollPosition}px)`;
      console.log("📌 当前滚动索引：", currentIndex);
    }

    // 📍 桌面端滚动事件
    scrollContainer.addEventListener('wheel', function(e) {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      currentIndex = (currentIndex + delta + articles.length) % articles.length;
      updateScroll();
    }, { passive: false });

    // 📍 移动端滑动事件
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
      if (Math.abs(deltaY) > 30) { // 触摸滑动阈值
        const delta = deltaY > 0 ? 1 : -1;
        currentIndex = (currentIndex + delta + articles.length) % articles.length;
        updateScroll();
      }
      startY = null;
    }, { passive: false });

    updateScroll();
  }

  document.addEventListener('DOMContentLoaded', initScroll);
})();
