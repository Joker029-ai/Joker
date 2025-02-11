// 如果你要动态加载视频数据，可以在这里编写JS代码来生成视频列表。
const videoData = [
  {
    title: "视频 1 标题",
    thumbnail: "images/video1-thumbnail.jpg",
    videoUrl: "videos/video1.mp4"
  },
  {
    title: "视频 2 标题",
    thumbnail: "images/video2-thumbnail.jpg",
    videoUrl: "videos/video2.mp4"
  },
  {
    title: "视频 3 标题",
    thumbnail: "images/video3-thumbnail.jpg",
    videoUrl: "videos/video3.mp4"
  }
];

const gallery = document.querySelector('.video-gallery');

videoData.forEach(video => {
  const videoItem = document.createElement('div');
  videoItem.classList.add('video-item');
  
  videoItem.innerHTML = `
    <a href="${video.videoUrl}" target="_blank">
      <img src="${video.thumbnail}" alt="${video.title}">
      <h3>${video.title}</h3>
    </a>
  `;
  
  gallery.appendChild(videoItem);
});
