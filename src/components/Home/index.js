import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import OriginalsRow from '../OriginalsRow'
import TrendingRow from '../TrendingRow'
import TopRatedRow from '../TopRatedRow'
import Banner from '../Banner'
import './index.css'

class HomePage extends Component {
  render() {
    const jwtToken = Cookies.get('request_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-page-bg-container">
        <Header />
        <Banner />
        <div className="main-display">
          <TrendingRow />
        </div>
        <div className="main-display">
          <TopRatedRow />
        </div>
        <div className="main-display">
          <OriginalsRow />
        </div>
      </div>
    )
  }
}

export default HomePage
