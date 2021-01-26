import React from 'react'
import { Link } from 'react-router-dom'
import './CatalogueStructure.css'

function CatalogueStructure() {
    return (
        <div>
            <div className='first__line'>
                <Link to='/wtr-sealed'><img src='../../assets/editions/wtr.jpg' alt='wtr' width='250' height='200'></img></Link>
                <Link to='/arc-sealed'><img src='../../assets/editions/arc.jpg' alt='arc' width='250' height='200'></img></Link>
                <Link to='/cru-sealed'><img src='../../assets/editions/cru.jpg' alt='cru' width='250' height='200'></img></Link>
            </div>
            <div className='first__line'>
                <Link to='/mon-sealed'><img src='../../assets/editions/monarch.jpg' alt='wtr' width='250' height='200'></img></Link>
            </div>

        </div>
    )
}

export default CatalogueStructure
