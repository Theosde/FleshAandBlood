import React,{ useState, useEffect } from 'react'

import ClearIcon from '@material-ui/icons/Clear';

import { useSelector, useDispatch } from 'react-redux'
import { removeFromTotal,decrement,removeFromCart,addUser,changeOrder } from '../actions/index'

import './CartList.css'
import { Link } from 'react-router-dom';

import { useHistory } from "react-router-dom";



function CartList() {


//========================================================================================================================================================
/* 
STATE, SELECTOR FOR REDUX AND USE EFFECT
*/
//========================================================================================================================================================
    const  [cart,setCart] = useState([])
    const  [elementToDisplay,setElementToDisplay] = useState(0)
    const  [totalOrder,setTotalOrder] = useState(0)
    const  [deliveryFees,setDeliveryFees] = useState(4)
    const  [formLivraison,setFormLivraison] = useState({firstname:"",lastname:"",adress:"",zip:"",city:"",country:""})

    const CartList = useSelector(state => state.cart)
    const userData = useSelector(state => state.user)
    const isLogged = useSelector(state => state.isLogged)

    const dispatch = useDispatch()

    var history = useHistory()

    useEffect(() => {
        var cardListOrder = []

        // Suppr des doubles des cartes / Add quantity
            CartList.arr.forEach(cards => {
            if(cardListOrder.find(e=> e.title === cards.title) === undefined){
                cards.quantity = CartList.arr.filter(e => e.title.includes(cards.title)).length
                cardListOrder.push(cards)
            }
        });

        // init new list card
        setCart(cardListOrder)

        // init calcul total
        var totalcopy = 0
        CartList.arr.forEach(cards => {
            totalcopy = totalcopy + parseFloat(cards.price)
        });
        setTotalOrder(totalcopy)

        if(isLogged){
            setFormLivraison({
                firstname:"",
                lastname:"",
                adress:userData.arr.adress.street,
                zip:userData.arr.adress.zip,
                city:userData.arr.adress.city,
                country:userData.arr.adress.country
            })
        }
    }, [])


    useEffect(() => {
        console.log("modifer card");

    }, [cart,totalOrder])




//========================================================================================================================================================
/*
REMOVE ITEM FROM FRONT END AND FROM REDUX ARRAY AT SAME TIME
*/
//========================================================================================================================================================
    function removeFromList (i){
        for (let k = 0; k < i.quantity; k++) {
            dispatch(removeFromCart(i.index))
            dispatch(decrement())
        }
        cart.splice(i.index, 1)
    }

    function roundDecimal(nombre, precision){
        var precision = precision || 2;
        var tmp = Math.pow(10, precision);
        return Math.round( nombre*tmp )/tmp;
    }

    var confFormulaire = ()=>{
        console.log(userData.arr);
        console.log(formLivraison);

       
        fetch("http://localhost:3000/users/updateAdresseLivraison",{
            method: "POST",
            body: JSON.stringify({
                idUser:userData.arr._id,
                street:formLivraison.adress,
                zip:formLivraison.zip,
                city:formLivraison.city,
                country:formLivraison.country}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(response=> {
            return response.json()
        })
        .then(data=>{
            dispatch(addUser(data.user))

            // ---------------------------------------------- function paypal ----------------------------------------------
            console.log("retour fetch maj adresse livraison",data);
            console.log("INFO FORMULAIRE",formLivraison);
            console.log("INFO PANIER",cart);
            console.log("TOTAL PANIER",roundDecimal(totalOrder,2));

        })
        .catch((error)=>{
            console.log("Request failed recup user", error );
        })
        
    }

    var verifBDD = ()=>{
        fetch("http://localhost:3000/verifQuantityBDD",{
            method: "POST",
            body: JSON.stringify({
                panier:cart,
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

            //retour fetch verif bdd
            if (data.errorStock.length === 0) {
                goBackAndComeBackBugFix()
            }else{
                // redirect panier + modif order
                console.log("errorStock",data.errorStock);

                var newOrder = CartList.arr.filter((item) => {
                    if (data.errorStock.includes(item.title)) {
                        dispatch(decrement())
                    }
                    var copyTotal = totalOrder 
                    copyTotal = copyTotal - item.price*item.quantity
                    setTotalOrder(copyTotal)

                    return !data.errorStock.includes(item.title)
                })
                dispatch(changeOrder(newOrder))

                history.push("/")
                history.push("/cart")


            }

        })
        .catch((error)=>{
            console.log("Request failed recup user", error );
        })
    }

//========================================================================================================================================================
/*
    SET DELIVERY FEES DEPENDING ON COUNTRY
*/
//========================================================================================================================================================
    function selectCountry (e){
        if(e.target.value === ''){
            setDeliveryFees(4)
            console.log(deliveryFees)
        }
        else if((e.target.value === 'France' && totalOrder < 30) || (e.target.value === 'Europe' && totalOrder < 30)){
            setDeliveryFees(4)
            var copyAdress =  {...formLivraison}
            copyAdress.country = e.target.value
            setFormLivraison(copyAdress)
        }
        else if((e.target.value === 'France' && totalOrder >= 30) || (e.target.value === 'Europe' && totalOrder >= 30)){
            setDeliveryFees(8)
            var copyAdress =  {...formLivraison}
            copyAdress.country = e.target.value
            setFormLivraison(copyAdress)
        }
        else if(e.target.value === 'Other Country' && totalOrder < 30){
            setDeliveryFees(15)
            var copyAdress =  {...formLivraison}
            copyAdress.country = e.target.value
            setFormLivraison(copyAdress)
        }
        else if(e.target.value === 'Other Country' && totalOrder >= 30){
            setDeliveryFees(21)
            var copyAdress =  {...formLivraison}
            copyAdress.country = e.target.value
            setFormLivraison(copyAdress)
        }
        else{
            setDeliveryFees(25)
            var copyAdress =  {...formLivraison}
            copyAdress.country = e.target.value
            setFormLivraison(copyAdress)
        }
    }

    function resetSelectedCountry(){
        setElementToDisplay(0)
        setDeliveryFees(totalOrder >= 30? 8:4)
    }

    function goBackAndComeBackBugFix(){
        if(totalOrder >= 30){
            setDeliveryFees(8)
        }else{
            setDeliveryFees(4)
        }
        setElementToDisplay(1)

    }

//========================================================================================================================================================
/* 
RETURN
*/
//========================================================================================================================================================
   if(cart.length > 0 && elementToDisplay === 0){
    return (
            <div className='cart__cartList'>
                {
                cart.map(function(item, i){
                    return<div key={i} className='cart__product'>
                        <img src={item.src} alt='' width='100' height='100'/>
                        <p>{item.title}</p>
                        <p>Quantity : {item.quantity}</p>
                        <p> {item.price} €</p>
                        <ClearIcon
                            onClick={()=>{
                                var copyTotal = totalOrder
                                copyTotal = copyTotal - item.price*item.quantity
                                setTotalOrder(copyTotal)
                                removeFromList({index:i,quantity:item.quantity})
                            }} 
                            style={{color:'red', cursor:'pointer',fontSize:'25'}}/>
                    </div>
                  })
                }
                <div className='Total__cart_container'>
                            Total : {roundDecimal(totalOrder,2)+"€"}
                </div>
                <Link to='/wtr' style={{textDecoration:'none'}}>
                    <div 
                        className='buttons__return__cart'>
                            Back to Shopping
                    </div>
                </Link>

                    <div 
                        className='buttons__return__cart2'
                        onClick={()=>{
                            if(isLogged){
                                // if connection verif stock bdd
                                verifBDD()
                            }else{
                                history.push("sign-in")
                            }
                        }}>
                            Order
                    </div>
                
            </div>
        
        )}
//========================================================================================================================================================
/* 
IF EMPTY CART RETURN
*/
//========================================================================================================================================================
    else if(cart.length === 0 && elementToDisplay === 0){
        return(
            <p style={{minHeight:'90vh',display:'flex',justifyContent:'center',alignItems:'center',width:'100%',marginTop:0}}>No Product in Cart</p>
        )
    }
//========================================================================================================================================================
/* 
IF clicked on order and cart not empty
*/
//========================================================================================================================================================
    else if(elementToDisplay === 1 && cart.length > 0){
        return(
            <div className='cart__cartList' style={{paddingTop:0}}>
                <div style={{minHeight:'85vh',maxHeight:'90vh',display:'flex',justifyContent:'center',alignItems:'center',width:'100%',marginTop:0}}>
                    <div className='form__container__payment'>
                        <input type='text' placeholder='LastName' value={formLivraison.lastname} onChange={(e)=>{
                            var copyFormLivraison = {...formLivraison}
                            copyFormLivraison.lastname = e.target.value
                            setFormLivraison(copyFormLivraison)
                        }} ></input>
                        <input type='text' placeholder='FirstName' value={formLivraison.firstname} onChange={(e)=>{
                            var copyFormLivraison = {...formLivraison}
                            copyFormLivraison.firstname = e.target.value
                            setFormLivraison(copyFormLivraison)
                        }} ></input>
                        <input type='text' placeholder='Delivery Adress' value={formLivraison.adress} onChange={(e)=>{
                            var copyFormLivraison = {...formLivraison}
                            copyFormLivraison.adress = e.target.value
                            setFormLivraison(copyFormLivraison)
                        }} ></input>
                        <input type='text' placeholder='City' value={formLivraison.city} onChange={(e)=>{
                            var copyFormLivraison = {...formLivraison}
                            copyFormLivraison.city = e.target.value
                            setFormLivraison(copyFormLivraison)
                        }} ></input>
                        <input type='text' placeholder='Zip' value={formLivraison.zip} onChange={(e)=>{
                            var copyFormLivraison = {...formLivraison}
                            copyFormLivraison.zip = e.target.value
                            setFormLivraison(copyFormLivraison)
                        }} ></input>

{/* //========================================================================================================================================================

For select menu and calculate delivery fees

//======================================================================================================================================================== */}
                        <select defaultValue='France' onChange={(e)=>selectCountry(e)}>
                            <option value='France'>France</option>
                            <option value='Europe'>Europe</option>
                            <option value='Other Country'>Other country</option>
                        </select>
{/*======================================================================================================================================================== */}

                        <div className='buttons__validate__cart' onClick={confFormulaire}> Continue to payment</div>
                    </div>
                </div>
                <div className='Total__cart_container'>
                    <div>Cart : {roundDecimal(totalOrder)} €</div>
                    <div>Delivery Fees : {deliveryFees} €</div>
                    <div>Total : {roundDecimal(totalOrder + deliveryFees)} €</div>
                </div>
                
                <div onClick={()=>resetSelectedCountry()}
                    className='buttons__return__cart' style={{marginTop:80}}>
                            Back to Cart
                </div>
                
            </div>
        )
    }
}

export default CartList