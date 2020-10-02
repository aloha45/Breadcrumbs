import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import authService from "../../services/authService";
import Users from '../Users/Users';
import Welcome from '../Welcome/Welcome'
import Room from '../Room/Room'
import NowPlaying from '../../components/NowPlaying/NowPlaying';
import "./App.css";
import SpotifyWebApi from "spotify-web-api-js";
import * as spotifyService from '../../services/spotifyService'
import {Button} from 'semantic-ui-react'

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
        <Route
          exact
          path="/"
          render={() => (
            <div id='main-wrapper'>
              <main>
              <img src='/logo.png'></img>
              <h3> DROP A CRUMB PICK ONE UP</h3>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
              <Button>LOG IN</Button> <br/><br/>
              <Button>SIGN UP</Button>
          
              </main>
            </div>
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
        <Route
          exact
          path="/welcome"
          render={() =>
            user ? <Welcome /> : <Redirect to="/login" />  
          }
        />
        <Route
          exact
          path="/room"
          render={() =>
            user ? <Room /> : <Redirect to="/login" />
          }
        />
      </>
    );
  }
}

export default App;


        {/* <NowPlaying 
          handleGetNowPlaying={this.handleGetNowPlaying}
          nowPlayingName = {this.state.nowPlaying.name}
          nowPlayingArtist = {this.state.nowPlaying.artist}
          nowPlayingAlbumArt = {this.state.nowPlaying.albumArt}
          nowPlayingLink = {this.state.nowPlaying.link}
          nowPlayingNotChecked = {this.state.nowPlaying.notChecked}/> */}