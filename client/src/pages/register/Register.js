import './register.css'
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router';

export const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();


    const handleClick = async(e) =>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match");
        }else{
            const user= {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            console.log(user)
            try{
                await axios.post('auth/register', user);
                history.push("/login");
            }catch(error){
                console.log(error)
            }
        }
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
                        <input type="text"required ref={username} className="loginInput" placeholder=" Username"/>
                        <input type="email" required ref={email} className="loginInput" placeholder="Email"/>
                        <input type="password"required ref={password} className="loginInput" placeholder="Password" minLength="6"/>
                        <input type="password" required ref={passwordAgain} className="loginInput" placeholder="Confirm Password" minLength="6" />
                        <button type="submit" className="loginButton">Sign Up</button>
                        <Link to="/login"  style={{alignSelf:"center", textAlign:"center", width:"100%"}}>
                        <span className="loginForgot">Already have an account ?</span>
                        <button className="loginRegisterBtn loginButton">Log In</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
