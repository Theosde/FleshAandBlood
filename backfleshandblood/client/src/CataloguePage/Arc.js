import React,{useEffect, useState} from 'react'
import Cards from '../Components/Cards'
import '../Components/ProductCard.css'


function Arc() {

    var displayList;
    
    const [cardList,setcardList] = useState([])
    const [listToDisplay,setListToDisplay] = useState(0)


    useEffect(() => {

        fetch("http://localhost:3000/arcCards",{
            method: "get",
        }).then(response=> {
            return response.json()
        })
        .then(data=>{
            console.log("retour fetch",data);
            setcardList(data.cards)
        })
        .catch((error)=>{
            console.log("Request failed recup single cards arc", error );
        })

    }, [])

    useEffect(() => {

    }, [displayList])



    if(listToDisplay === 0){
        displayList = cardList.map(e =>{
            return<Cards url={e.url} name={e.name} price={e.price} brand={e.brand} category={e.category} quantity={e.quantity}/>
        })
    } else if(listToDisplay===1){
         displayList = cardList.filter(e => e.category.includes('L')).map(e =>{
            return<Cards url={e.url} name={e.name} price={e.price} brand={e.brand} category={e.category} quantity={e.quantity}/>
        })
    } else if(listToDisplay===2){
        displayList = cardList.filter(e => e.category.includes('M')).map(e =>{
            return<Cards url={e.url} name={e.name} price={e.price} brand={e.brand} category={e.category} quantity={e.quantity}/>
        })
    } else if(listToDisplay===4){
        displayList = cardList.filter(e => e.category.includes('R')).map(e =>{
           return<Cards url={e.url} name={e.name} price={e.price} brand={e.brand} category={e.category} quantity={e.quantity}/>
       })
    } else {
        displayList = cardList.filter(e => e.category.includes('C')).map(e =>{
            return<Cards url={e.url} name={e.name} price={e.price} brand={e.brand} category={e.category} quantity={e.quantity}/>
        })
    }



    return (
        <div className='cards_displayPage'>
            <div className='cards_displayPage_filters'>
                <div  onClick={()=>setListToDisplay(0)} className='buttons__content__basic large'>All</div>
                <div  onClick={()=>setListToDisplay(1)} className='buttons__content__basic large'>Legendary</div>
                <div  onClick={()=>setListToDisplay(2)} className='buttons__content__basic large'>Majestic</div>
                <div  onClick={()=>setListToDisplay(4)} className='buttons__content__basic large'>Rare</div>
                <div  onClick={()=>setListToDisplay(5)} className='buttons__content__basic large'>Common</div>
            </div>
            <div className='cardsRow__container'>
                <div className="cards__content">
                    {displayList}
                </div>
            </div>
        </div>
    )
}

export default Arc
