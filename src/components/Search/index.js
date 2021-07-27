import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './index.css'

class Search extends Component {
  state = {/* queryResults: [], */ userInputValue: ''}

  startSearch = value => {
    const {history} = this.props
    history.push(`/search/${value}`)
  }

  onSubmitSearch = async event => {
    event.preventDefault()
    const {userInputValue} = this.state
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=a296c915c9f82c25cca95eab8568c3a2&language=en-US&query=${userInputValue}`
    const response = await fetch(searchUrl)
    const searchResponses = await response.json()
    /* const searchResponseResult = searchResponses.results */
    /* this.setState({queryResults: searchResponseResult}) */
    /* const result = searchResponses.results.length */
    if (searchResponses.results.length !== 0) {
      this.startSearch(userInputValue)
    }
  }

  onChangeInput = event => {
    this.setState({userInputValue: event.target.value})
  }

  render() {
    const {userInputValue} = this.state
    return (
      <div>
        <form onSubmit={this.onSubmitSearch}>
          <input
            type="text"
            placeholder="Search..."
            onChange={this.onChangeInput}
            value={userInputValue}
          />
        </form>
      </div>
    )
  }
}
export default withRouter(Search)
