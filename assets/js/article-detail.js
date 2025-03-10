$(document).ready(function () {
  // 获取文章ID及生成存储键名（区分已保存和草稿）
  function getArticleId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 'default';
  }
  
  function getCommitKey() {
    return `articleCommit_${getArticleId()}`;
  }
  
  function getDraftKey() {
    return `articleDraft_${getArticleId()}`;
  }
  
  // 用于存储最后一次手动保存的内容
  let lastCommit = "";
  
  // 提示信息显示函数（非阻塞式提示）
  function showNotification(message) {
    const $notification = $('#save-notification');
    $notification.text(message).fadeIn(200).delay(1000).fadeOut(200);
  }
  
  // 加载内容：优先加载草稿，其次加载已保存内容，均不存在则使用默认文本
  function loadContent() {
    let content = localStorage.getItem(getDraftKey());
    if (content) {
      $('#article-text').val(content);
    } else {
      content = localStorage.getItem(getCommitKey());
      if (content) {
        $('#article-text').val(content);
      } else {
        content = `这是文章${getArticleId()}的默认内容，您可以在此编辑...`;
        $('#article-text').val(content);
      }
    }
    // 将最后一次手动保存的内容作为恢复基准
    lastCommit = localStorage.getItem(getCommitKey()) || content;
    $('#article-id').val(getArticleId());
    console.log("加载内容:", content);
  }
  
  // 手动保存：将当前内容写入“已保存”存储，并清除草稿
  function commitContent() {
    const content = $('#article-text').val();
    localStorage.setItem(getCommitKey(), content);
    localStorage.removeItem(getDraftKey());
    lastCommit = content;
    console.log("保存内容:", content);
    showNotification('内容已保存！');
  }
  
  // 自动保存草稿：保存当前内容到草稿存储，防止意外丢失
  function autoSaveDraft() {
    const content = $('#article-text').val();
    localStorage.setItem(getDraftKey(), content);
    console.log("自动保存草稿:", content);
  }
  
  // 放弃修改：恢复到最后一次保存的内容，并清除草稿数据
  function revertChanges() {
    $('#article-text').val(lastCommit);
    localStorage.removeItem(getDraftKey());
    console.log("恢复到上次保存的内容:", lastCommit);
    showNotification('已恢复到上次保存状态');
  }
  
  // 自动保存草稿：500ms内无输入后触发
  let saveTimer;
  $('#article-text').on('input', function () {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      autoSaveDraft();
    }, 500);
  });
  
  // 手动保存按钮点击事件
  $('#save-button').click(function () {
    alert("Save button clicked"); // 弹窗确认点击
    console.log("点击了 Save Changes 按钮");
    commitContent();
  });
  
  // 取消按钮点击事件：确认后恢复到上次保存状态
  $('#cancel-button').click(function () {
    alert("Cancel button clicked"); // 弹窗确认点击
    console.log("点击了 Cancel 按钮");
    if (confirm('确定放弃未保存的修改吗？')) {
      revertChanges();
    }
  });
  
  // 页面刷新或关闭前自动保存草稿
  window.addEventListener('beforeunload', function () {
    autoSaveDraft();
  });
  
  // 初始化加载内容
  loadContent();
});
