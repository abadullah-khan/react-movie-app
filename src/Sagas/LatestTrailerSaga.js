import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { getLatestTrailers, setLatestTrailers } from "../Slices/HomeSlice";

const videoTypePriority = {
  Teaser: 1,
  Trailer: 2,
  Clip: 3,
  Featurette: 4,
  // Behind the Scenes: 5,
  Other: 6,
};

const filterTrailers = (videos) => {
  const filteredVideos = videos.reduce((acc, video) => {
    const currentTypePriority = videoTypePriority[video.type] || 6;
    // trailer.typePriority = trailerTypePriority[trailer.type] || 6;
    if (!acc.length || currentTypePriority < acc[0].typePriority) {
      acc = [video];
    } else if (currentTypePriority === acc[0].typePriority) {
      if (new Date(video.release_date) > new Date(acc[0].release_date)) {
        acc = [video];
      }
    }
    return acc;
  }, []);
  return filteredVideos;
};

function* fetchData(action) {
  const { contentType } = action.payload;
  const apiKey = import.meta.env.VITE_TMDB_API_KEY; // Assuming you import from env

  // Get movie IDs and movie details
  const movieResponse = yield axios.get(
    `https://api.themoviedb.org/3/movie/${contentType.movie}?api_key=${apiKey}&language=en-US&page=1`
  );
  const movieIds = movieResponse.data.results.map((movie) => movie.id);
  const movieDetails = movieResponse.data.results.map((movie) => ({
    movieId: movie.id,
    title: movie.title,
    mediaType: "movie",
  })); // Store movie titles

  // Get movie trailers with movie title
  const movieTrailers = yield Promise.all(
    movieIds.map(async (id, index) => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
      );
      const videos = response.data.results;
      const filteredVideos = filterTrailers(videos);
      const trailers = filteredVideos.map((trailer) => ({
        ...trailer,
        ...movieDetails[index],
      })); // Add movie title
      return trailers;
    })
  );

  // Get TV show IDs and TV show details
  const tvShowResponse = yield axios.get(
    `https://api.themoviedb.org/3/tv/${contentType.tv}?api_key=${apiKey}&language=en-US&page=1`
  );
  const tvShowIds = tvShowResponse.data.results.map((tvShow) => tvShow.id);
  const tvShowDetails = tvShowResponse.data.results.map((tvShow) => ({
    movieId: tvShow.id,
    title: tvShow.name,
    mediaType: "tv",
  })); // Store TV show names

  // Get TV show trailers with TV show name
  const tvShowTrailers = yield Promise.all(
    tvShowIds.map(async (id, index) => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=en-US&page=1`
      );
      const videos = response.data.results;
      const filteredVideos = filterTrailers(videos);
      const trailers = filteredVideos.map((trailer) => ({
        ...trailer,
        ...tvShowDetails[index],
      }));
      return trailers;
    })
    // Add TV show name
  );
  const combinedTrailers = [
    ...movieTrailers.filter((trailer) => trailer.length > 0 && trailer),
    ...tvShowTrailers.filter((trailer) => trailer.length > 0 && trailer),
  ];
  yield put(
    setLatestTrailers(
      combinedTrailers
        .flat()
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
        .slice(0, 20)
    )
  );
}

export function* LatestTrailerSaga() {
  yield takeLatest(getLatestTrailers.type, fetchData);
}
