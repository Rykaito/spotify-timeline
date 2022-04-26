const Media = ({ year, tracks }) => {
  return (
    <>
      <div className="release">
        <a>{year}</a>
      </div>
      <div className="media">
        {tracks.map(function (track) {
          if (track.album.release_date.substring(0, 4) === year) {
            return (
                <a className="album" key={track.name + " album"} href={track.external_urls.spotify} target="_blank">
                  <img
                    src={track.album.images[1].url}
                  ></img>
                  <p className="album-title" key={track.name}>
                    {track.name}
                  </p>
                </a>
            );
          }
        })}
      </div>
    </>
  );
};

export default Media;
