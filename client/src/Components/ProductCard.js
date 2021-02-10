

import React from "react";
import './ProductCard.css'

function VerticalCard(props){

  return(

            <div className="vertical_card">
              <img
                src={props.url}
                alt=""
                className="vertical_card__picture"
              ></img>
              <div className="vertical_card_text">
                <div className='vertical_card_text_flex'>
                  <h2>{props.name}</h2>
                  <span>•</span>
                  <span>{props.price}</span>
                </div>
                <div className="separator_black"></div>
                <p>
                  {props.desc}
                </p>
                <div className="vertical_card_read_more_black">Voir plus</div>
              </div>
            </div>


        )
  }

  export default VerticalCard;
