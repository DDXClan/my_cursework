import { Link, useParams } from 'react-router-dom';
import './style.css';
import { useState, useEffect } from 'react';

const Item = () => {
    const { id } = useParams();

    const [item, setItem] = useState();

    useEffect(() => {
        if (id) {
            fetch(`http://127.0.0.1:8000/api/items/${id}`)
                .then((res) => res.json())
                .then((data) => setItem(data))
                .catch((error) => console.error("Ошибка при получении данных:", error));
        }
    }, [id]); 

    if (!item) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div className='item'>
            <Link to={'/'} className='back'>Вернуться на главную</Link>
            <h4>{item.name}</h4>
            <div className='item_info'>
                <img src={`http://127.0.0.1:8000/img/${item.img}`} alt="" />
                <div className='about_item'>
                    <p className='category_item'>Категория: {item.category}</p>
                    <p className='desription'>{item.description}</p>
                    <p className='quantity'>Количество: {item.quantity}</p>
                    <div className='price_and_basket'>
                        <p className='price'>Цена: {item.cost}</p>
                        <Link to={'#'}><p className='add_in_basket'>Добавить в корзину</p></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;
