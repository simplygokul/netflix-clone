import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
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

export default class TrendingRow extends Component {
  constructor(props) {
    super(props)
    this.state = {trendingMovies: []}
  }

  componentDidMount() {
    this.fetchTrendingMoies()
  }

  fetchTrendingMoies = () => {
    fetch(
      'https://api.themoviedb.org/3/trending/all/day?api_key=a296c915c9f82c25cca95eab8568c3a2',
    )
      .then(response => response.json())
      .then(response => {
        this.setState({trendingMovies: response.results})
      })
  }

  renderSlider = () => {
    const {trendingMovies} = this.state

    return (
      <Slider {...settings}>
        {trendingMovies.map(trendingMovie => {
          const trendingMovieImage = `https://image.tmdb.org/t/p/original/${trendingMovie.poster_path}`
          return (
            <div className="react-slick-item" key={trendingMovie.id}>
              <Link to={`/movies/${trendingMovie.id}`}>
                <img
                  className="poster"
                  src={trendingMovieImage}
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
    const {trendingMovies} = this.state

    return (
      <div className="slick-app-container">
        <h1 className="trending-heading">Trending Now</h1>
        <div className="slider-container">
          {trendingMovies.length ? (
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
