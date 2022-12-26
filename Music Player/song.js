const music = document.querySelector('audio');
const play = document.getElementById('pause');


const naam = document.querySelector('.naam');
const gayak = document.querySelector('.gayak');
const img = document.querySelector('img');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const p_bar = document.querySelector('.p_bar');
const st_time = document.querySelector('#st_time');
const end_time = document.querySelector('#end_time');
const p_div = document.querySelector('.p_div');

const allsongs = [
    {
        song: "Imagine Dragons - Believer.mp3",
        song_naam: "Believer",
        song_gayak: "Imagine Dragons",
    },
    {
        song: "Ed Sheeran - Shape of You [Official Video].mp3",
        song_naam: "Shape of You",
        song_gayak: "Ed Sheeran",
    },
    {
        song: "faded.mp3",
        song_naam: "FADED",
        song_gayak: "Alan Walker",
    },
    {
        song: "Luis Fonsi - Despacito ft. Daddy Yankee.mp3",
        song_naam: "Despacito",
        song_gayak: "Luis Fonsi & Daddy Yankee",
    },
    {
        song: "Sia - Cheap Thrills ft. Sean Paul (Lyric Video).mp3",
        song_naam: "Cheap Thrills",
        song_gayak: "Sia",
    },
    {
        song: "rider.mp3",
        song_naam: "I Am A Rider",
        song_gayak: "Imran Khan",
    },


];

let isplaying = false;
const playmusic = () => {
    isplaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    play.title="pause";
}
const pausemusic = () => {
    isplaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    play.title="play";
}

play.addEventListener('click', () => {
    isplaying ? pausemusic() : playmusic();
});



const loadsongs = (allsongs) => {
    naam.textContent = allsongs.song_naam;
    gayak.textContent = allsongs.song_gayak;
    music.src = allsongs.song;
};



var i = 0;

const nextsongs = () => {
    i = (i + 1) % allsongs.length;
    loadsongs(allsongs[i]);
    playmusic();
}

const prevsongs = () => {
    i--;
    if (i <= 0) {
        i = 4;
    }
    loadsongs(allsongs[i-1]);
    playmusic();
}

music.addEventListener('timeupdate', (event) => {
    const { currentTime, duration } = event.srcElement; 

    let time = (currentTime / duration) * 100;
    p_bar.style.width = `${time}%`;
    if (p_bar.style.width == "100%") {
        nextsongs();
        p_bar.style.width = "0%";
    }


    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let end = `${min_duration}:${sec_duration}`;
    if (duration) {
        end_time.textContent = end;
    }

    let min_curtime = Math.floor(currentTime / 60)
    let sec_curtime = Math.floor(currentTime % 60);
    if (sec_curtime < 10) {
        sec_curtime = `0${sec_curtime}`
    }
    let strt = `${min_curtime}:${sec_curtime}`;
    st_time.textContent = strt;

});


p_div.addEventListener('click', (dba) => {
    const { duration } = music;

    let le_chalo = (dba.offsetX / dba.srcElement.clientWidth) * duration;

    music.currentTime = le_chalo;

});



next.addEventListener('click', nextsongs);
prev.addEventListener('click', prevsongs);



