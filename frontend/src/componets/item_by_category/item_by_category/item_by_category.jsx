import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const ItemByCategory = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    useEffect(() => 
    {
        if(id) {
            fetch(`http://localhost:8000/api/items/category/${id}`)
            .then((res) => res.json())
            .then((data) => setItems(data))
            
        }
    }, [id])

    if (!items) {
        return <div className='loading'>Loading...</div>;
    }

    return ( 
        <>
            <form className='search'>
                <input type="search" placeholder='Поиск'/>
            </form>
            {/* <h2></h2> */}
            <div className={'cards'}>
                <ul>
                    {
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
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
 
export default ItemByCategory;