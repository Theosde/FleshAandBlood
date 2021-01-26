import React,{useEffect, useState} from 'react'
import Cards from '../Components/Cards'
import '../Components/ProductCard.css'


function Decklist() {

    var displayList;
    const [listToDisplay,setListToDisplay] = useState(0)

    useEffect(() => {
        
    }, [displayList])

    var deckList = [
        {url:'../../assets/wtr/wtr086.png', name:'SCAR FOR A SCAR',       quantity:1, price:'3/3',   brand:'wtr', category:'C'},
        {url:'../../assets/wtr/wtr122.png', name:'STEELBLADE SHUNT',      quantity:1, price:'3/3',   brand:'wtr', category:'R'},
        {url:'../../assets/wtr/wtr121.png', name:'STEELBLADE SHUNT',      quantity:1, price:'3/3',   brand:'wtr', category:'R'},
        {url:'../../assets/wtr/wtr188.png', name:'STEELBLADE SHUNT',      quantity:1, price:'3/3',   brand:'wtr', category:'R'},
        {url:'../../assets/wtr/wtr031.png', name:'SINK BELOW',            quantity:1, price:'3/3',   brand:'wtr', category:'C'},
        {url:'../../assets/wtr/wtr033.png', name:'SNATCH',      quantity:1, price:'3/3',   brand:'wtr', category:'R'},
        {url:'../../assets/arc/arc007.png', name:'COMMAND AND CONQUER',      quantity:1, price:'0/3',   brand:'wtr', category:'M'},
        {url:'../../assets/wtr/wtr006.png', name:'ENLIGHTENED STRIKE',      quantity:1, price:'0/3',   brand:'wtr', category:'M'},
        {url:'../../assets/wtr/wtr095.png', name:'FLOCK THE FEATHER WALKERS',      quantity:1, price:'3/3',   brand:'wtr', category:'C'},
        {url:'../../assets/wtr/wtr018.png', name:'SINGING STEELBLADE',      quantity:1, price:'2/3',   brand:'wtr', category:'S'},
        {url:'../../assets/cru/cru007.png', name:'SPOILS OF WAR',      quantity:1, price:'0/3',   brand:'cru', category:'M'},
        {url:'../../assets/wtr/wtr009.png', name:'STEELBLADE SUPREMACY',      quantity:1, price:'1/3',   brand:'wtr', category:'M'},
        {url:'../../assets/wtr/wtr120.png', name:'WARRIOR S VALOR',      quantity:1, price:'3/3',   brand:'wtr', category:'R'},
        {url:'../../assets/wtr/wtr186.png', name:'WARRIOR S VALOR',      quantity:1, price:'3/3',   brand:'wtr', category:'R'},
        {url:'../../assets/wtr/wtr187.png', name:'WARRIOR S VALOR',      quantity:1, price:'3/3',   brand:'wtr', category:'R'},
        {url:'../../assets/wtr/wtr024.png', name:'ROUT',      quantity:1, price:'0/1',   brand:'wtr', category:'S'},
        {url:'../../assets/wtr/wtr072.png', name:'RAZOR REFLEX',      quantity:1, price:'3/3',   brand:'wtr', category:'C'},
        {url:'../../assets/cru/cru004.png', name:'OUT FOR BLOOD',      quantity:1, price:'0/3',   brand:'cru', category:'C'},
        {url:'../../assets/wtr/wtr056.png', name:'IRONSONG RESPONSE',      quantity:1, price:'3/3',   brand:'wtr', category:'C'},
        {url:'../../assets/wtr/wtr021.png', name:'IRONSONG DETERMINATION',      quantity:1, price:'0/3',   brand:'wtr', category:'S'},
        {url:'../../assets/cru/cru001.png', name:'HIT AND RUN',      quantity:1, price:'0/3',   brand:'cru', category:'C'},
        {url:'../../assets/cru/cru002.png', name:'HIT AND RUN',      quantity:1, price:'0/3',   brand:'cru', category:'C'},
        {url:'../../assets/cru/cru003.png', name:'HIT AND RUN',      quantity:1, price:'0/3',   brand:'cru', category:'C'},
        {url:'../../assets/wtr/wtr051.png', name:'NATURE S PATH PILGRIMAGE',      quantity:1, price:'2/2',   brand:'wtr', category:'C'},
        {url:'../../assets/wtr/wtr189.png', name:'OVERPOWER',      quantity:1, price:'3/3',   brand:'wtr', category:'C'},
        {url:'../../assets/wtr/wtr014.png', name:'GLINT THE QUICKSILVER',      quantity:1, price:'0/3',   brand:'wtr', category:'M'},
        
    ]

    if(listToDisplay === 0){
        displayList = deckList.map(e =>{
            return<Cards url={e.url} name={e.name} price={e.price} brand={e.brand} category={e.category} quantity={e.quantity}/>
        })
}

    return (
        <div className='cards_displayPage'>
            <div className='cards_displayPage_filters'>
                <div  onClick={()=>setListToDisplay(0)} className='buttons__content__basic large'>Deck Warrior</div>
            </div>
            <div className='cardsRow__container'>
                <div className="cards__content">
                    {displayList}
                </div>
            </div>
        </div>
    )
}

export default Decklist
