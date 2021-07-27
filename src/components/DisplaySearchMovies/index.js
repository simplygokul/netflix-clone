import {Component} from 'react'
import Header from '../Header'
import SearchMovieItem from '../SearchMovieItem'
import './index.css'

class DisplaySearchMovies extends Component {
  state = {
    searchData: [],
    searchPageNum: 0,
    totalPages: 0,
    userEnteredInput: '',
  }

  componentDidMount() {
    this.getSearchResultsData()
  }

  getSearchResultsData = async () => {
    const {match} = this.props
    const {params} = match
    const {movies} = params
    const fetchResponseData = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=a296c915c9f82c25cca95eab8568c3a2&language=en-US&query=${movies}&page=${this.searchPageNum}`,
    )
    const responseData = await fetchResponseData.json()
    this.setState({
      searchData: responseData.results,
      searchPageNum: responseData.page,
      totalPages: responseData.total_pages,
      userEnteredInput: movies,
    })
  }

  searchNextPage = () => {
    this.setState(
      prevState => ({
        searchPageNum: prevState.searchPageNum + 1,
      }),
      () => this.fetchNewMoviePage(),
    )
  }

  searchPreviousPage = () => {
    this.setState(
      prevState => ({
        searchPageNum: prevState.searchPageNum - 1,
      }),
      () => this.fetchNewMoviePage(),
    )
  }

  fetchNewMoviePage = () => {
    const {userEnteredInput} = this.state
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=a296c915c9f82c25cca95eab8568c3a2&language=en-US&query=${userEnteredInput}&page=${this.searchPageNum}`,
    )
      .then(response => response.json())
      .then(json =>
        this.setState({searchData: json.results, searchPageNum: json.page}),
      )
  }

  render() {
    const {searchData, searchPageNum, totalPages} = this.state
    return (
      <>
        <Header />
        <div className="search-movies-bg-container">
          <div className="search-results-container">
            <div className="search-movie-list-container">
              {searchData.map(searchItem => (
                <SearchMovieItem
                  searchItemData={searchItem}
                  key={searchItem.id}
                />
              ))}
            </div>
          </div>
          <div className="search-page-count-container">
            <img
              src="https://res.cloudinary.com/dnjj1m9j1/image/upload/v1624346813/Icon_hqtcpn.png"
              alt="prev-icon"
              className="arrow"
              onClick={this.searchPreviousPage}
            />
            <h1 className="pages">
              <span>{searchPageNum}</span> of <span>{totalPages}</span>
            </h1>
            <img
              src="https://res.cloudinary.com/dnjj1m9j1/image/upload/v1624347331/Icon_hulq8z.png"
              alt="nxt-icon"
              className="search-page-arrow"
              onClick={this.searchNextPage}
            />
          </div>
        </div>
      </>
    )
  }
}
export default DisplaySearchMovies
