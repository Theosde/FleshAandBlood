import React,{useEffect, useState} from 'react'
import Cards from '../../Components/Cards'
import '../../Components/ProductCard.css'
import { Link } from 'react-router-dom'


function WtrSealed() {


    var displayList;
    const [listProduct,setlistProduct] = useState([])

    useEffect(() => {

        fetch("http://localhost:3000/productSealed",{
            method: "POST",
            body: JSON.stringify({edition:"wtr"}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(response=> {
            return response.json()
        })
        .then(data=>{
            console.log("retour fetch",data);
            setlistProduct(data.productSealed)
        })
        .catch((error)=>{
            console.log("Request failed recup product wtr", error );
        })

    }, [])

    useEffect(() => {
    }, [displayList])


    displayList = listProduct.map(e =>{
        return<Cards url={e.url} name={e.name} price={e.price} category={e.category} quantity={e.quantity}/>
    })

    return (
        <div className='cards_displayPage'>
            <div className='cards_displayPage_filters'>
                <Link to='/sealed'><div  className='buttons__product__basic'>Back to Set selection</div></Link>
            </div>
            <div className='cardsRow__container'>
                <div className="cards__content">
                    {displayList}
                </div>
            </div>
        </div>
    )
}

export default WtrSealed