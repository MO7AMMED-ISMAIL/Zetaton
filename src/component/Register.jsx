import React, { useState } from 'react'
import { Form, Button, Card,Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import auth from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            return setError('Passwords do not match');
        }
        try {
            setError("");
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/home");
        }catch(error){
            setError('Failed to create an account');
        }
        setLoading(false);
    }

    return (
        <>
            <Card className=' m-5 p-3 w-50 mx-auto'>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control id="email" type="email" required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor="password-confirm">
                                Password Confirmation
                            </Form.Label>
                            <Form.Control
                            id="password-confirm"
                            type="password"
                            required
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="w-100 " disabled={loading} type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}

export default Register
