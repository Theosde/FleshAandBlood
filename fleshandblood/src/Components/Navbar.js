
import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import './Navbar.css'

import { useSelector, useDispatch } from 'react-redux'
import { signin, navigate, resetUser } from '../actions/index'

function Navbar() {
//========================================================================================================================================================
/* 
REDUX STATE
*/
//========================================================================================================================================================
    const isLogged = useSelector(state => state.isLogged)
    const counter = useSelector(state => state.counter)
    const dispatch = useDispatch()
//========================================================================================================================================================
/* 
NORMAL STATE
*/
//========================================================================================================================================================
    const [active,setActive] = useState(1)
    const [dropdown,setDropdown] = useState(false)

    

//========================================================================================================================================================
/* 
RETURN
*/
//========================================================================================================================================================
    if (dropdown === false){
    return(
        <div className='navs__content__basic'>
            <Link to='/' onClick={()=>setActive(1)} className={active===1?'active_navs':''}>Home</Link>
            <Link to='/sealed' onClick={()=>setActive(2)} className={active===2?'active_navs':''}>Sealed Products</Link>
            <Link to='/wtr' onClick={()=>setActive(3)} className={active===3?'active_navs':''} onMouseEnter={()=>setDropdown(true)} onMouseleave={()=>setDropdown(false)}>Singles</Link>
            <Link to='/about' onClick={()=>setActive(4)} className={active===4?'active_navs':''}>About us</Link>
            <div className='navs__content__right'>
            {isLogged===false?
            <Link
                onClick={()=>setActive(5)}
                className={active===5?'active_navs':''} to='/sign-in'>
                Sign-In 
            </Link>
            :
            <Link
                onClick={()=>{
                    setActive(1)
                    dispatch(signin())
                    dispatch(resetUser())
                }}
                className={active===1?'active_navs':''} to='/'>
                Disconnect 
            </Link>
            }
            <Link 
                onClick={()=>setActive(6)} 
                className={active===6?'active_navs':''} to='/cart'>
                    <ShoppingCartSharpIcon/>
                    Cart ({counter})
            </Link>
            </div>
        </div>
        )

    } else {
        return(
        <div className='navs__content__basic'>
            <Link to='/' onClick={()=>setActive(1)} className={active===1?'active_navs':''}>Home</Link>
            <Link to='/sealed' onClick={()=>setActive(2)} className={active===2?'active_navs':''}>Sealed Products</Link>
            <Link to='/wtr' onClick={()=>setActive(3)} className={active===3?'active_navs':''} onMouseEnter={()=>setDropdown(true)}>Singles</Link>
            <Link to='/about' onClick={()=>setActive(4)} className={active===4?'active_navs':''}>About us</Link>
            <div className={dropdown?'navbar__Dropdown':'no__display'}
                onMouseLeave={()=>setDropdown(false)}
            >
                    <Link to='/wtr'><div style={{marginBottom:10, cursor:'pointer',color: 'gray',fontWeight:500}}>Welcome to Rathe (UNLIMITED)</div></Link>
                    <Link to='/arc'><div style={{marginBottom:10, cursor:'pointer',color: 'gray',fontWeight:500}}>Arcane Rising (UNLIMITED)</div></Link>
                    <Link to='/cru'><div style={{marginBottom:10, cursor:'pointer',color: 'gray',fontWeight:500}}>Crucible of War</div></Link>
                    <Link to='/mon'><div style={{marginBottom:10, cursor:'pointer',color: 'gray',fontWeight:500}}>Monarch (ALPHA)</div></Link>
            </div>
            <div className='navs__content__right'>
            {isLogged===false?
            <Link
                onClick={()=>setActive(5)}
                className={active===5?'active_navs':''} to='/sign-in'>
                Sign-In 
            </Link>
            :
            <Link
                onClick={()=> {
                    setActive(1)
                    dispatch(signin())
                    dispatch(resetUser())
                }}
                className={active===1?'active_navs':''} to='/'>
                Disconnect 
            </Link>
            }
            <Link 
                onClick={()=>setActive(6)} 
                className={active===6?'active_navs':''} to='/cart'>
                    <ShoppingCartSharpIcon/>
                    Cart ({counter})
            </Link>
            </div>
        </div>
        
        )
    }}

export default Navbar;
