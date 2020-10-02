import SpotifyWebApi from 'spotify-web-api-js'
const spotifyApi = new SpotifyWebApi();
const baseUrl = "https://api.spotify.com/v1/search"

export function getNowPlaying(){
  return spotifyApi.getMyCurrentPlaybackState()
}

export async function testElvis() {
    return await spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE');
}

//does this function need a spotify token?
export async function searchArtistNames(){
    return await spotifyApi.searchArtists('Love')
    .then(function(data) {
      console.log('Search artists by "Love"', data.body);
    }, function(err) {
      console.error(err);
    });
}

export function songSearch(formData){
        // call token function save as tokenvariable
    const token = spotifyApi.getAccessToken()
  return fetch(`${baseUrl}/q=name:${formData}&type=track`, 
  {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res.json())
  // .then(console.log(res))
  .catch (err => console.log(err))
}