import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import Search from '../Search'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookie.remove('request_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="headers">
      <div className="content-container">
        <div className="start-part">
          <img
            src="https://res.cloudinary.com/dnjj1m9j1/image/upload/v1624196500/Group_7399_cjjn5h.png"
            alt="movielogo"
          />
          <ul>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/popular" className="nav-link">
              Popular
            </Link>
            <button className="nav-link" type="button" onClick={onClickLogout}>
              Logout
            </button>
          </ul>
        </div>
        <div className="end-part">
          <ul>
            <Search />
            {/*
            <img
              src="https://res.cloudinary.com/dnjj1m9j1/image/upload/v1624196473/Avatar_gmrmra.png"
              className="profile-img"
              alt="profileImg"
            />
            */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
