$(document).ready(function () {
  // 从URL参数中获取文章ID
  function getArticleIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id"); // 例如：?id=1
  }

  // 动态加载文本文件内容
  function loadArticleContent(articleId) {
    if (!articleId) {
      $("#article-text").text("Invalid article ID.");
      return;
    }

    const articlePath = `../assets/articles/article${articleId}.txt`; // 调整文本文档路径
    $.get(articlePath)
      .done(function (data) {
        $("#article-text").text(data); // 加载成功，显示内容
      })
      .fail(function () {
        $("#article-text").text("Failed to load article content."); // 加载失败
      });
  }

  // 设置文章标题
  function setArticleTitle(articleId) {
    $("#article-title").text(`Article ${articleId}`); // 动态设置标题
  }

  // 初始化页面
  function initPage() {
    const articleId = getArticleIdFromUrl();
    if (articleId) {
      setArticleTitle(articleId);
      loadArticleContent(articleId);
    } else {
      $("#article-text").text("No article ID provided.");
    }
  }

  // 保存更改
  $("#save-button").on("click", function () {
    const updatedContent = $("#article-text").text();
    const articleId = getArticleIdFromUrl();
    // 这里可以替换为实际的保存逻辑，例如发送到服务器
    console.log("Updated Content for Article", articleId, ":", updatedContent);
    alert("Changes saved successfully!");
  });

  // 取消编辑
  $("#cancel-button").on("click", function () {
    if (confirm("Are you sure you want to discard changes?")) {
      const articleId = getArticleIdFromUrl();
      loadArticleContent(articleId); // 重新加载原始内容
    }
  });

  // 初始化页面
  initPage();
});