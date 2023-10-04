import { Link, useParams, useNavigate } from 'react-router-dom';
import './style.css';
import { useState, useEffect } from 'react';

const Item = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token')
    const [item, setItem] = useState();
    const navigate = useNavigate()
    const [userdata, setUserdata] = useState({})
    useEffect(() => {
        if (id) {
            fetch(`http://127.0.0.1:8000/api/items/${id}`)
                .then((res) => res.json())
                .then((data) => setItem(data))
                .catch((error) => console.error("Ошибка при получении данных:", error));
        }
    }, [id]); 

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/auth/profile', {
            method: 'GET', 
            headers: 
            {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setUserdata(data)
        })
        .catch(error => {
            console.log(error.detail)
        });
        
    }, [token])

    const handleSubmit =() =>
    {
        const data = 
        {
            item: id
        }
        fetch('http://127.0.0.1:8000/api/basket/add',
        {
            method: 'POST',
            headers:
            {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((respone) => respone.json())
        .then((data) => console.log(data))
        .catch((error) => navigate('/error'))
    }
    function handleDelete()
    {
        fetch(`http://127.0.0.1:8000/api/items/${id}/delete`,
        {
            method: 'DELETE',
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            navigate('/')
        })
        .catch(error => console.log(error));
    }
    if (!item) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div className='item'>
            <Link to={'/'} className='back'>Вернуться на главную</Link>
            <h4>{item.name}</h4>
            <div className='item_info'>
                <div>
                    <img src={`http://127.0.0.1:8000/img/${item.img}`} alt="" />
                    {userdata.role === 'admin' && <button onClick={handleDelete} className='delete'><p >Удалить</p></button>}
                </div>
                <div className='about_item'>
                    <p className='category_item'>Категория: {item.category}</p>
                    <p className='desription'>{item.description}</p>
                    <p className='quantity'>Количество: {item.quantity}</p>
                    <div className='price_and_basket'>
                        <p className='price'>Цена: {item.cost}</p>
                        <button onClick={handleSubmit}><p className='add_in_basket'>Добавить в корзину</p></button>
                    </div>
                    </div>
            </div>
        </div>
    );
}

export default Item;
