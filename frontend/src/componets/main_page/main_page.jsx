import './style.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MainPage = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/items/')
            .then((res) => res.json())
            .then((data) => setItems(data));
    }, []);
    return ( 
        <>
            <form className='search'>
                <input type="search" placeholder='Поиск'/>
            </form>
            <h2>Главная</h2>
            <div className={'cards'}>
                <ul>
                    {
                        items.map(item => (
                            <li key={item.id}>
                                <Link to={`/item/${item.id}`}>
                                    <div>
                                        <img src={`http://127.0.0.1:8000/img/${item.img}`} alt="" />
                                        <span>
                                            <p>{item.name}</p>
                                            <p className='price'>Цена {item.cost}</p>
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
     );
}
 
export default MainPage;
