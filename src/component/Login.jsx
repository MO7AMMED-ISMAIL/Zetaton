import React, { useState } from 'react'
import '../css/login.css'
import { Link, useNavigate } from 'react-router-dom'
import auth from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


function Login() {

    const [email , setEmail]  = useState('');
    const [password , setPassword]  = useState('');
    const [error , setError]  = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth,email, password);
            navigate('/home');
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }

        setLoading(false);
    }

    return (
        <div class="wrapper">
            <div class="logo">
                <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt=""/>
            </div>

            <div class="text-center mt-4 name">
                Zateton
            </div>
            {error && <div className="alert alert-danger text-center mt-3">{error}</div>}
            <form class="p-3 mt-3" onSubmit={handleSubmit}>
                <div class="form-field d-flex align-items-center">
                    <span class="far fa-user"></span>
                    <input 
                        type="text" 
                        name="userName" 
                        id="userName" 
                        placeholder="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </div>
                <div class="form-field d-flex align-items-center">
                    <span class="fas fa-key"></span>
                    <input 
                        type="password" 
                        name="password" 
                        id="pwd" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                </div>
                <button disabled={loading} class="btn mt-3">Login</button>
            </form>
            <div class="text-center fs-6">
                <Link to={"/register"}>Sign up</Link>
            </div>
        </div>
    )
}

export default Login
