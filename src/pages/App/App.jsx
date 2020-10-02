import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
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
import {Button} from 'semantic-ui-react';
import * as roomAPI from '../../services/rooms-api';
import CreateRoom from '../CreateRoom/CreateRoom'
import CreateSpotifyPost from "../../components/CreateSpotifyPost/CreateSpotifyPost";
import CreatePicPost from '../../components/CreatePicPost/CreatePost'


const spotifyApi = new SpotifyWebApi()

class App extends Component {
  state = {
    loggedIn: false,
    spotifyToken: '',
    rooms: [],
    user: authService.getUser(),
  };

  handleAddRoom = async newRoomData => {
    const newRoom = await roomAPI.create(newRoomData);
    newRoom.createdBy = { name: this.state.user.name, _id: this.state.user._id }
    this.setState(state => ({
      rooms: [...state.rooms, newRoom]
    }), () => this.props.history.push('/welcome'));
  }

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
    const rooms = await roomAPI.getAll();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      this.setState({loggedIn: true})
      spotifyApi.setAccessToken(token);
    }
    this.setState({ rooms })
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
              <a href='/login'>
              <Button>LOG IN</Button> <br/><br/>
              </a>
              <a href='/signup'>
              <Button>SIGN UP</Button>
              </a>
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
            user ? <Welcome 
                    rooms={this.state.rooms}/> : <Redirect to="/login" />  
          }
        />
        <Route
          exact
          path="/room"
          render={() =>
            user ? <Room 
                    user={this.state.user}
                    rooms={this.state.rooms}

            /> : <Redirect to="/login" />
          }
        />
        <Route exact path='/createRoom' render={() =>
          authService.getUser()?
            <CreateRoom 
              user={this.state.user}
              handleAddRoom={this.handleAddRoom}
            />
              :
            <Redirect to='/login' />
          } />
        <Route exact path='/createspotifypost' render={() =>
          authService.getUser()?
            <CreateSpotifyPost 
              user={this.state.user}
              handleAddRoom={this.handleAddRoom}
            />
              :
            <Redirect to='/login' />
          } />
        <Route exact path='/createpicpost' render={() =>
          authService.getUser()?
            <CreatePicPost 
              user={this.state.user}
              handleAddRoom={this.handleAddRoom}
            />
              :
            <Redirect to='/login' />
          } />
        <Route exact path='http://localhost:3001/loginSpotify'/>
      </>
    );
  }
}

export default App;