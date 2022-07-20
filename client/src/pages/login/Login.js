import './login.css'
import {useRef, useContext} from 'react'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import {CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom';


export const Login = () => {
    const email = useRef();
    const password = useRef();

    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleClick =(e) =>{
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
       
    }

    return (
        <div className="login">
           
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social</h3>
                    <span className="loginDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, quas.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="email" className="loginInput" placeholder="Email or Username" ref={email} required />
                        <input type="password" className="loginInput" placeholder="Password" ref={password} required minLength="6" />
                        <button type="submit" disabled={isFetching} className="loginButton">{isFetching ? <CircularProgress color="inherit" size="23px" /> :"Log In"}</button>
                        { error?alert("Invalid user details!\nTry again..."):"" }
                        <span className="loginForgot">Forget Password ?</span>
                        <Link to="/register" style={{alignSelf:"center", textAlign:"center", width:"100%"}}>
                        <button  disabled={isFetching} className="loginRegisterBtn loginButton">Create Account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
