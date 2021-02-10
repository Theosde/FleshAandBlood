import React,{useState}  from 'react'
import { PayPalButton } from "react-paypal-button-v2";

import { useDispatch } from 'react-redux'
import { addUser,changeOrder,resetCounter,resetTotal } from '../actions/index'

import { useHistory } from "react-router-dom";
import Loadingbar from './Loadingbar'
import './Paypal.css'



function Paypal(props) {
    const dispatch = useDispatch()
    var history = useHistory()

    const [isLoading , setIsLoading] = useState(false)
    

        return (
            <div>
          <PayPalButton style={{display:isLoading?'none':'block'}} 
        
            createOrder={(data, actions) => {
                
                console.log('ORDER CREATED')

                return actions.order.create({
                    
                    purchase_units: [{
                    amount: {
                    currency_code: "EUR",
                    value: props.totalFtp
                    },
                }],
                application_context: {
                    shipping_preference: "NO_SHIPPING"
                }
            });
        }}

            onApprove={(data, actions) => {
                console.log('OK FOR PAYMENT')
                setIsLoading(true)
                // Capture the funds from the transaction
                return actions.order.capture().then(function(details) {
                   

                // ---------------- ROUTE verfi and decrement BDD ----------------- //

                fetch("/verifQuantityBDD",{
                    method: "POST",
                    body: JSON.stringify({
                        panier: props.panier,
                        paid: true
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }
                }).then(response=> {
                    return response.json()
                })
                .then(data=>{
                    console.log(data);

                    console.log(props.userData);
                    console.log(props.panier);
                    console.log(props.total);
                    console.log(props.ftp);

                    // ---------------- ROUTE Save historic order ----------------- //
                    fetch("/users/saveCommand",{
                        method: "POST",
                        body: JSON.stringify({
                            idUser : props.userData._id,
                            total: props.total,
                            panier: props.panier,
                            ftp:props.ftp,
                            paid: true,
                            deliveryname: props.deliveryname,
                        }),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          }
                    }).then(response=> {
                        return response.json()
                    })
                    .then(data=>{
                        console.log(data);
                        // maj user and vider panier
                        dispatch(addUser(data.user))
                        dispatch(changeOrder([]))
                        dispatch(resetCounter())
                        dispatch(resetTotal())
                        setIsLoading(false)
                        history.push("/payment-success")
            
                    })
                    .catch((error)=>{
                        console.log("Request failed recup user", error );
                    })
                })
                .catch((error)=>{
                    console.log("Request failed recup user", error );
                })

                })

            }}

            onCancel={(data)=>{
                    //redirect to user cart component
                    console.log('CANCELED')
                }}
            onError={(err)=> {
                    console.log(err)
                    return<div>Something went wrong! please try again in a few min</div>
                }}
               
          /> <div className='overlay' style={{display:isLoading?"flex":"none"}}>
              <Loadingbar/>
          </div>
          </div>
        );
    }

export default Paypal
