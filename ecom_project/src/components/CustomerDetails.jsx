import { Link } from 'react-router-dom';
import { Component } from 'react';
import axios from 'axios';

class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            user_name: '',
            password: '',
            errors: {},
            selectedCustomerId: null
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.customerId !== this.props.customerId) {
            this.setState({ selectedCustomerId: this.props.customerId });
            if (this.props.customerId) {
                axios.get(`http://127.0.0.1:5000/customers/${this.props.customerId}`)
                    .then(response => {
                        const customerData = response.data[0];
                        this.setState({
                            name: customerData.name,
                            email: customerData.email,
                            phone: customerData.phone,
                            user_name: customerData.user_name,
                            password: customerData.password
                        });
                    })
                    .catch(error => {
                        console.error('Server Error', error);
                    })
            } else {
                this.setState({
                    name: '',
                    email: '',
                    phone: '',
                    user_name: '',
                    password: ''
                });
            }
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    validateForm = () => {
        const { name, email, phone } = this.state;
        const errors = {};
        if (!name) errors.name = 'Name cannot be blank';
        if (!email) errors.email = 'Email cannot be blank';
        if (!phone) errors.phone = 'Phone cannot be blank';
        return errors;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {
            const customerData = {
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                phone: this.state.phone.trim(),
                user_name: this.state.user_name.trim(),
                password: this.state.password.trim()
            }

            const apiUrl = this.state.selectedCustomerId ?
                `http://127.0.0.1:5000/customers/${this.state.selectedCustomerId}` :
                `http://127.0.0.1:5000/customers`;

            const httpMethod = this.state.selectedCustomerId ? axios.put : axios.post;

            httpMethod(apiUrl, customerData)
                .then(() => {
                    this.props.onUpdateCustomerList();
                    this.setState({
                        name: '',
                        email: '',
                        phone: '',
                        user_name: '',
                        password: '',
                        errors: {},
                        selectedCustomerId: null
                    })
                })
                .catch(error => {
                    console.error('Server Error', error);
                })
        } else {
            this.setState({ errors });
        }
    }

    render() {
        const { name, email, phone, user_name, password, errors } = this.state;

        return (
            <div>
                <Link to="/customers">Back to all customers</Link>
                <br />
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>User Name:</strong> {user_name}</p>
                <p><strong>Password:</strong>{password}</p>

                <hr />

                <form onSubmit={this.handleSubmit}>
                    <h3>Edit Customer</h3>
                    <label>
                        Name:<br/>
                        <input type="text" name="name" value={name} onChange={this.handleChange} />
                        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                    </label>
                    <br />
                    <label>
                        Email:<br/>
                        <input type="email" name="email" value={email} onChange={this.handleChange} />
                        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                    </label>
                    <br />
                    <label>
                        Phone:<br/>
                        <input type="tel" name="phone" value={phone} onChange={this.handleChange} />
                        {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
                    </label>
                    <br />
                    <label>
                        User Name:<br/>
                        <input type="text" name="user_name" value={user_name} onChange={this.handleChange} />
                        {errors.user_name && <div style={{ color: 'red' }}>{errors.user_name}</div>}
                    </label>
                    <br />
                    <label>
                        Password:<br/>
                        <input type="password" name="password" value={password} onChange={this.handleChange} />
                        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                    </label>
                    <br />
                    <button type="submit">Update</button>
                </form>
            </div>
        )
    }
}

export default CustomerDetails;