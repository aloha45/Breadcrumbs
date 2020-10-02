import React, { Component } from "react";
import { getAllUsers } from "../../services/userService";
import { Feed, Container, Icon } from 'semantic-ui-react';
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/NavBar/NavBar'

class Room extends Component {
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
                <h1>Room landing page</h1>
                <Feed>
                    <Feed.Event>
                     <Feed.Label>
                       <img src='/images/avatar/small/elliot.jpg' />
                     </Feed.Label>
                     <Feed.Content>
                       <Feed.Summary>
                         <Feed.User>Elliot Fu</Feed.User> added you as a friend
                         <Feed.Date>1 Hour Ago</Feed.Date>
                       </Feed.Summary>
                       <Feed.Meta>
                         <Feed.Like>
                           <Icon name='like' />4 Likes
                         </Feed.Like>
                       </Feed.Meta>
                     </Feed.Content>
                    </Feed.Event>
                </Feed>   
            </main>
        </div>
        </Container>
        <Footer />
      </>
    );
  }
}

export default Room;