const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');


let i = 0;
let playing = false;


const playlist = [
{ title:'Largado às Traças', artist:'Zé Neto & Cristiano', src:'musicas/zeneto.mp3', cover:'capas/zeneto.jpg' },
{ title:'Infiel', artist:'Marília Mendonça', src:'musicas/marilia.mp3', cover:'capas/marilia.jpg' },
{ title:'Cê Que Sabe', artist:'Cristiano Araújo', src:'musicas/cristiano.mp3', cover:'capas/cristiano.jpg' }
];


const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');


audio.addEventListener('timeupdate', () => {
const percent = (audio.currentTime / audio.duration) * 100;
progressBar.value = percent || 0;
currentTimeEl.innerText = formatTime(audio.currentTime);
durationEl.innerText = formatTime(audio.duration);
});


progressBar.addEventListener('input', () => {
audio.currentTime = (progressBar.value / 100) * audio.duration;
});


function formatTime(time){ if(!time) return '0:00'; const m=Math.floor(time/60); const s=Math.floor(time%60).toString().padStart(2,'0'); return `${m}:${s}`; }


function play(index){
i=index;
audio.src=playlist[i].src;
cover.src=playlist[i].cover;
title.innerText=playlist[i].title;
artist.innerText=playlist[i].artist;
audio.play();
playing=true;
}


function toggle(){ if(!audio.src) return; playing?audio.pause():audio.play(); playing=!playing; }
function next(){ i=(i+1)%playlist.length; play(i); }
function prev(){ i=(i-1+playlist.length)%playlist.length; play(i); }
