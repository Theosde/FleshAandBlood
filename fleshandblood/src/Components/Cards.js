

import React from "react";
import './ProductCard.css'
import './Cards.css'

import { useDispatch } from 'react-redux'
import { addToCart,addToTotal,increment } from '../actions/index'

function Cards(props){

//========================================================================================================================================================
/* 
FUNCTION CALLED ON CLICK
*/
//========================================================================================================================================================
function addProduct (){
 
  
  dispatch(increment(1))
  dispatch(addToTotal(props.price))
  dispatch(addToCart({
      src:props.url, 
      title:props.name, 
      desc:props.brand,
      price:props.price,
      quantity: 1
  }))

}
//========================================================================================================================================================
/* 
REDUX 
*/
//========================================================================================================================================================
const dispatch = useDispatch()
//========================================================================================================================================================
/* 
RETURN
*/
//========================================================================================================================================================
  return(

            <div className="vertical_card">
              <img
                src={props.url}
                alt=""
                className="vertical_card__picture"
                style={{opacity:props.quantity===0?0.5:1}}
              ></img>
              
              <div className="vertical_card_text">
                <div className='vertical_card_text_flex'>
                  <h2>{props.name}</h2>            
                </div>
                {props.quantity===0?<div className='out_of_stock'>OUT OF STOCK</div>:<span>{props.price}€</span>}
                {props.quantity>0?<div style={{color:'grey'}}>In stock : {props.quantity}</div>:<div></div>}
                {props.quantity>0?<div className='btn__addToCart' onClick={()=> addProduct()}>Add to Cart</div>:<div></div>}
              </div>
            </div>


        )
  }

  export default Cards
