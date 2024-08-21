import { useState, useEffect } from 'react';
import axios from 'axios';

const ViewProducts = ({onProductSelect}) => {
    const [products, setProducts] = useState([]);

const selectProduct = (productId) => {
    useState({selectedProductId: productId});
    //go to the product details page
    
}

const deleteProduct = (productId) => {
        axios.delete(`http://127.0.0.1:5000/products/${productId}`)
            .then(() => {
                this.fetchProducts();
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
                    
                    <div key={product.id} onClick={() => selectProduct(product.id)}>
                        <b>{ product.product_name }</b><br/>
                           { product.price }<br/>
                           <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    </div>
                ))}

                <a className='btn btn-primary' href='http://localhost:5173/Add_Product' type='button'>Add</a>
            </div>
        
        </>
    );
}


export default ViewProducts;