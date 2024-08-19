import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ViewCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/customers');
                console.log(response.data);
                setCustomers(response.data);
                setLoading(false);
            } catch(error){
                console.error('Error fetching heroes: ', error);
            }
        }
        fetchCustomers();

    }, [])

    if(loading){
        return <h3>Loading Customers...</h3>
    }

    return (
        <div>
            <h3>Customers</h3>
            {customers.map(customer => (
                <div key={customer.id} className="customer">
                    <br/>
                    <Link to={`/customers/${customer.id}`}>{customer.name}</Link>
                </div>
            ))}       
            
        </div>
    )
}

export default ViewCustomers;