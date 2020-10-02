import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import authService from "../../services/authService";
import Users from '../Users/Users';
import NowPlaying from '../../components/NowPlaying/NowPlaying';
import "./App.css";
import SpotifyWebApi from "spotify-web-api-js";
import * as spotifyService from '../../services/spotifyService'
import Footer from '../../components/Footer/Footer'

const spotifyApi = new SpotifyWebApi()

class App extends Component {
  state = {
    loggedIn: false,
    spotifyToken: '',
    user: authService.getUser(),
    nowPlaying: {
      name: 'Not Checked', 
      albumArt: '?', 
      artist: 'Not Checked',
      link: '',
      notChecked: false
  }
  };

  handleGetNowPlaying = async newPlayData => {
    const response = await spotifyService.getNowPlaying(newPlayData);
    this.setState({nowPlaying: { 
      name: response.item.name, 
      albumArt: response.item.album.images[0].url,
      artist: response.item.artists[0].name,
      link: response.item.external_urls.spotify,
      notChecked: true}});
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    this.setState({spotifyToken : hashParams.access_token})
    return hashParams;
  }

  handleLogout = () => {
    authService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: authService.getUser() });
  };

  async componentDidMount() {
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      this.setState({loggedIn: true})
      spotifyApi.setAccessToken(token);
    }
  }

  render() {
    const {user} = this.state
    return (
      <>
      <div id='main-wrapper'>
        <NavBar user={this.state.user} handleLogout={this.handleLogout}/>
        <Route
          exact
          path="/"
          render={() => (
            <main>
              <h1>Welcome to Breadcrumbs.</h1>
            </main>
          )}
        />
        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <Signup
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <Login
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/users"
          render={() =>
            user ? <Users /> : <Redirect to="/login" />
          }
        />
        <NowPlaying 
          handleGetNowPlaying={this.handleGetNowPlaying}
          nowPlayingName = {this.state.nowPlaying.name}
          nowPlayingArtist = {this.state.nowPlaying.artist}
          nowPlayingAlbumArt = {this.state.nowPlaying.albumArt}
          nowPlayingLink = {this.state.nowPlaying.link}
          nowPlayingNotChecked = {this.state.nowPlaying.notChecked}/>
        </div>
        <Footer />  
      </>
    );
  }
}

export default App;
