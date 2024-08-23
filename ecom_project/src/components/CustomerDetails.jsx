import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CustomerDetails() {
    const { id } = useParams(); 
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        user_name: '',
        password: ''
    }); 
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:5000/customers/${id}`)
                .then(response => {
                    
                    const customerData = Array.isArray(response.data) ? response.data[0] : response.data;
                    setCustomer(customerData);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Server Error', error);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomer(prevState => ({ ...prevState, [name]: value }));
    }

    const validateForm = () => {
        const { name, email, phone, user_name, password } = customer;
        const errors = {};
        if (!name) errors.name = 'Name cannot be blank';
        if (!email) errors.email = 'Email cannot be blank';
        if (!phone) errors.phone = 'Phone cannot be blank';
        if (!user_name) errors.user_name = 'User Name cannot be blank';
        if (!password) errors.password = 'Password cannot be blank';
        return errors;
    }

    const handleSubmit = (event) => {
        console.log(customer);
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const apiUrl =  `http://127.0.0.1:5000/customers/${id}`;
            const httpMethod = axios.put;

            httpMethod(apiUrl, customer)
                .then(() => {
                    setSuccessMessage('Customer updated successfully');
                    setErrors({});
                })
                .catch(error => {
                    console.error('Server Error', error);
                    setSuccessMessage('');
                });
        } else {
            setErrors(errors);
            setSuccessMessage('');
        }
    }

    // Extracted content based on conditions
    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (id) {
        content = (
            <div>
                <h4>Current Information</h4>
                <p><strong>Name:</strong> {customer.name || 'N/A'}</p>
                <p><strong>Email:</strong> {customer.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {customer.phone || 'N/A'}</p>
                <p><strong>User Name:</strong> {customer.user_name || 'N/A'}</p>
                <p><strong>Password:</strong> { customer.password || 'N/A'}</p>
                
            </div>
        );
    } else {
        content = <p>Select a customer to view details.</p>;
    }

    return (
        <div className='mt-5'>
            <Link to="/Customers">Back to all customers</Link>
            <br />
            <h3 className='mb-5'>Welcome {customer.name}</h3>

            {/* {content} */}

            <hr />

            <form onSubmit={handleSubmit}>
                <h3>Edit Customer</h3>
                <label>
                    Name:<br />
                    <input type="text" name="name" value={customer.name} onChange={handleChange} />
                    {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                </label>
                <br />
                <label>
                    Email:<br />
                    <input type="email" name="email" value={customer.email} onChange={handleChange} />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </label>
                <br />
                <label>
                    Phone:<br />
                    <input type="tel" name="phone" value={customer.phone} onChange={handleChange} />
                    {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
                </label>
                <br />
                <label>
                    User Name:<br />
                    <input type="text" name="user_name" value={customer.user_name} onChange={handleChange} />
                    {errors.user_name && <div style={{ color: 'red' }}>{errors.user_name}</div>}
                </label>
                <br />
                <label>
                    Password:<br />
                    <input type="password" name="password" value={customer.password} onChange={handleChange} />
                    {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                </label>
                <br />
                <button type="submit">Update</button>
                {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            </form>
        </div>
    );
}

export default CustomerDetails;