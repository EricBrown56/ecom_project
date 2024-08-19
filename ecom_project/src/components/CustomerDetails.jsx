import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Component } from 'react';
import axios from 'axios';

function CustomerDetails() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
                console.log(response.data[0]);
                setCustomer(response.data[0]);
                setLoading(false);
            } catch(error){
                console.error('Error fetching customer: ', error);
            }
        }
        fetchCustomer();

    }, [id])

    if(loading){
        return <h3>Loading customer...</h3>
    }

    return (
        <div>
            <Link to="/customers">Back to all customers</Link>
            <h3>{customer.name}</h3>
            <form onSubmit={this.handleSubmit}>
                <h3>Add/Edit Customer</h3>
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
                <button type="submit">Submit</button>
            </form>
            

           
        </div>
    )
}



export default CustomerDetails;