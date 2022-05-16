const Spotify = require("./node_modules/spotify-finder");

const client = new Spotify({
    consumer: {
      key: '895bb9dc9b224281a1bdc690f73d4571', // from v2.1.0 is required
      secret: '8b1ee6884d8d4355a20dc98ab62b7a71' // from v2.1.0 is required
    
    }
})

module.exports = async function SpotifySearch(name)
{
return new Promise(async (res,rej) => {
  const params = {
    q: name, // required
    type: 'track',
    limit:5
  }
try {
    await client.search(params).then(data => {
        let track = Object.values(Object.values(data)[0])[1][0];//select the frsit track returned by the API 
        let artists = [];
        track.artists.forEach(artist => {
            artists.push(artist.name)
        });
    
        let albumname = track.album.name;
        let songname = track.name;

        console.log(`Song Name: ${songname}`);
        console.log(`Album name: ${albumname}`)
        console.log(`Artists`);
        console.log("------------")
        
        for (let i = 0; i < artists.length; i++) {
            console.log(`${i+1}: ${artists[i]}`)
          }
    
        res();
    })
} catch (error) {
    console.log(`Error: ${error.message}`);
    rej();
}

})};