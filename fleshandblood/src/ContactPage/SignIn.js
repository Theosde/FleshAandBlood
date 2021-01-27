import React,{useState} from 'react'
import './SignIn.css'

import { useDispatch } from 'react-redux'
import { signin,addUser } from '../actions/index'

import { useHistory } from "react-router-dom";

function SignIn() {
    var history = useHistory()

    const dispatch = useDispatch()


    const [signInData,setSignInData] = useState({email:"",password:""})
    const [signUpData,setSignUpData] = useState({firstname:"",lastname:"",email:"",password:"",confPassword:""})

    var signIn = ()=>{

        fetch("http://localhost:3000/users/signin",{
            method: "POST",
            body: JSON.stringify({email:signInData.email,password:signInData.password}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(response=> {
            return response.json()
        })
        .then(data=>{
            console.log("retour fetch",data);

            if(data.result){
                dispatch(signin())
                dispatch(addUser(data.user))
                history.push("/")
            }else{
                // message ERROR a faire
            }

        })
        .catch((error)=>{
            console.log("Request failed recup user", error );
        })

    }

    var signUp = ()=>{

        // verfi password regex
        if(!signUpData.password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/)){

            // message error password 1 minuscule 1 maguscule 1 chiffre and 6 caractere
            console.log(' pas ok ==> 1 minuscule 1 maguscule 1 chiffre');

        }else{
            if(signUpData.password !== signUpData.confPassword){

            // message error password and confpassword different
                console.log('pas ok ==> password and confpassword diff');

            }else{
                console.log('ok');

                fetch("http://localhost:3000/users/signup",{
                    method: "POST",
                    body: JSON.stringify({
                        firstname:signUpData.firstname,
                        lastname:signUpData.lastname,
                        email:signUpData.email,
                        password:signUpData.password
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }
                }).then(response=> {
                    return response.json()
                })
                .then(data=>{
                    console.log("retour fetch",data);

                    if(data.result){
                        dispatch(signin())
                        dispatch(addUser(data.user))
                        history.push("/")
                    }else{
                        // message ERROR a faire
                        console.log('pas ok ==> email exist déjà');
                    }

                })
                .catch((error)=>{
                    console.log("Request failed recup user", error );
                })


            }

        }

    }

    return (
        <div className='signin__page'>
            <div className='subscribe__form__container'>
                <input type='text' placeholder='First Name' value={signUpData.firstname} onChange={(e)=>{
                    var copySignUpData = {...signUpData}
                    copySignUpData.firstname = e.target.value
                    setSignUpData(copySignUpData)
                }} ></input>
                <input type='text' placeholder='Last Name' value={signUpData.lastname} onChange={(e)=>{
                    var copySignUpData = {...signUpData}
                    copySignUpData.lastname = e.target.value
                    setSignUpData(copySignUpData)
                }} ></input>
                <input type='email' placeholder='Email' value={signUpData.email} onChange={(e)=>{
                    var copySignUpData = {...signUpData}
                    copySignUpData.email = e.target.value
                    setSignUpData(copySignUpData)
                }} ></input>
                <input type='password' placeholder='Password'  value={signUpData.password} onChange={(e)=>{
                    var copySignUpData = {...signUpData}
                    copySignUpData.password = e.target.value
                    setSignUpData(copySignUpData)
                }} ></input>
                <input type='password' placeholder='Confirm Password' value={signUpData.confPassword} onChange={(e)=>{
                    var copySignUpData = {...signUpData}
                    copySignUpData.confPassword = e.target.value
                    setSignUpData(copySignUpData)
                }} ></input>
                <div className='buttons__register' onClick={signUp}>Register</div>
            </div>

            <div className='login__form__container'>
                <input type='email' placeholder='Email' value={signInData.email} onChange={(e)=>{
                    var copySignInData = {...signInData}
                    copySignInData.email = e.target.value
                    setSignInData(copySignInData)
                }}></input>
                <input type='password' placeholder='Password' value={signInData.password} onChange={(e)=>{
                    var copySignInData = {...signInData}
                    copySignInData.password = e.target.value
                    setSignInData(copySignInData)
                }}></input>
                <div className='buttons__register' onClick={signIn} >Login</div>
            </div>
        </div>
    )
}

export default SignIn
