import React, { Component } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import { Form, Container, Button } from 'semantic-ui-react'
import './Login.css'

class Login extends Component {
  state = {
    email: "",
    pw: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    const { history, handleSignupOrLogin } = this.props;
    e.preventDefault();
    try {
      await authService.login(this.state);
      handleSignupOrLogin();
      history.push("/welcome");
    } catch (err) {
      alert('Invalid Credentials!');
    }
  };

  render() {
    const {email, pw} = this.state
    return (
      <Container id="mess">
        <br/><br/><br/><br/><br/>
          <Form autoComplete="off" onSubmit={this.handleSubmit}>
          <br/> 
            <Form.Field>
            <input
              type="text"
              autoComplete="off"
              id="email"
              value={email}
              name="email"
              onChange={this.handleChange}
            />
            <label htmlFor="email">Email</label>
            </Form.Field>
            <br/>
            <Form.Field>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={pw}
              name="pw"
              onChange={this.handleChange}
            />
            <label htmlFor="password">Password</label>
            </Form.Field> <br/> 
            <Button>Log In</Button><br/><br/><br/>
            <Link className="btn red" to="/signup">
              CREATE AN ACCOUNT
            </Link>
            <br/> <br/> <br/> <br/> 
          </Form>
      </Container>
    );
  }
}

export default Login;