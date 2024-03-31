import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

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
  });
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.movie_info}>
          <img
            className={styles.movie_img}
            src={movieInfos.background_image}
            alt="img"
          />
          <h1>{movieInfos.title}</h1>
          {movieInfos.genres.map((genres) => (
            <span key={genres}>{genres}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Detail;
