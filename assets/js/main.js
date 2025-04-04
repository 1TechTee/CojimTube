document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.ri-menu-line');
    const sidebar = document.querySelector('.sidebar');

    menuIcon.addEventListener('click', function() {
        sidebar.classList.toggle('active'); // Toggle the 'active' class
        sidebar.classList.toggle('hidden'); // Toggle the 'hidden' class
    });
});

const apiKey = 'AIzaSyCeS0GYogIFII7vzTPZpyu0ZPt0Lk6xC4w';  // Replace with your API key
const channelId = 'UCVuG_fLElXxA0KIsvcUOj0Q';  // Replace with the Channel ID you found
const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`;

async function fetchYouTubeVideos() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  
  if (data.items) {
    const videos = data.items.map(item => {
      return {
        title: item.snippet.title,
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails.high.url,
        channelName: item.snippet.channelTitle,
        channelLogo: 'https://cojim.org/static/media/logo.caf4d0a3cf688503521b.png', // You can provide a default logo URL or fetch the channel logo separately if needed
        publishDate: new Date(item.snippet.publishedAt).toLocaleDateString(), // Convert the publish date to a readable format
      };
    });

    // Display videos
    displayVideos(videos);
  } else {
    console.error('Error fetching videos');
  }
}

function displayVideos(videos) {
  const videoContainer = document.querySelector('.video-container');
  videoContainer.innerHTML = ''; // Clear any existing content

  videos.forEach(video => {
    const videoElement = document.createElement('div');
    videoElement.classList.add('video-content-cover');  // The wrapper for each video
    
    videoElement.innerHTML = `
      <div class="video-content">
        <a href="${video.videoUrl}" class="video-box">
          <img src="${video.thumbnail}" alt="${video.title}">
        </a>
        <div class="video-details">
          <div class="channel-logo">
            <img src="${video.channelLogo}" alt="${video.channelName}">
          </div>
          <div class="detail">
            <h3 class="title">${video.title}</h3>
            <div class="channel-name">${video.channelName}</div>
            <div class="views-upload">
              <div class="views">28k views</div>
              <div class="upload">${video.publishDate}</div>
            </div>
          </div>
        </div>
        <div class="hidden-content">
          <div class="btn"><i class="ri-time-line"></i>Watch later</div>
          <div class="btn"><i class="ri-play-list-2-line"></i>Add to queue</div>
        </div>
      </div>
    `;

    videoContainer.appendChild(videoElement);
  });
}

fetchYouTubeVideos();
