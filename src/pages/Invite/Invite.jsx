import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'
import RoomHeader from '../../components/RoomHeader/RoomHeader'

class Invite extends Component {
    state = {  }

    description = [
        'Send a key to your friends can join the discussion!',
        '5f76b29ae0a020379bcfebf4'
      ]

    render() { 
        return ( 
            <>
            <RoomHeader />
            <Card>
            <Card.Content header='Join the discussion' />
            <Card.Content description={this.description} />
            <Card.Content extra>
              <Icon name='user' />2 Members
            </Card.Content>
          </Card>
          </>
         );
    }
}
 
export default Invite;