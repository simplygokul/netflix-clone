import {Component} from 'react'
import './index.css'

class Banner extends Component {
  state = {oneMovie: []}

  componentDidMount() {
    this.getRandomOriginals()
  }

  getRandomOriginals = async () => {
    const originalsUrl =
      'https://api.themoviedb.org/3/discover/tv?api_key=a296c915c9f82c25cca95eab8568c3a2'
    const response = await fetch(originalsUrl)
    const data = await response.json()
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)]
    console.log(randomMovie)
    this.setState({oneMovie: randomMovie})
  }

  truncate = (str, n) => (str?.length > n ? `${str.substr(0, n - 1)}...` : str)

  render() {
    const {oneMovie} = this.state
    return (
      <div
        className="banner-container"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${oneMovie.backdrop_path}")`,
          backgroundPosition: 'center center',
        }}
      >
        <div className="banner-content">
          <h1 className="banner-heading">{oneMovie.original_name}</h1>
          <h1 className="banner-description">
            {this.truncate(oneMovie?.overview, 150)}
          </h1>
          <button className="banner-button" type="button">
            Play
          </button>
        </div>
        <div className="banner-fade-container" />
      </div>
    )
  }
}

export default Banner
