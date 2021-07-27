import {Link} from 'react-router-dom'
import './index.css'

const SearchMovieItem = props => {
  const {searchItemData} = props
  return (
    <div className="search-item-container">
      <Link to={`/movies/${searchItemData.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w185${searchItemData.poster_path}`}
          className="search-img"
          alt={`${searchItemData.original_title}`}
        />
      </Link>
    </div>
  )
}
export default SearchMovieItem
