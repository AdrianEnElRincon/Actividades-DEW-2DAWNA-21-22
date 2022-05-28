const audio = document.querySelector('audio')

audio.volume = 0.5

audio.addEventListener('loadeddata', event => {
    setSongCurrentTimeHint()
    setSongDurationHint()
})

const resetPlaylist = () => {

    document.querySelectorAll('.playlist>li>i').forEach(i => {
        i.classList.remove('fa-pause')
        i.classList.remove('fa-playing')
    })

}

audio.addEventListener('play', event => {
    resetPlaylist()
    document.querySelector(`.playlist>li:nth-child(${currentTrack + 1})>i`).classList.add('fa-playing')
})

audio.addEventListener('pause', event => {
    resetPlaylist()
    document.querySelector(`.playlist>li:nth-child(${currentTrack + 1})>i`).classList.add('fa-pause')
})

audio.addEventListener('ended' , event => {
    loadTrack(currentTrack + 1 < audio.children.length ? ++currentTrack : 0)
})

const tracks = [
    {
        title: 'SoundHelix-Song-1.mp3',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
        title: 'SoundHelix-Song-2.mp3',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    }, 
    {
        title: 'SoundHelix-Song-3.mp3',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    }
]


const setSongDurationHint = () => document.querySelector('.song-progress')
    .setAttribute('data-duration', getDurationhint())

const setSongCurrentTimeHint = () => document.querySelector('.song-progress')
        .setAttribute('data-current-time', getCurrentTimeHint())



let playing = false

let progressId

const play = () => {
    audio.play()
    playing = true
    progressId = setInterval(() => {
        document.querySelector('.current-progress').style.width = `${audio.currentTime * 100 / audio.duration}%`
        setSongCurrentTimeHint()
    }, 1000)
}

const pause = () => {
    audio.pause()
    playing = false
}

const reset = () => {
    audio.pause()
    let iconClassList = document.querySelector('.play').children[0].classList
    iconClassList.remove('fa-pause')
    iconClassList.add('fa-play')
    playing = false
    document.querySelector('.current-progress').style.width = '0%'
    document.querySelector('.playlist>li>i').classList.remove('fa-playing','fa-pause')
}


let currentTrack = 0

const loadTrack = (index) => {

    clearInterval(progressId)

    audio.src = audio.children[index].getAttribute('src')

    audio.load()

    document.querySelector('.song-title').innerText = tracks[index].title

    playing ? play() : reset()

}

const togglePlaying = (ev) => {
    let iconClassList = ev.currentTarget.children[0].classList
    iconClassList.toggle('fa-play')
    iconClassList.toggle('fa-pause')
    playing ? pause() : play()
}

document.querySelector('.play').addEventListener('click', (ev) => {
    togglePlaying(ev)
})

document.querySelector('.forward').addEventListener('click', (ev) => {
    loadTrack(currentTrack + 1 < audio.children.length ? ++currentTrack : currentTrack = 0)
})

document.querySelector('.backward').addEventListener('click', (ev) => {
    loadTrack(currentTrack - 1 > 0 ? --currentTrack : currentTrack = audio.children.length - 1)
})

loadTrack(0)

function getCurrentTimeHint() {
    return [min = Math.floor(audio.currentTime / 60), Math.floor(audio.currentTime - min * 60) % 60].map(n => String(n).padStart(2, '0')).join(':')
}

function getDurationhint() {
    return [Math.floor(audio.duration / 60), Math.round(audio.duration) % 60].map(n => String(n).padStart(2, '0')).join(':')
}

