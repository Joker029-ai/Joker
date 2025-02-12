const videoData = [
  {
    title: "动画视频 1",
    videoUrl: "videos/1.mp4",
    thumbnail: "images/A.jpg" // 手动设置封面
  },
  {
    title: "动画视频 2",
    videoUrl: "videos/1.mp4",
    thumbnail: "" // 没有封面，使用视频自带的封面
  },
  {
    title: "动画视频 3",
    videoUrl: "videos/1.mp4",
    thumbnail: "" // 没有封面，使用视频自带的封面
  },
  // 更多视频项
];

let currentPage = 1;
const videosPerPage = 20;

// 动态加载视频列表
function displayVideos(page) {
  const startIndex = (page - 1) * videosPerPage;
  const endIndex = page * videosPerPage;
  const currentVideos = videoData.slice(startIndex, endIndex);

  const videoGallery = document.getElementById("video-gallery");
  videoGallery.innerHTML = ""; // 清空现有的视频项

  currentVideos.forEach(video => {
    const videoItem = document.createElement("div");
    videoItem.classList.add("video-item");

    // 判断是否有封面，如果没有封面，使用视频的第一帧
    const thumbnail = video.thumbnail ? video.thumbnail : video.videoUrl;

    videoItem.innerHTML = `
      <div class="video-link" onclick="openVideoModal('${video.videoUrl}')">
        <video class="video-thumbnail" width="320" height="240" preload="metadata" ${video.thumbnail ? 'style="display:none;"' : ''}>
          <source src="${video.videoUrl}" type="video/mp4">
        </video>
        <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail-img" ${video.thumbnail ? '' : 'style="display:none;"'}>
        <h3>${video.title}</h3>
      </div>
    `;
    videoGallery.appendChild(videoItem);
  });

  displayPagination();
}

// 显示分页
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

// 搜索视频
function searchVideos() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const filteredVideos = videoData.filter(video => video.title.toLowerCase().includes(searchTerm));
  displayFilteredVideos(filteredVideos);
}

function displayFilteredVideos(filteredVideos) {
  const videoGallery = document.getElementById("video-gallery");
  videoGallery.innerHTML = ""; // 清空现有的视频项

  filteredVideos.forEach(video => {
    const videoItem = document.createElement("div");
    videoItem.classList.add("video-item");

    // 判断是否有封面，如果没有封面，使用视频的第一帧
    const thumbnail = video.thumbnail ? video.thumbnail : video.videoUrl;

    videoItem.innerHTML = `
      <div class="video-link" onclick="openVideoModal('${video.videoUrl}')">
        <video class="video-thumbnail" width="320" height="240" preload="metadata" ${video.thumbnail ? 'style="display:none;"' : ''}>
          <source src="${video.videoUrl}" type="video/mp4">
        </video>
        <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail-img" ${video.thumbnail ? '' : 'style="display:none;"'}>
        <h3>${video.title}</h3>
      </div>
    `;
    videoGallery.appendChild(videoItem);
  });
}

// 弹出视频播放的模态框
function openVideoModal(videoUrl) {
  const modal = document.getElementById("video-modal");
  const modalVideo = document.getElementById("modal-video");
  modal.style.display = "flex"; // 显示模态框
  modalVideo.src = videoUrl; // 设置视频源

  // 为模态框添加渐变出现的效果
  modal.classList.add("show-modal");

  // 点击关闭按钮时关闭模态框
  document.getElementById("close-modal").onclick = () => {
    modal.style.display = "none";
    modalVideo.pause();
    modalVideo.src = ''; // 清空视频源，停止播放
    modal.classList.remove("show-modal"); // 移除动态效果
  };
}

// 初始化页面
displayVideos(currentPage);
