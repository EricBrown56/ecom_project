import { Component } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Alert, Container } from 'react-bootstrap';

class CustomerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            user_name: '',
            password: '',
            errors: {},
            isLoading: false,
            error: null,
            showSuccessModal: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {
    
            this.setState({ isLoading: true, errors: null });
    
            const customerData = {
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                phone: this.state.phone.trim(),
                user_name: this.state.user_name.trim(),
                password: this.state.password.trim()
            };
    
            axios.post('http://127.0.0.1:5000/customers', customerData)
                .then(() => {
                    this.setState({
                        showSuccessModal: true,
                        isLoading: false,
                    })
    
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    this.setState({ error: error.toString(), isLoading: false });
                });
        } else {
            this.setState({ errors });
        }
    };

    validateForm = () => {
        const { name, email, phone, user_name, password } = this.state;
        const errors = {};
        if (!name) errors.name = 'Name is required';
        if (!email) errors.email = 'Email is required';
        if (!phone) errors.phone = 'Phone is required';
        if (!user_name) errors.user_name = 'User Name is required';
        if (!password) errors.password = 'Password is required';
        return errors;
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    closeModal = () => {
        this.setState({
            showSuccessModal: false,
            name: '',
            email: '',
            phone: '',
            user_name: '',
            password: '',
            errors: {},
            selectedCustomerId: null
        });
    };


    render() {

        const { name, email, phone, user_name, password, isLoading, showSuccessModal, error, errors } = this.state;

        return (
            <Container>
                {isLoading && <Alert variant='info'>Submitting Customer...</Alert>}
                {error && <Alert variant='danger'>Error Submitting Customer: {error}</Alert>}

                <Form onSubmit={this.handleSubmit}>
                    {/* controlId setups the for and id attributes all in one */}
                    <Form.Group controlId='formGroupName'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='name'
                            value={name}
                            onChange={this.handleChange}
                            placeholder='Enter name'
                            isInvalid={errors.name} />
                            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                    </Form.Group>

                    <Form.Group controlId='formGroupName'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            value={email}
                            onChange={this.handleChange}
                            placeholder='Enter email'
                            isInvalid={errors.email} />
                            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                    </Form.Group>

                    <Form.Group controlId='formGroupName'>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type='tel'
                            name='phone'
                            value={phone}
                            onChange={this.handleChange}
                            placeholder='Enter phone number'
                            isInvalid={errors.phone} />
                            {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
                    </Form.Group>

                    <Form.Group controlId='formGroupName'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='user_name'
                            value={user_name}
                            onChange={this.handleChange}
                            placeholder='Enter user name'
                            isInvalid={errors.user_name} />
                            {errors.user_name && <div style={{ color: 'red' }}>{errors.user_name}</div>}
                    </Form.Group>

                    <Form.Group controlId='formGroupName'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            value={password}
                            onChange={this.handleChange}
                            placeholder='Enter password'
                            isInvalid={errors.password} />
                            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                    </Form.Group>

                    <Button variant='primary' type='submit' className='mt-3 mb-3' >Submit</Button>
                </Form>

                <Modal show={showSuccessModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Customer submitted successfully!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        );
    }
}

export default CustomerForm;