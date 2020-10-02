import React, { Component } from 'react';
import './Footer.css'
import { Form, Button, Menu, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
state = {}
handleItemClick = (e, { name }) => this.setState({ activeItem: name })

render(){
  const { activeItem } = this.state

  return ( 
    <div id='fd'>
    <Menu size='massive'>
      <Menu.Item      
      name='star'
      active={activeItem === 'star'}
      onClick={this.handleItemClick}
      >
      <Icon name='star' /> 
        Starred
    </Menu.Item>
    
    <Menu.Item
      name='picture'
      active={activeItem === 'picture'}
      onClick={this.handleItemClick}
    >
    <Icon name='add' /> 
    <Link to='/createroom' >Add a Room</Link>

    </Menu.Item>
 </Menu>  
 </div>

   );
}
}