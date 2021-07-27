import {Component} from 'react'
import Listing from '../Listing'
import SimilarMovies from '../SimilarMovies'
import './index.css'

class Movies extends Component {
  state = {specificMovie: [], genreNames: [], languages: [], similarMovies: []}

  componentDidMount() {
    this.getMoviesItemDetails()
  }

  getMoviesItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const specificMovieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=a296c915c9f82c25cca95eab8568c3a2`
    const fetchSpecificMovie = await fetch(specificMovieUrl)
    const specificMovieData = await fetchSpecificMovie.json()
    const relatedMovies = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=a296c915c9f82c25cca95eab8568c3a2`
    const fetchRelatedMovies = await fetch(relatedMovies)
    const relatedMovieData = await fetchRelatedMovies.json()
    const relatedMovieResults = relatedMovieData.results
    const fewResults = relatedMovieResults.slice(0, 8)
    console.log(fewResults)
    this.setState({
      specificMovie: specificMovieData,
      genreNames: specificMovieData.genres,
      languages: specificMovieData.spoken_languages,
      similarMovies: fewResults,
    })
  }

  truncate = (str, n) => (str?.length > n ? `${str.substr(0, n - 1)}...` : str)

  render() {
    const {specificMovie, genreNames, languages, similarMovies} = this.state

    return (
      <div className="movies-main-container">
        <div
          className="movies-bg-container"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${specificMovie.backdrop_path}")`,
            backgroundPosition: 'center center',
          }}
        >
          <div className="new-banner-content">
            <h1 className="new-banner-heading">{specificMovie.title}</h1>
            <h1 className="new-banner-description">
              {this.truncate(specificMovie?.overview, 150)}
            </h1>
            <button className="new-banner-button" type="button">
              Play
            </button>
          </div>
          <div className="banner-fade-container" />
        </div>
        <div className="movie-details-container">
          <div className="genres-container">
            <h1 className="genre-name">Genres</h1>
            {genreNames.map(content => (
              <Listing categories={content.name} key={content.id} />
            ))}
          </div>
          <div className="audio-container">
            <h1 className="audio-name">Audio Available</h1>
            {languages.map(content => (
              <Listing categories={content.name} />
            ))}
          </div>
          <div className="rating-container">
            <h1 className="rating">Rating Count</h1>
            <p className="rating-count">{specificMovie.popularity}</p>
            <h1 className="rating">Rating Average</h1>
            <p className="rating-count">{specificMovie.vote_average}</p>
          </div>
          <div className="budget-release-date-container">
            <h1 className="budget-heading">Budget</h1>
            <p className="budget">{specificMovie.budget}</p>
            <h1 className="date-heading">Release Date</h1>
            <p className="date">{specificMovie.release_date}</p>
          </div>
        </div>
        <div className="similar-movies-main-container">
          <h1 className="similar-movies-heading">More Like This</h1>
          <div className="similar-movies-container">
            {similarMovies.map(movieDetails => (
              <SimilarMovies details={movieDetails} key={movieDetails.id} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default Movies
