const contentData = [
  {
    type: "video",
    title: "AI Landing Page",
    contentUrl: "videos/001.mp4",
    thumbnail: "images/A.jpg",
    category: "三维",
    contentId: "NO.001",
    date: "2025-01-01"
  },
  {
    type: "image",
    title: "产品设计图集",
    contentUrl: ["images/DJI Inspire1.jpg", "images/DJI Inspire1-02.jpg","images/DJI Inspire1-03.jpg","images/DJI Inspire1遥控器.jpg","images/DJI Inspire1遥控器-2.jpg","images/DJI Inspire1遥控器-3.jpg"],
    thumbnail: "images/DJI Inspire1.jpg",
    category: "物料",
    contentId: "NO.002",
    date: "2025-02-15"
  },
  {
    type: "video",
    title: "模型展示",
    contentUrl: "videos/002.mp4",
    thumbnail: "",
    category: "三维",
    contentId: "NO.003",
    date: "2025-01-01"
  },
  {
    type: "image",
    title: "摄影图集",
    contentUrl: ["images/GoPro运动相机.jpg", "images/音响.jpg", "images/游戏机小场景.jpg"],
    thumbnail: "images/GoPro运动相机.jpg",
    category: "摄影",
    contentId: "NO.004",
    date: "2025-02-15"
  },
    {
    type: "video",
    title: "AI Landing Page",
    contentUrl: "videos/003.mp4",
    thumbnail: "images/A.jpg",
    category: "三维",
    contentId: "NO.005",
    date: "2025-01-01"
  },
      {
    type: "video",
    title: "AI Landing Page",
    contentUrl: "videos/004.mp4",
    thumbnail: "images/A.jpg",
    category: "三维",
    contentId: "NO.006",
    date: "2025-01-01"
  },
      {
    type: "video",
    title: "AI Landing Page",
    contentUrl: "videos/005.mp4",
    thumbnail: "images/A.jpg",
    category: "三维",
    contentId: "NO.007",
    date: "2025-01-01"
  },
      {
    type: "video",
    title: "AI Landing Page",
    contentUrl: "videos/006.mp4",
    thumbnail: "images/A.jpg",
    category: "三维",
    contentId: "NO.008",
    date: "2025-01-01"
  },
    {
    type: "image",
    title: "摄影图集",
    contentUrl: ["images/布料结构特写.jpg", "images/超哑面电子产品.jpg", "images/手持吸尘器.jpg"],
    thumbnail: "images/布料结构特写.jpg",
    category: "摄影",
    contentId: "NO.009",
    date: "2025-02-15"
  },
        {
    type: "video",
    title: "AI Landing Page",
    contentUrl: "videos/007.mp4",
    thumbnail: "images/A.jpg",
    category: "三维",
    contentId: "NO.010",
    date: "2025-01-01"
  },
        {
    type: "video",
    title: "AI Landing Page",
    contentUrl: "videos/008.mp4",
    thumbnail: "images/A.jpg",
    category: "三维",
    contentId: "NO.011",
    date: "2025-01-01"
  },
        {
    type: "video",
    title: "AI Landing Page",
    contentUrl: "videos/009.mp4",
    thumbnail: "images/A.jpg",
    category: "三维",
    contentId: "NO.012",
    date: "2025-01-01"
  },
      {
    type: "image",
    title: "平面图",
    contentUrl: ["images/大黄蜂.jpg", "images/远古生物.png"],
    thumbnail: "images/大黄蜂.jpg",
    category: "平面",
    contentId: "NO.013",
    date: "2025-02-15"
  },
          {
    type: "video",
    title: "AI Landing Page",
    contentUrl: "videos/010.mp4",
    thumbnail: "images/A.jpg",
    category: "三维",
    contentId: "NO.014",
    date: "2025-01-01"
  },
      {
    type: "image",
    title: "摄影图集",
    contentUrl: ["images/森林小屋.jpg", "images/多功能锅.jpg", "images/复古调蓝牙音箱.jpg"],
    thumbnail: "images/森林小屋.jpg",
    category: "摄影",
    contentId: "NO.015",
    date: "2025-02-15"
  },
];

let currentPage = 1;
let itemsPerPage = 12; // 允许用户手动设置每页显示的项数
let currentCategory = "全部";

// 初始化页面
function initPage() {
  if (document.getElementById("content-gallery")) {
    displayContent(currentPage, currentCategory);
  }
  setupModal();
  setupTheme();
  setupCategoryButtons();
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
      <div class="category-label" style="background-color: ${getCategoryColor(item.category)};">${item.category}</div>
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
  updateCategoryButtons(category);
}

// 设置分类按钮
function setupCategoryButtons() {
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach(button => {
    const color = button.getAttribute("data-color");
    button.style.setProperty("--btn-color", color);
    button.addEventListener("mouseenter", () => {
      button.style.backgroundColor = color;
    });
    button.addEventListener("mouseleave", () => {
      if (!button.classList.contains("active")) {
        button.style.backgroundColor = "#656565";
      }
    });
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      button.style.backgroundColor = color;
    });
  });
}

// 更新分类按钮状态
function updateCategoryButtons(category) {
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach(button => {
    if (button.textContent === category) {
      button.classList.add("active");
      button.style.backgroundColor = button.getAttribute("data-color");
    } else {
      button.classList.remove("active");
      button.style.backgroundColor = "#656565";
    }
  });
}

// 获取分类颜色
function getCategoryColor(category) {
  const buttons = document.querySelectorAll(".category-btn");
  for (const button of buttons) {
    if (button.textContent === category) {
      return button.getAttribute("data-color");
    }
  }
  return "#656565";
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
