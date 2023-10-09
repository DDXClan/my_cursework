import './style.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CreateCategory = () => {
    const token = localStorage.getItem('token')
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const handleNameChange = (event) =>
    {
        setName(event.target.value)
    }
    const handleSubmit = (event) =>
    {
        event.preventDefault();

        const data = 
        {
            name: name
        }

        fetch('http://127.0.0.1:8000/api/items/add_category', 
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => 
        {
            console.log(data)
            navigate('/profile')
        })
        .catch((error) => navigate('/error'))
    }
    
    return ( 
        <div>
            <h2>Создать категорию</h2>
            <form className='form_create' onSubmit={handleSubmit}>
                <input placeholder='Название' value={name} onChange={handleNameChange} type='text'/>
                <button type='submit'>СОЗДАТЬ</button>
            </form>
        </div> 
     );
}
 
export default CreateCategory;