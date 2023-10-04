import { Link, useNavigate } from 'react-router-dom';
import './style.css'

const Header = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const deleteToken = () => 
    {
        localStorage.removeItem('token')
        navigate('/')
        window.location.reload()
    }
    return ( 
        
        <header>
            <div className='main_nav'>
                <ul>
                    <li>
                        <Link to={'/'}>Главная</Link>        
                    </li>
                    <li>
                        <Link to={'/about'}>О нас</Link>        
                    </li>
                    <li>
                        <Link to={'/category'}>Категории</Link>        
                    </li>
                    <li>
                        <Link to={'/profile'}>Профиль</Link>        
                    </li>
                </ul>
            </div>
            <div>
                {token ? (<Link onClick={deleteToken} to={'/'} className='login'>Выйти</Link>) : (<Link to={'/login'} className='login'>Войти</Link>)}
            </div>
        </header>
     );
}
 
export default Header;