const videoData = [
  {
    title: "AI Landing Page",
    videoUrl: "videos/1.mp4",
    thumbnail: "images/A.jpg",
    category: "平面",
    videoId: "019",
    date: "2025-01-01"
  },
  {
    title: "LUONMODELS",
    videoUrl: "videos/1.mp4",
    thumbnail: "images/A.jpg",
    category: "物件",
    videoId: "018",
    date: "2025-02-15"
  },
  {
    title: "Tink Gallery",
    videoUrl: "videos/1.mp4",
    thumbnail: "",
    category: "三维",
    videoId: "017",
    date: "2025-02-20"
  },
  // 更多视频项...
];

let currentPage = 1;
const videosPerPage = 6;

// 显示视频列表
function displayVideos(page) {
  const startIndex = (page - 1) * videosPerPage;
  const endIndex = page * videosPerPage;
  const currentVideos = videoData.slice(startIndex, endIndex);

  const videoGallery = document.getElementById("video-gallery");
  videoGallery.innerHTML = "";

  currentVideos.forEach(video => {
    const videoItem = document.createElement("div");
    videoItem.classList.add("video-item");

    videoItem.innerHTML = `
      <div class="video-thumbnail-container">
        ${video.thumbnail ? 
          `<img src="${video.thumbnail}" alt="${video.title}" class="thumbnail">` :
          `<video class="thumbnail" preload="metadata">
            <source src="${video.videoUrl}#t=0.5" type="video/mp4">
          </video>`}
        <div class="category-label">${video.category}</div>
        <div class="video-id">${video.videoId}</div>
        <div class="video-name">${video.title}</div>
        <div class="video-date">${video.date}</div>
      </div>
    `;

    // 绑定点击事件
    videoItem.addEventListener("click", () => openVideoModal(video.videoUrl));
    videoGallery.appendChild(videoItem);
  });

  displayPagination();
}

// 分页逻辑
function displayPagination() {
  const totalPages = Math.ceil(videoData.length / videosPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.onclick = () => {
      currentPage = i;
      displayVideos(currentPage);
    };
    pagination.appendChild(button);
  }
}

// 过滤视频
function filterVideos(category) {
  const filteredVideos = category === "全部" ? videoData : videoData.filter(video => video.category === category);
  displayFilteredVideos(filteredVideos);
}

// 显示过滤后的视频
function displayFilteredVideos(filteredVideos) {
  const videoGallery = document.getElementById("video-gallery");
  videoGallery.innerHTML = "";

  filteredVideos.forEach(video => {
    const videoItem = document.createElement("div");
    videoItem.classList.add("video-item");

    videoItem.innerHTML = `
      <div class="video-thumbnail-container">
        ${video.thumbnail ? 
          `<img src="${video.thumbnail}" alt="${video.title}" class="thumbnail">` :
          `<video class="thumbnail" preload="metadata">
            <source src="${video.videoUrl}#t=0.5" type="video/mp4">
          </video>`}
        <div class="category-label">${video.category}</div>
        <div class="video-id">${video.videoId}</div>
        <div class="video-name">${video.title}</div>
        <div class="video-date">${video.date}</div>
      </div>
    `;

    videoItem.addEventListener("click", () => openVideoModal(video.videoUrl));
    videoGallery.appendChild(videoItem);
  });
}

// 打开视频模态框
function openVideoModal(videoUrl) {
  const modal = document.getElementById("video-modal");
  const modalVideo = document.getElementById("modal-video");
  modalVideo.src = videoUrl;
  modal.classList.add("show");
  modalVideo.play();
}

// 关闭模态框
document.getElementById("close-modal").addEventListener("click", () => {
  const modal = document.getElementById("video-modal");
  modal.classList.remove("show");
  document.getElementById("modal-video").pause();
});

document.getElementById("video-modal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("video-modal")) {
    document.getElementById("video-modal").classList.remove("show");
    document.getElementById("modal-video").pause();
  }
});

// 切换主题
function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-theme");
}

// 初始化页面
displayVideos(currentPage);
