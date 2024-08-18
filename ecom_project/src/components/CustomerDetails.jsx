import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function CustomerDetails() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/customers/${customer.id}`);
                console.log(response.data[0]);
                setHero(response.data[0]);
                setLoading(false);
            } catch(error){
                console.error('Error fetching hero: ', error);
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
            <h3>{customer.customer_name}</h3>
            
            

           
        </div>
    )
}



export default CustomerDetails;