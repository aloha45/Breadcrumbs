import React, { Component } from "react";
import { getAllUsers } from "../../services/userService";
import { Button, Container } from 'semantic-ui-react';
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/NavBar/NavBar'
import "./Welcome.css";

class Welcome extends Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    const users = await getAllUsers();
    this.setState({ users });
  }

  render() {
    return (
      <>
      <NavBar />
      <Container>
      <div id='main-wrapper'>
        <main>
            <h1>Logged in user landing page</h1>
            <Button>Room 1</Button>
        </main>
      </div>
      </Container>
        <Footer />
      </>
    );
  }
}

export default Welcome;