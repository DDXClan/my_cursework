import { Link, useNavigate } from 'react-router-dom';
import './style.css'
import { useState, useEffect } from 'react';
const Profile = () => {
    const [userdata, setUserdata] = useState(null)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [items, setItems] = useState([]);
    if(token === null) navigate('/login')
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
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/basket',
            {
                headers: 
            {
                'Authorization': `Bearer ${token}`
            }
            }
        )
            .then((res) => res.json())
            .then((data) => setItems(data));
    }, [token]);
    const [profileImg, setProfileImg] = useState(null)

    const handleProfileImgChange = (event) =>
    {
        setProfileImg(event.target.files[0])
    }
    
    const handleSubmit = (event) =>
    {
        event.preventDefault();

        const formData = new FormData()
        formData.append('img', profileImg, profileImg.name)

        fetch('http://127.0.0.1:8000/api/auth/profile/edit_img', 
        {
            method: 'PUT',
            headers:
            {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            window.location.reload()
        })
        .catch(error => console.log(error));
    }

    function handleDelete(id)
    {
        fetch(`http://127.0.0.1:8000/api/basket/${id}/delete`,
        {
            method: 'DELETE',
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then((data) => {
            const updatedItems = items.filter(item => item.id !== id);
            setItems(updatedItems);
        })
        .catch(error => console.log(error));
    }
    if (!userdata) {
        return <div className='loading'>Loading...</div>;
    }

    return ( 
        <>      
        <h2>Добро пожаловать {userdata.username}</h2>  
        <div className='profile'>
            <div className='profile_info'>
                <img className='profile_img' src={`http://127.0.0.1:8000/img/${userdata.img_profile}`} alt="" />
                <div>
                    <p>Ваш id: {userdata.id}</p>
                    <p>email: {userdata.email}</p>
                    {userdata.role ? <p>Роль: {userdata.role}</p> : <p>Роль: Пользователь</p>}
                    {userdata.role === 'admin' && <p><Link to={'/item/add'}>Создать товар</Link></p>}
                    {userdata.role === 'admin' && <p><Link to={'/category/add'}>Создать категорию</Link></p>}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <label >Изменить фото профиля</label>
                <input id='profileImage' onChange={handleProfileImgChange} type="file" />
                <button type='submit'>Изменить</button>
            </form>
            <h2>Мои заказы</h2>
            <div className={'cards'}>
                <ul>
                    {
                        items.length > 0 ? (
                            items.map(item => (
                                <li key={item.id}>
                                    <Link to={`/item/${item.id}`}>
                                        <div>
                                            <img src={`http://127.0.0.1:8000/img/${item.img}`} alt="" />
                                            <span>
                                                <p className='item_name'>{item.name}</p>
                                                <p className='price'>Цена {item.cost}</p>
                                            </span>
                                        </div>
                                    </Link>
                                    <button onClick={() => handleDelete(item.id)} className='delete'>УДАЛИТЬ</button>
                                </li>
                            )
                        )) : <p className='not_items'>Нет заказов</p>
                    }
                </ul>
            </div>
        </div>
        
        </>

        );
        
}
 
export default Profile;