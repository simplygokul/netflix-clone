import './index.css'

const SimilarMovies = props => {
  const {details} = props
  return (
    <div className="movie-data-container">
      <img
        src={`https://image.tmdb.org/t/p/w185${details.poster_path}`}
        className="similar-movie-poster"
        alt={`${details.original_title}`}
      />
    </div>
  )
}
export default SimilarMovies
