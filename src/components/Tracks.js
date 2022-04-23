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
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50", {
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
      {uniqueYears.map((year) => (
        <Media key={year} year={year} tracks={tracks}/>
      ))}
    </>
  );
};

export default Tracks;
