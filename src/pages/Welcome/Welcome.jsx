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
            <h1>Logged in user landing page</h1>
            {this.props.rooms.map(room =>
            <Button>Room 1</Button>
              )}
            <Button>Test</Button>
            <Button href='/createRoom'>(+)</Button>
        </main>
      </div>
      </Container>
      <Footer/>
      </>
    );
  }
}

export default Welcome;