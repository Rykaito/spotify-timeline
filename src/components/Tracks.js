import { useEffect, useState } from "react";
import Media from './Media';

const Tracks = ({ token }) => {
  const [tracks, setTracks] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);

  useEffect(() => {
    if (tracks.length === 0 && token) {
      getTopTracks();
    }
  }, []);

  const getTopTracks = async () => {
    //api call
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    //return call as array of tracks
    const output = await result.json();
    output.items.sort((a, b) => {
      let x = a.album.release_date;
      let y = b.album.release_date;
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    //clear tracks array
    setTracks([]);
    let temp = [];
    output.items.map((hit) => temp.push(hit));
    setTracks(temp);
    let years = [];
    temp.forEach((item) => years.push(item.album.release_date.substring(0, 4)));
    setUniqueYears([...new Set(years)]);
  };

  return (
    <>
      <div class="release">
        {/* <button onClick={groupTracksByYear}>group</button> */}
        <button onClick={() => console.log(uniqueYears)}>Uyears</button>
        <button onClick={() => console.log(tracks)}>tracks</button>
        <a>1990</a>
      </div>
      <div class="media">
        <div class="album"></div>
        <div class="album"></div>
        <div class="album"></div>
        <div class="album"></div>
      </div>
      {uniqueYears.map((year) => (
        <>
          <div className="release">
            <a>{year}</a>
          </div>
          <div className="media">
            {tracks.forEach((track) => {
                if (track.album.release_date.substring(0, 4) === year) {
                    console.log(4)
                  return <Media />
              }
            })}
          </div>
        </>
      ))}
      <div class="release">
        <a>2000</a>
      </div>
      <div class="media">
        <div class="album"></div>
        <div class="album"></div>
        <div class="album"></div>
        <div class="album"></div>
      </div>
      <div class="release">
        <a>3000</a>
      </div>
      <div class="media">
        <div class="album"></div>
        <div class="album"></div>
        <div class="album"></div>
        <div class="album"></div>
      </div>
    </>
  );
};

export default Tracks;
