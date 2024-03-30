import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movieInfos, setMovieInfo] = useState();
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovieInfo(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img
            width="230"
            height="340"
            src={movieInfos.background_image}
            alt="img"
          />
          <h1>{movieInfos.title}</h1>
          {movieInfos.genres.map((genres) => (
            <li key={genres}>{genres}</li>
          ))}
        </div>
      )}
    </div>
  );
}

export default Detail;
