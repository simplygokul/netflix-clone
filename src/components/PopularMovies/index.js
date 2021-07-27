import {Link} from 'react-router-dom'
import './index.css'

const PopularMovies = props => {
  const {fetchedData} = props
  return (
    <div className="movie-container">
      <Link to={`/movies/${fetchedData.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w185${fetchedData.poster_path}`}
          className="img-props"
          alt="popularImg"
        />
      </Link>
    </div>
  )
}
export default PopularMovies
