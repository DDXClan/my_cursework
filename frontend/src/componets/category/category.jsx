import { Link } from "react-router-dom";
import './style.css'
import { useState, useEffect } from 'react';
const Category = () => {
    const [categories, setCategory] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/items/category')
            .then((res) => res.json())
            .then((data) => setCategory(data));
    }, []);
    return ( 
    <div className="category">
        <h2>Категории</h2>
        <div className="category_list">
            <ul>
                {
                    categories.map( category => (
                        <li>
                            <Link key={category.id} to={`/category/${category.id}`}><p key={category.name}>{category.name}</p></Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
    );
}
 
export default Category;