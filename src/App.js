import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import HomePage from './components/Home'
import Popular from './components/Popular'
import Movies from './components/Movies'
import DisplaySearchMovies from './components/DisplaySearchMovies'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/popular" component={Popular} />
      <Route exact path="/movies/:id" component={Movies} />
      <Route exact path="/search/:movies" component={DisplaySearchMovies} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
