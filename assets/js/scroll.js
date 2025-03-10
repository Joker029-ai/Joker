(function() {
  // 初始化滚动功能
  function initScroll() {
    // 使用 scrollContainer 避免与其他代码变量冲突
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
    
    // 计算每篇文章的高度（假设所有文章高度一致）
    const articleHeight = articles[0].offsetHeight;
    // 设置 article-list 的总高度，确保容器足够显示所有文章
    articleList.style.height = (articleHeight * articles.length) + "px";
    
    let currentIndex = 0;
    const SCREEN_LIMIT = 3; // 每屏显示文章数量
    
    // 处理滚轮事件
    function handleWheel(e) {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      // 计算新的当前索引，确保循环显示
      currentIndex = (currentIndex + delta + articles.length) % articles.length;
      const scrollPosition = currentIndex * articleHeight;
      articleList.style.transform = `translateY(-${scrollPosition}px)`;
      
      // 根据当前索引控制文章透明度，只显示前 SCREEN_LIMIT 篇文章
      articles.forEach((article, index) => {
        const pos = (index - currentIndex + articles.length) % articles.length;
        article.style.opacity = pos < SCREEN_LIMIT ? '1' : '0';
      });
    }
    
    // 绑定滚轮事件（使用 {passive:false} 以确保 e.preventDefault() 生效）
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
  }
  
  // 等待 DOM 内容加载完毕后初始化滚动功能
  document.addEventListener('DOMContentLoaded', initScroll);
})();
