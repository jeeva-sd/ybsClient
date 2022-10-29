export const getContent = async (video) => {
    return `
    <h2 style="text-align: left;">${video.title}</h2>
    <div><br /></div>
    <div class="separator" style="clear: both; text-align: center;">
        <a href=${video.thumbnail} style="margin-left: 1em; margin-right: 1em;">
            <img border="0" data-original-height="450" data-original-width="800" height="365" width="600"
                src=${video.thumbnail} />
        </a>
    </div>
    <br />
    <div><br /></div>
    <div>
        <pre style="background-color: white; color: #202124; white-space: pre-wrap">
            ${video.description}
        </pre>
    </div>
    <div>
        <span style="background-color: white; color: #202124;">
            <button class="btn"
                style="background-color: dodgerblue; border: none; color: white; cursor: pointer; font-size: 20px; padding: 12px 30px;">
                <a style="color: white" href=https://jusdownload.herokuapp.com/youtube/download?URL=https://www.youtube.com/watch?v=${video.videoId}&format=audio>Download Video</a>
            </button>
        </span>
        <span>
            <button class="btn"
                style="background-color: dodgerblue; border: none; color: white; cursor: pointer; font-size: 20px; padding: 12px 30px;">
                <a style="color: white" href=https://jusdownload.herokuapp.com/youtube/download?URL=https://www.youtube.com/watch?v=${video.videoId}&format=audio>Download Audio</a>
            </button>
        </span>
    </div>
    <div>
        <span style="background-color: white; color: #202124;"><br />
        </span>
    </div>
    <div><br /></div>`;
};