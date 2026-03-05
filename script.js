const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const progressFill = document.getElementById('progress-fill');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('total-duration');

// Função para formatar o tempo de segundos para 0:00
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Tocar ou Pausar
playBtn.addEventListener('click', () => {
    if (audio.src === "" || audio.src.endsWith('/')) {
        alert("Selecione uma música primeiro!");
        return;
    }
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Atualiza a barra e os números do cronômetro
audio.addEventListener('timeupdate', () => {
    const { duration, currentTime } = audio;
    if (duration) {
        const percent = (currentTime / duration) * 100;
        progressFill.style.width = `${percent}%`;
        
        currentTimeEl.innerText = formatTime(currentTime);
        durationEl.innerText = formatTime(duration);
    }
});

// Faz a barra ser clicável (mudar posição da música)
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

const playlist = [
{ title:'Largado às Traças', artist:'Zé Neto & Cristiano', src:'musicas/zeneto.mp3', cover:'capas/zeneto.jpg' },
{ title:'Infiel', artist:'Marília Mendonça', src:'musicas/marilia.mp3', cover:'capas/marilia.jpg' },
{ title:'Cê Que Sabe', artist:'Cristiano Araújo', src:'musicas/cristiano.mp3', cover:'capas/cristiano.jpg' }
];
