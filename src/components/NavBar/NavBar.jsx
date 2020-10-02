import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import './NavBar.css'


export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const {user, handleLogout } = this.props

    return (
        <Menu stackable id="nav">
        {/* These links are for visitors not logged in/signed up */}
          <Menu.Item>
          <img src='/logo.png' alt="logo"/>
        </Menu.Item>
 
        <Menu.Item
          position='right'
          name='sign-up'
          active={activeItem === 'testimonials'}
          onClick={this.handleItemClick}
        >
          <a href="/signup">Sign Up</a>
        </Menu.Item>

        <Menu.Item
          name='log-in'
          active={activeItem === 'sign-in'}
          onClick={this.handleItemClick}
        >
          <a href="/login">Log-in</a>
        </Menu.Item>
     </Menu>  
     )
    }
}