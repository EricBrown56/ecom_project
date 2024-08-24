import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ViewProducts = ({onProductSelect}) => {
    const [products, setProducts] = useState([]);


const deleteProduct = (productId) => {
        axios.delete(`http://127.0.0.1:5000/products/${productId}`)
            .then(() => {
                location.reload();
            })
            .catch(error => {
                console.error('Server Error', error);
            });
        }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/products')
                console.log(response.data)
                setProducts(response.data)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();



    }, []);

    

    return (
        <>
            <h3 className='text-center'>Products</h3>

            <div className='container'>
                {products.map(product => (
                    
                    <div key={product.id}>
                        <b>{ product.product_name }</b><br/>
                           { product.price }<br/>
                           <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    </div>
                ))}

                
            </div>
        
        </>
    );
}


export default ViewProducts;