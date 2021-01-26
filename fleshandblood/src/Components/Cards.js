

import React,{useState} from "react";
import './ProductCard.css'
import './Cards.css'

import { useDispatch } from 'react-redux'
import { addToCart,addToTotal,increment } from '../actions/index'

function Cards(props){

  const [newquantity,setNewquantity] = useState(0)

//========================================================================================================================================================
/* 
FUNCTION CALLED ON CLICK
*/
//========================================================================================================================================================
function addProduct (){
 
  setNewquantity(newquantity+1)
  dispatch(increment(1))
  dispatch(addToTotal(props.price))
  dispatch(addToCart({
    src:props.url, 
    title:props.name, 
    quantity: 1,
    price:props.price,
    category:props.category,
    brand:props.brand
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
                {props.quantity-newquantity>0?<span>{props.price}€</span>:<div className='out_of_stock'>OUT OF STOCK</div>}
                {props.quantity-newquantity>0?<div style={{color:'grey'}}>In stock : {props.quantity - newquantity}</div>:<div></div>}
                {props.quantity-newquantity>0?<div className='btn__addToCart' onClick={()=> addProduct()}>Add to Cart</div>:<div></div>}
              </div>
            </div>


        )
  }

  export default Cards
