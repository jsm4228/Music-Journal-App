const { Song } = require(`../models`)




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
const createSongs = async (req, res) => {
  
    let url = req.params.tabs_url
        song = await getSongs(url)
    
    
    let songObj = await Song.insertMany(song)
    res.send(songObj)
    
}

const getSongbyName = async(req, res) => {
    let song = await Song.findOne({"song_name": req.params.song})
    res.send(song)
}


const updateSongName = async(req, res) => {
    await Song.findByIdAndUpdate(req.params.id, {'song_name': req.params.new_song})
    res.send('done')
}

module.exports = {
    createSongs,
    getSongbyName
}