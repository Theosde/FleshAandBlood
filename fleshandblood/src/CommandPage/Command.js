import React from 'react'
import './Command.css'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import CheckIcon from '@material-ui/icons/Check';

function Command() {

//========================================================================================================================================================
/* 
REDUX STATE
*/
//========================================================================================================================================================
const isLogged = useSelector(state => state.isLogged)
const userData = useSelector(state => state.user)

console.log(userData.arr)


var history = useHistory()

var commandHistory = [
    {
        article:[
            {url:'https://res.cloudinary.com/dzqfghzga/image/upload/v1610630071/FleshAndBlood/wtr/wtr014_l3g6q8.png', name:'GLINT OF QUICKSLIVER', quantity:2, price:19},
            {url:'https://res.cloudinary.com/dzqfghzga/image/upload/v1610630070/FleshAndBlood/wtr/wtr007_ohsxwm.png', name:'TOME OF FYENDAL', quantity:2, price:35}
        ], 
        date:'2021-01-15T14:47:35.511+00:00',
        total:108,
        status:'Finished'
    },
    {
        article:[
            {url:'https://res.cloudinary.com/dzqfghzga/image/upload/v1610630070/FleshAndBlood/wtr/wtr011_wdfqox.png', name:'CRIPPLING CRUSH', quantity:2, price:22},
            {url:'https://res.cloudinary.com/dzqfghzga/image/upload/v1610630071/FleshAndBlood/wtr/wtr015_k2iarp.png', name:'SPINAL CRUSH', quantity:1, price:15}
        ], 
        date:'2021-02-15T14:47:35.511+00:00',
        total:59,
        status:'Order in progress'
    }
]

//========================================================================================================================================================
/* 
FUNCTION TO TRANSLATE DATE TO READABLE FORMAT
*/
//========================================================================================================================================================
function translateDate (datePassed){
    var dateObj = new Date(datePassed);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    
    var newdate = year + "/" + month + "/" + day;
    return newdate
}

//========================================================================================================================================================
/* 
DOUBLE LOOP TO GET COMMAND HISTORY OF USER AND HIS COMMAND DETAIL
*/
//========================================================================================================================================================
var commandeHistoryList = commandHistory.map(function(item,i){

    var commandToShow =  item.article.map(function(element, i){
        return <div  className='historic__product__card' key={i}>
                    {/* <img className='historic__product__img' src={element.url} alt=''></img> */}
                    <div className='historic__product__info'>
                        <div className='historic__product__name'>{element.name}</div>
                        <div className='historic__product__price'>Price : {element.price} € / unit</div>
                        <div className='historic__product__quantity'>Quantity : {element.quantity}</div>
                    </div>
                </div>
    })
    return<div className='command__array'>

            <div className='command__array__header'>
                <div className='command__array__header_ligne1'>
                    <div>DATE</div>
                    <div>TOTAL</div>
                    <div>DELIVERED TO</div>
                    <div>STATUS</div>
                </div>
                <div className='command__array__header_ligne2'>
                    <div>{translateDate(item.date)}</div>
                    <div>{item.total} €</div>
                    <div>2 Rue de la fraternité 69100 villeurbanne</div>
                    <div >{item.status==="Order in progress"?<div>{item.status}</div>
                    :item.status}</div>
                </div>
            </div>
            <div className='command__array__list'>
            {commandToShow}
            </div>
        </div>
        })

//========================================================================================================================================================
/* 
RETURN
*/
//========================================================================================================================================================
    if(isLogged && userData.arr.email !== 'arnaud.rey.job@gmail.com'){return (
        <div className='command__page'>
            {commandeHistoryList}
        </div>
    )
} else if(isLogged && userData.arr.email === 'arnaud.rey.job@gmail.com'){
    return(
        <div className='command__page'>

            <div className='command__array'>
                <div className='command__array__header'>
                    <div className='command__array__header_ligne1'>
                        <div>Date de commande</div>
                        <div>Total de la commande</div>
                        <div>Adresse client</div>
                        <div>Acheteur</div>
                        <div>Frais de port</div>
                        <div>Status de la commande</div>
                    </div>
                    <div className='command__array__header_ligne2'>
                        <div>2021-10-10</div>
                        <div>350 €</div>
                        <div>2 Rue de la fraternité 69100 villeurbanne FRANCE</div>
                        <div>Ting Ting</div>
                        <div>7.60€</div>
                        <div style={{display:'flex',alignItems:'center'}}>Doit etre posté <CheckIcon style={{color:'#0BD187',fontWeight:1800,marginLeft:10,cursor:'pointer',fontSize:30}}/></div>
                        
                    </div>
                </div>
                <div className='command__array__list'>
                    <div className='admin__detail'>
                        <div> Name</div>
                        <div> Price : 15€ /unit</div>
                        <div> Quantity : 1</div>
                    </div>
                    <div className='admin__detail'>
                        <div> Name</div>
                        <div> Price :  8€ /unit</div>
                        <div> Quantity : 2</div>
                    </div>
                    <div className='admin__detail'>
                        <div> Name</div>
                        <div> Price : 35€ /unit</div>
                        <div> Quantity : 1</div>
                    </div>
                </div>
            </div>

        </div>
    )
}
else{return(
    <div className='command__page'>
        {history.push("/sign-in")}
    </div>
    )
}
}

export default Command
