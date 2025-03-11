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

    // ✅ **确保每个 `.article` 的高度计算正确**
    articles.forEach(article => {
      article.style.minHeight = "200px";  // 适配移动端，保证每篇文章不会被压缩
      article.style.display = "block";  // 确保文章可见
    });

    // **计算文章列表的总高度**
    const articleHeight = articles[0].offsetHeight;
    let currentIndex = 0;
    const SCREEN_LIMIT = 3;

    function updateScroll() {
      const scrollPosition = currentIndex * articleHeight;
      articleList.style.transform = `translateY(-${scrollPosition}px)`;
      console.log("📌 当前滚动索引：", currentIndex);
    }

    // ✅ **桌面端滚动**
    scrollContainer.addEventListener('wheel', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const delta = Math.sign(e.deltaY);
      currentIndex = (currentIndex + delta + articles.length) % articles.length;
      updateScroll();
    }, { passive: false });

    // ✅ **移动端滑动**
    let startY = null;
    scrollContainer.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        startY = e.touches[0].clientY;
      }
    }, { passive: true });

    scrollContainer.addEventListener('touchmove', function(e) {
      if (startY === null) return;
      e.preventDefault();
      e.stopPropagation();
      const endY = e.touches[0].clientY;
      const deltaY = startY - endY;
      if (Math.abs(deltaY) > 30) {
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
