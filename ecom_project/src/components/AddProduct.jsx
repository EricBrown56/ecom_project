import { Component } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Alert, Container} from 'react-bootstrap';

class Products extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            product_name: '',
            price: '',
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

            const productData = {
                product_name: this.state.product_name.trim(),
                price: this.state.price.trim()
            };

            axios.post('http://127.0.0.1:5000/products', productData)
                .then(() => {
                    this.setState({
                        showSuccessModal: true,
                        isLoading: false,
                    })
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    this.setState({ error: error.toString(), isLoading: false});
                })
        } else {
            this.setState({ errors });
        }
    };

    validateForm = () => {
        const { product_name, price } = this.state;
        const errors = {};
        if (!product_name) {errors.product_name = 'Product name is required'}
        else {errors.product_name = ''}
        if (!price) errors.price = 'Price information is required'
        else {errors.price = ''}
        return errors;
    };

   

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value});
    };

    closeModal = () => {
        this.setState({
            showSuccessModal: false,
            product_name: '',
            price: '',
            errors: {},
            selectedProductId: null
        });
    }

    render() {
        const { product_name, price, isLoading, showSuccessModal, error, errors } = this.state;

        return (
            <Container>
                {isLoading && <Alert variant='info'>Submitting product info...</Alert>}
                {error && <Alert variant='danger'>Error submitting product: {error}</Alert>}

                <h4 className='mb-5'>Add Product Information</h4>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId='formGroupProductName'>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='product_name'
                            value={product_name}
                            onChange={this.handleChange}
                            placeholder= 'Enter Product Name'
                            isInvalid={errors.product_name ? true : false} />
                            {errors.product_name && <div style={{ color: 'red' }}>{errors.product_name}</div>}
                    </Form.Group>

                    <Form.Group controlId='formGroupPrice' className='mt-3'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='text'
                            name='price'
                            value={price}
                            onChange={this.handleChange}
                            placeholder='Enter Price'
                            isInvalid={errors.price ? true : false} />
                            {errors.price && <div style={{ color: 'red' }}>{errors.price}</div>}
                    </Form.Group>

                    <Button variant='primary' type='submit' className='mt-3 mb-3'>Submit</Button>

                </Form>

                <Modal show={showSuccessModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Product submitted successfully!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        );
    }
}

export default Products;