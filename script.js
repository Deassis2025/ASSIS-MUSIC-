const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const progressFill = document.getElementById('progress-fill');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('total-duration');

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

function playSong(file, title, artist, cover) {
    audio.src = file;
    document.getElementById('player-title').innerText = title;
    document.getElementById('player-artist').innerText = artist;
    document.getElementById('player-album-art').src = cover;
    
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

playBtn.addEventListener('click', () => {
    if (!audio.src) return;
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

audio.addEventListener('timeupdate', () => {
    const { duration, currentTime } = audio;
    if (duration) {
        const percent = (currentTime / duration) * 100;
        progressFill.style.width = `${percent}%`;
        currentTimeEl.innerText = formatTime(currentTime);
        durationEl.innerText = formatTime(duration);
    }
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});
