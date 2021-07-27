import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    token: '',
    showSubmitError: false,
    errorMsg: '',
  }

  componentDidMount() {
    this.getToken()
  }

  getToken = () => {
    fetch(
      'https://api.themoviedb.org/3/authentication/token/new?api_key=a296c915c9f82c25cca95eab8568c3a2',
    )
      .then(response => response.json())
      .then(response => {
        this.setState({token: response.request_token})
      })
  }

  submitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('request_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password, token} = this.state

    const userDetails = {
      username,
      password,
      request_token: token,
    }
    console.log(userDetails)
    const url =
      'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=a296c915c9f82c25cca95eab8568c3a2'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.submitSuccess(data.request_token)
    } else {
      this.onSubmitFailure(data.status_message)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="inputs-container">
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="inputs-container">
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('request_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="bg-container">
        <form className="login-container" onSubmit={this.submitForm}>
          <h1 className="heading">Sign In</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="error-msg-container">
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm
