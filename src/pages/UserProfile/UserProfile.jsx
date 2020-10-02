import {React, Component} from 'react'
import { Form, Card, Button } from 'semantic-ui-react'

class UserProfile extends Component {
    state = { 
        toEdit: false,
        formData: this.props.user,
        name: "",
        email: "",
     }

    editProfile() {
        this.setState({
            toEdit: true
        })
    }

    viewProfile() {
        this.setState({
            toEdit: false
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleEditProfile(this.state.formData);
      };
    
      handleChange = e => {
        const formData = {...this.state.formData, [e.target.name]: e.target.value};
        this.setState({
        formData,
        invalidForm: !this.formRef.current.checkValidity()
        });
    };
    
    render() { 
        const toEdit = this.state.toEdit;
        const { name, email, password, passwordConf, avatar} = this.state;
        return ( 
            <>
            {toEdit ?
            <Button onClick={() => this.editProfile()}>Edit Profile</Button> :
            <Button onClick={() => this.viewProfile()}>View Profile</Button>
            }
            {toEdit ?
            <Card
                image='/images/avatar/large/elliot.jpg'
                header={this.props.user.name}
                meta='User'
                description='A Breadcrumbs user.'
            /> :
        <Form autoComplete="off" onSubmit={this.handleSubmit}>
        <br/><br/>
        <Form.Field>
        <label htmlFor="name">Name</label>
        <input
          placeholder={this.state.formData.name}
          type="text"
          autoComplete="off"
          id="name"
          value={name}
          name="name"
          onChange={this.handleChange}
        />  
        </Form.Field>
        <br/><br/>
        <Form.Field>
        <label htmlFor="email">Email</label>
        <input
          placeholder="email@domain.com"
          type="text"
          autoComplete="off"
          id="email"
          value={email}
          name="email"
          onChange={this.handleChange}
        />
        </Form.Field>

        <Button disabled={this.isFormInvalid()}>Sign Up</Button>
      </Form>
            }
            </>
         );
    }
}
 
export default UserProfile;