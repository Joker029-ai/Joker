$(document).ready(function () {
  // 从localStorage加载保存的内容
  function loadSavedContent() {
    const savedContent = localStorage.getItem("articleContent");
    if (savedContent) {
      $("#article-text").val(savedContent); // 加载保存的内容
    } else {
      $("#article-text").val("This is the content of the article. You can edit it directly in this text area."); // 默认内容
    }
  }

  // 保存更改
  $("#save-button").on("click", function () {
    const updatedContent = $("#article-text").val(); // 获取textarea的内容
    localStorage.setItem("articleContent", updatedContent); // 保存到localStorage
    alert("Changes saved successfully!");
  });

  // 取消编辑
  $("#cancel-button").on("click", function () {
    if (confirm("Are you sure you want to discard changes?")) {
      localStorage.removeItem("articleContent"); // 清除保存的内容
      loadSavedContent(); // 恢复默认内容
    }
  });

  // 初始化页面
  loadSavedContent();
});