import React from 'react'
import './Paymentok.css'
import { Link } from 'react-router-dom'
import CheckIcon from '@material-ui/icons/Check';

function Paymentok() {
    return (
        <div className='command__validation__container' style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh'}}>
            <div className='command__validation'>
                <CheckIcon/>
                <p>Your command is now behing proceed</p>
            </div>
            <Link to='/' className='btn__addToCart'>
                Back to Home page
            </Link>
        </div>
    )
}

export default Paymentok
