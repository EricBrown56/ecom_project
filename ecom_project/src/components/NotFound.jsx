import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function NotFound() {

    const navigate = useNavigate();
    const [countDown, setCountDown] = useState(5);

    const count = setInterval(()=>{
        setCountDown(countDown - 1)
        if(countDown <= 1){
            clearInterval(count);
            navigate('/');
        }
    }, 1000);

    
        return (
        <div>
            <h2>404 - Not Found</h2>
            <p>Sorry, the world cannot be saved today ):</p>
            <p>You will be redirected in {countDown} seconds or you can.....</p>
            <p><Link to="/">Go Home!</Link></p>
        </div>
    );
}
    
export default NotFound;