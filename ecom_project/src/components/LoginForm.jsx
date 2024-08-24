import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Component } from 'react';
import React, { useState } from "react";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            password: ''
           
        };
    }



    validateForm() {
        return email.length > 0 && password.length > 0;
    }



    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {

        const { user_name, password } = this.state;

        return (
            <div className='login'>
                <Form >

                    <Form.Group size='md-6' controlId='user_name'>

                        <Form.Label>User Name</Form.Label>

                        <Form.Control autoFocus 
                            type='text'
                            name='user_name'
                            value={user_name}
                            onChange={this.handleChange}
                            placeholder='Enter User Name' />

                    </Form.Group>

                    <Form.Group size='md' controlId='password'>

                        <Form.Label>Password</Form.Label>

                        <Form.Control  
                            type='password'
                            name='password'
                            value={password}
                            onChange={this.handleChange}
                            placeholder='Enter Password' />

                    </Form.Group>

                    <div className='mt-3'>
                        <Button href='http://localhost:5173/customers/1' variant="primary">Submit</Button>{' '}
                    </div>

                    

                </Form>
            </div>
        )



    }









};

export default LoginForm
