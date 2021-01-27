import React  from 'react'
import { PayPalButton } from "react-paypal-button-v2";

function Paypal(props) {

        return (
          <PayPalButton
          
            createOrder={(data, actions) => {
                
                console.log('ORDER CREATED')
                console.log(data)
                
                
                return actions.order.create({
                    address_name:{
                        address_line_1:"2 Rue de la paix",
                        postal_code:"69100",
                    },
                    purchase_units: [{
                    amount: {
                    currency_code: "EUR",
                    value: props.total
                    },
                }],
            });
        }}
        
            
            onApprove={(data, actions) => {
                console.log('OK FOR PAYMENT')
                // Capture the funds from the transaction
                return actions.order.capture().then(function(details) {
                // Show a success message to your buyer
                alert("Transaction completed by " + details.payer.name.given_name);
                    console.log(actions)
                // OPTIONAL: Call your server to save the transaction
                //   return fetch("/paypal-transaction-complete", {
                //     method: "post",
                //     body: JSON.stringify({
                //       orderID: data.orderID
                //     })
                //   });
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
