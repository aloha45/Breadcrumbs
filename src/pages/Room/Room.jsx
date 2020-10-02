import React, { Component } from "react";
import { getAllUsers } from "../../services/userService";
import { getAll } from '../../services/posts-api'
import { Feed, Container, Icon } from 'semantic-ui-react';
import PostFooter from '../../components/PostFooter/PostFooter'
import NavBar from '../../components/NavBar/NavBar'
// import { getAll } from "../../services/rooms-api";


class Room extends Component {
  state = {
    users: [],
    posts: []
  };

  async componentDidMount() {
    const users = await getAllUsers();
    const posts = await getAll()
    this.setState({ users, posts });
  }

  render() {
    return (
        <>
        <Container>
        <div id='main-wrapper'>
            <main>
                <h1>Room landing page</h1>
                <Feed>
                    <Feed.Event>
                     <Feed.Label>
                       <img alt='user avatar' src='/images/avatar/small/elliot.jpg' />
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
        <PostFooter />
      </>
    );
  }
}

export default Room;