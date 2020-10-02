import React, { Component } from "react";
import { getAllUsers } from "../../services/userService";
import { getAll } from '../../services/posts-api'
import { Feed, Container, Icon, Embed } from 'semantic-ui-react';
import PostFooter from '../../components/PostFooter/PostFooter'
import RoomHeader from '../../components/RoomHeader/RoomHeader'
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
        <RoomHeader />
        <Container>
        <div id='main-wrapper'>
            <main>
                <h1>Room landing page</h1>
                <Feed>
                    <Feed.Event>
                     <Feed.Label>
                       <img alt='user avatar' src='https://randomuser.me/api/portraits/women/8.jpg' />
                     </Feed.Label>
                     <Feed.Content>
                       <Feed.Summary>
                         <Feed.User>Elaina</Feed.User> added a photo
                         <Feed.Date>1 Hour Ago</Feed.Date>
                       </Feed.Summary>
                       <Feed.Meta>
                         <Feed.Like>
                           <Icon name='star' />4 stars
                         </Feed.Like>
                         <Feed.Extra>
                             <img src='https://picsum.photos/200/300'></img>
                             <img src='https://picsum.photos/200'></img>
                         </Feed.Extra>
                       </Feed.Meta>
                     </Feed.Content>
                    </Feed.Event>
                    <Feed.Event>
                     <Feed.Label>
                       <img alt='user avatar' src='https://randomuser.me/api/portraits/men/60.jpg' />
                     </Feed.Label>
                     <Feed.Content>
                       <Feed.Summary>
                         <Feed.User>Todd</Feed.User> added a song
                         <Feed.Date>3 Hours Ago</Feed.Date>
                       </Feed.Summary>
                       <Feed.Meta>
                         <Feed.Like>
                           <Icon name='star' />8 stars
                         </Feed.Like>
                       </Feed.Meta>
                       <Embed
                          id='UfQHEpf2q8k'
                          placeholder='https://img.youtube.com/vi/UfQHEpf2q8k/default.jpg'
                          source='youtube'
                        />
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