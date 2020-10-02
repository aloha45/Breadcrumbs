import React from 'react'
import { Menu, Icon, Sticky } from 'semantic-ui-react'
import './Footer.css'

const Footer = () => {
    return ( 
        <Menu id="nav">
            <Menu.Item position='right'>
                <Icon name="copyright outline" id="copy" />
                <p id="foot">Serenity 2020</p>
            </Menu.Item>
        </Menu>
     );
}
 
export default Footer;