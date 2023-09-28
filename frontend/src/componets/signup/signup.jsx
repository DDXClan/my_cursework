import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const SignUp = () => {
    const [username, setUsername]= useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleUsernameChange = (event) => 
    {
        setUsername(event.target.value)
    }
    const handleEmailChange = (event) => 
    {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) => 
    {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => 
    {
        event.preventDefault();

        const data =
        {
            username: username,
            email: email,
            password: password
        }

        fetch('http://127.0.0.1:8000/api/auth/register', {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            navigate('/login')})
        .catch((error) => {
            console.log(error)
        })
    }
    return ( 
        <div className='sign_up'>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <input  placeholder='username' value={username} onChange={handleUsernameChange} type='text'/>
                <input placeholder='email' value={email} onChange={handleEmailChange} type='email'/>
                <input placeholder='password' value={password} onChange={handlePasswordChange} type="password" />
                <button type='submit'>Зарегестрироваться</button>
            </form>
            <p>У вас уже есть аккаунт? <Link to={'/login'}>Войти</Link></p>
        </div>
     );
}
 
export default SignUp;