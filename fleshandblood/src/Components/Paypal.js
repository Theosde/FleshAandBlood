import React  from 'react'
import { PayPalButton } from "react-paypal-button-v2";

import { useSelector, useDispatch } from 'react-redux'
import { decrement,addUser,changeOrder,resetCounter,resetTotal } from '../actions/index'

import { useHistory } from "react-router-dom";


function Paypal(props) {
    const dispatch = useDispatch()
    var history = useHistory()


        return (
          <PayPalButton

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

                // Capture the funds from the transaction
                return actions.order.capture().then(function(details) {


                // Show a success message to your buyer
                alert("Transaction completed by " + details.payer.name.given_name);

                // ---------------- ROUTE verfi and decrement BDD ----------------- //

                fetch("http://localhost:3000/verifQuantityBDD",{
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
                    fetch("http://localhost:3000/users/saveCommand",{
                        method: "POST",
                        body: JSON.stringify({
                            idUser : props.userData._id,
                            total: props.total,
                            panier: props.panier,
                            ftp:props.ftp,
                            paid: true,
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

                        history.push("/")
            
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
          />
        );
    }

export default Paypal
