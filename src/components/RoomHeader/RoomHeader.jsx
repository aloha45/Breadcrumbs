import React, { Component } from 'react'
import { Menu, Icon, Input } from 'semantic-ui-react'


export default class RoomHeader extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu borderless size='massive'>
        <a href='/room'>
        <Menu.Item
          position= 'left'
          name='editorials'
          active={activeItem === 'editorials'}
          onClick={this.handleItemClick}
        ><Icon name='left arrow'/>
        
        </Menu.Item>
        </a>

        <Menu.Item >
        <h1>THE LOVE SHACK</h1>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}