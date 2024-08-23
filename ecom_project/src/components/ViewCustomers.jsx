import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ViewCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        };
    }

    componentDidMount() {
        this.fetchCustomers();
    }

    fetchCustomers = () => {
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => {
                console.log(response);
                this.setState({ customers: response.data });
            })
            .catch(error => {
                console.error('Server Error', error);
            });
    }

    selectCustomer = (customerId, event) => {
        event.preventDefault(); 
        console.log(`Selected customer ID: ${customerId}`);
        
    }

    deleteCustomer = (customerId, event) => {
        event.stopPropagation(); 
        axios.delete(`http://127.0.0.1:5000/customers/${customerId}`)
            .then(() => {
                this.fetchCustomers();
            })
            .catch(error => {
                console.error('Server Error', error);
            });
    }

    render() {
        const { customers } = this.state;
        console.log(customers);
        return (
            <div className='customer-list'>
                <h3>Customers</h3>
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id} onClick={(e) => this.selectCustomer(customer.id, e)}>
                            <b>{customer.name}</b><br/>
                            {customer.email}<br/>
                            {customer.phone}<br/>
                            <button onClick={(e) => this.deleteCustomer(customer.id, e)}>Delete</button>
                            <button>
                                <Link to={`/customers/${customer.id}`}>View</Link>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ViewCustomers;