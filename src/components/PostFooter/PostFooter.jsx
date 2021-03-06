import React, { Component } from 'react';
import './PostFooter.css'
import { Form, Button, Menu, Icon} from 'semantic-ui-react';

export default class PostFooter extends Component {
state = {}
handleItemClick = (e, { name }) => this.setState({ activeItem: name })

render(){
  const { activeItem } = this.state

  return ( 
    <div id='fd'>
    <Menu size='massive'>
    <a href='http://localhost:3001/loginSpotify'>
      <Menu.Item      
      name='music'
      active={activeItem === 'music'}
      onClick={this.handleItemClick}
      >
      <Icon name='music' /> 
        Music
    </Menu.Item>
    </a>
    <a href='/createpicpost'>
    <Menu.Item
      name='picture'
      active={activeItem === 'picture'}
      onClick={this.handleItemClick}
    >
    <Icon name='image' /> 
      Picture
    </Menu.Item>
    </a>
    <a href='/invite'>
    <Menu.Item
      position= 'right'
      name='log-in'
      onClick={this.handleItemClick}
    >
   <Icon name='share square' />
          Invite a Roommate
    </Menu.Item>
      </a>
 </Menu>  
 </div>

   );
}
}


