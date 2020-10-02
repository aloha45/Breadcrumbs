import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

class CreateRoom extends Component {
    state = { 
        formData: {
            invalidForm: false,
            name: '',
        }
     }
    
    formRef = React.createRef()

    handleSubmit = e =>{
        e.preventDefault();
        this.props.handleAddRoom(this.state.formData)
    }

    handleChange = e => {
        const formData = {...this.state.formData, [e.target.name]: e.target.value};
        this.setState({
        formData,
        // invalidForm: !this.formRef.current.checkValidity()
        });
     }

    render() { 
        return ( 
            <>
                <Form ref={this.formRef} onSubmit={this.handleSubmit}>
                    <Form.Field>
                    <label>Room Name</label>
                    <input required value={this.state.formData.name} onChange={this.handleChange} id='name' name='name' type='text' placeholder='My Room' />
                    </Form.Field>
                    <Button 
                        type='submit'
                        disable={this.state.invalidForm}>Submit</Button>
                </Form>
            </>
         );
    }
}
 
export default CreateRoom;