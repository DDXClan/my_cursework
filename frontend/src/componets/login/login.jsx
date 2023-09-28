import './style.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const handleUsernameChange = (event) => 
    {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => 
    {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => 
    {
        event.preventDefault();
    
        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)

        fetch('http://127.0.0.1:8000/api/auth/login', 
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        })
        .then((response) => response.json())
        .then((data) => { 
            const token = data.token
            localStorage.setItem('token', token)
            navigate('/profile')
            window.location.reload() 
        })
        .catch((error) => console.log(error))
    }
    return ( 
        <div className='sign_up'>
            <h2>Войти</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder='username' value={username} onChange={handleUsernameChange} type='text'/>
                <input placeholder='password' value={password} onChange={handlePasswordChange} type="password" />
                <button type='submit' className='login_button'>Войти</button>
            </form>
            <p>У вас еще нет аккаунта? <Link to={'/signup'}>Зарегестрироваться</Link></p>
        </div>
     );
}
 
export default Login;