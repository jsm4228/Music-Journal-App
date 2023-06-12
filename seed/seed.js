const Chance = require('chance')
const generate = new Chance()
const db = require('../db')
const { Session, User, Song } = require('../models')

let songs

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const getSongs= async (url) => {
    let startIndex = url.indexOf('tab/') + 4; // Adding 4 to skip 'tab/'
    let endIndex = url.indexOf('/', startIndex); // the second parameter is starting index to search from
    let artist_name = url.substring(startIndex, endIndex).replace(/-/g, ' ');

    startIndex = endIndex+=1
    endIndex = url.indexOf('-chords', startIndex)
    let song_name = url.substring(startIndex, endIndex).replace(/-/g, ' ');


    return new Song({
        song_name: song_name,
        artist_name: artist_name,
        guitar_tab_url: url
    })
}

//creates songs and inserts to database
const createSongs = async () => {
    songs = Array(8).fill('')
    let urls = [
        'https://tabs.ultimate-guitar.com/tab/radiohead/creep-chords-4169',
        'https://tabs.ultimate-guitar.com/tab/ed-sheeran/perfect-chords-1956589',
        'https://tabs.ultimate-guitar.com/tab/elvis-presley/cant-help-falling-in-love-chords-1086983',
        'https://tabs.ultimate-guitar.com/tab/the-animals/house-of-the-rising-sun-chords-18688',
        'https://tabs.ultimate-guitar.com/tab/coldplay/yellow-chords-114080',
        'https://tabs.ultimate-guitar.com/tab/jeff-buckley/hallelujah-chords-198052',
        'https://tabs.ultimate-guitar.com/tab/john-denver/take-me-home-country-roads-chords-57606',
        'https://tabs.ultimate-guitar.com/tab/eagles/hotel-california-chords-46190'
    ]
    await urls.forEach(async(url, index)=> {
        songs[index] = await getSongs(url)
    
    })
    console.log(songs)
    
}


const createRandomSessions = async (user) => {
    let sessions = Array(500)
    let month = 1, day = 1
    for (let index = 0; index < sessions.length; index++) {
        let hours = Math.floor((Math.random()*24))
        
        let randint = Math.floor((Math.random()*songs.length))
            sessions[index] = await new Session({
                user_id: user._id,
                song_id: songs[randint]._id,
                duration: Math.floor((Math.random()*60)),
                mood: Math.floor((Math.random()*10)),
                focus: Math.floor((Math.random()*10)),
                notes: generate.paragraph(),
                tempo: Math.floor((Math.random()*150)),
                date: new Date(2022, month, day, hours)
            })
        if (index%2==0) {day+=1}
        if (index > 60) {month+=1; day=0}
        
    }
        
    
    await Session.insertMany(sessions)
}

const main = async () => {
    //create empty array pf songs
    await createSongs()
    await createRandomSessions(new User({user_id: 'josh'}))
}

const run = async () => {
    await main()
    db.close()

    
    
  }
  
run()