import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom"
import { getAllUsers } from "../../services/userService";
import { Button, Container } from 'semantic-ui-react';
import Footer from '../../components/Footer/Footer';
import WelcomeNav from '../../components/WelcomeNav/WelcomeNav';
import authService from '../../services/authService'
import "./Welcome.css";

class Welcome extends Component {
  state = {
    user: authService.getUser()
  };

  async componentDidMount() {
    const users = await getAllUsers();
    this.setState({ users });
  }

  render() {
    return (
      <>
      <WelcomeNav />
      <Container>
      <div id='main-wrapper'>
        <main>
            <h1>Enter a room or add one below</h1>
            <br/><br/><br/>
            {this.props.rooms.map(room =>
            <a href='/room'>
              <Button>{room.name}</Button>
            </a>
              )}
      <a href='/userprofile'>
      <Button>See Your Profile</Button>
      </a>
        </main>
      </div>
      </Container>
      <Footer/>
      </>
    );
  }
}

export default Welcome;