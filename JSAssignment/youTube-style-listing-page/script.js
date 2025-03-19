let allVidoes = [];
(async () => {
    try {

        const response = await fetch('https://api.freeapi.app/api/v1/public/youtube/videos'),
            videosDataInfo = await response.json()
        allVidoes = videosDataInfo.data.data;
        console.log(allVidoes);

        if (allVidoes.length) {
            allVidoes.forEach(element => {
                const videoData = element.items;
                const videoElement = getVideoElement(videoData);
                document.querySelector('#video-list').insertAdjacentHTML('beforeend', videoElement);
                console.log(videoElement);
            });
        }

    } catch (err) {
        console.error(err)
    }
})()

document.querySelector('#search').addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredVideos = allVidoes.filter(video => {
        const videoData = video.items;
        return videoData.snippet.title.toLowerCase().includes(searchValue) || videoData.snippet.channelTitle.toLowerCase().includes(searchValue);
    });

    document.querySelector('#video-list').innerHTML = '';
    filteredVideos.forEach(element => {
        const videoData = element.items;
        const videoElement = getVideoElement(videoData);
        document.querySelector('#video-list').insertAdjacentHTML('beforeend', videoElement);
    });
});


function getVideoElement(videoData) {
    const snippetData = videoData.snippet;
    return `<div class="video" id="${videoData.id}">
    <div class="video-card">
    <a href="https://www.youtube.com/watch?v=${videoData.id}" target="_blank">
                    <img src="${snippetData.thumbnails.medium.url}" width="${snippetData.thumbnails.medium.width}" height="${snippetData.thumbnails.medium.height}" alt="${snippetData.title}">
                </a>
    <div class="video-info">
                 <h3><a href="https://www.youtube.com/watch?v=${videoData.id}" target="_blank">${snippetData.title}</a></h3>
                 <p><a href="https://www.youtube.com/channel/${snippetData.channelId}">${snippetData.channelTitle}</a></p>
                </div>
            </div>
            </div>`;
}

