/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'


const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  
  const navigate = useNavigate();
   
    
    const url = 'http://localhost:4000'; // Define your API URL here

    const verifyPayment = async () => {
        const response = await axios.post(url + '/api/order/verify', {success, orderId});  
        if(response.data.success) {
           navigate("/myorders");
    }
    else {
        navigate("/");
    }
}
    useEffect(() => {
        verifyPayment();
    }, [])

  return(
    <div className='verify'>
    <div className='spinner'>

    </div>
        </div>
  )
}


export default Verify