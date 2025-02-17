const contentData = [
  {
    type: "video",
    title: "AI Landing Page",
    contentUrl: "videos/1.mp4",
    thumbnail: "images/A.jpg",
    category: "三维",
    contentId: "001",
    date: "2025-01-01"
  },
  {
    type: "image",
    title: "产品设计图集",
    contentUrl: ["images/A.jpg", "images/A.jpg"],
    thumbnail: "images/A.jpg",
    category: "物料",
    contentId: "002",
    date: "2025-02-15"
  },
    {
    type: "video",
    title: "模型展示",
    contentUrl: "videos/1.mp4",
    thumbnail: "",
    category: "三维",
    contentId: "003",
    date: "2025-01-01"
  },
    {
    type: "image",
    title: "摄影图集",
    contentUrl: ["images/A.jpg", "images/A.jpg"],
    thumbnail: "images/A.jpg",
    category: "摄影",
    contentId: "004",
    date: "2025-02-15"
  },
  
/*文案模块
  {
    type: "article",
    title: "设计思维方法论",
    content: "设计思维的核心在于...",
    thumbnail: "images/A.jpg",
    category: "AI",
    contentId: "001",
    date: "2025-02-20"
  }
*/

];

let currentPage = 1;
const itemsPerPage = 6;
let currentCategory = "全部";

// 初始化页面
function initPage() {
  if (document.getElementById("content-gallery")) {
    displayContent(currentPage, currentCategory);
  }
  setupModal();
  setupTheme();
}

// 显示内容
function displayContent(page, category) {
  const filteredData = category === "全部" ? contentData : contentData.filter(item => item.category === category);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const contentGallery = document.getElementById("content-gallery");
  contentGallery.innerHTML = "";

  currentItems.forEach(item => {
    const contentItem = renderContentItem(item);
    contentGallery.appendChild(contentItem);
  });

  displayPagination(filteredData.length);
}

// 渲染内容项
function renderContentItem(item) {
  const container = document.createElement("div");
  container.className = `content-item ${item.type}-item`;
  container.dataset.contentId = item.contentId;

  let mediaContent = '';
  if (item.type === 'video') {
    mediaContent = `<video class="thumbnail" preload="metadata">
      <source src="${item.contentUrl}#t=0.5" type="video/mp4">
    </video>`;
  } else if (item.type === 'image') {
    mediaContent = `<img src="${item.thumbnail}" alt="${item.title}" class="thumbnail">`;
  } else {
    mediaContent = `<img src="${item.thumbnail}" alt="${item.title}" class="thumbnail">`;
  }

  container.innerHTML = `
    <div class="content-thumbnail">
      ${mediaContent}
      <div class="category-label">${item.category}</div>
      <div class="content-id">${item.contentId}</div>
    </div>
    <div class="content-info">
      <h3>${item.title}</h3>
      <span class="content-date">${item.date}</span>
    </div>
  `;

  container.addEventListener("click", () => handleContentClick(item));
  return container;
}

// 处理内容点击
function handleContentClick(content) {
  const modal = document.getElementById("content-modal");
  const modalBody = document.getElementById("modal-body");
  
  let modalContent = '';
  switch(content.type) {
    case 'video':
      modalContent = `<video controls autoplay>
        <source src="${content.contentUrl}" type="video/mp4">
      </video>`;
      break;
    case 'image':
      modalContent = content.contentUrl.map(img => `
        <img src="${img}" class="modal-image">
      `).join('');
      break;
    case 'article':
      modalContent = `<div class="article-content">${content.content}</div>`;
      break;
  }

  modalBody.innerHTML = modalContent;
  modal.classList.add("show");
}

// 分页逻辑
function displayPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.onclick = () => {
      currentPage = i;
      displayContent(currentPage, currentCategory);
    };
    pagination.appendChild(button);
  }
}

// 分类筛选
function filterContent(category) {
  currentCategory = category;
  currentPage = 1;
  displayContent(currentPage, currentCategory);
}

// 设置模态框
function setupModal() {
  const modal = document.getElementById("content-modal");
  const closeModal = document.querySelector(".close-modal");

  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
    const video = modal.querySelector("video");
    if (video) {
      video.pause();
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      const video = modal.querySelector("video");
      if (video) {
        video.pause();
      }
    }
  });
}

// 设置主题
function setupTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.checked = true;
  }

  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
  });
}

// 初始化
document.addEventListener("DOMContentLoaded", initPage);
