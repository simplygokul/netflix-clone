import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
}

export default class TopRatedRow extends Component {
  constructor(props) {
    super(props)
    this.state = {topMovies: []}
  }

  componentDidMount() {
    this.fetchTopMovies()
  }

  fetchTopMovies = () => {
    fetch(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=a296c915c9f82c25cca95eab8568c3a2&language=en-US',
    )
      .then(response => response.json())
      .then(response => {
        this.setState({topMovies: response.results})
      })
  }

  renderSlider = () => {
    const {topMovies} = this.state

    return (
      <Slider {...settings}>
        {topMovies.map(topRatedMovie => {
          const movieImage = `https://image.tmdb.org/t/p/original/${topRatedMovie.poster_path}`
          return (
            <div className="react-slick-item" key={topRatedMovie.id}>
              <Link to={`/movies/${topRatedMovie.id}`}>
                <img
                  className="poster"
                  src={movieImage}
                  width="100%"
                  height="100%"
                  alt="originals"
                />
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    const {topMovies} = this.state

    return (
      <div className="slick-app-container">
        <h1 className="top-rated-heading">Top Rated</h1>
        <div className="slider-container">
          {topMovies.length ? (
            this.renderSlider()
          ) : (
            <p style={{textAlign: 'center'}}>Loading...................</p>
          )}

          <Slider {...settings} />
        </div>
      </div>
    )
  }
}
