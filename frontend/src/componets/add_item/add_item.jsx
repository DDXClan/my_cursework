import './style.css'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const AddItem = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    useEffect(() => 
    {
        fetch('http://127.0.0.1:8000/api/items/category')
        .then((response) => response.json())
        .then((data) => setCategories(data))
        .catch((error) => console.log(error))
    }, [])
    const [name, setName] = useState(null)
    const [img, setImg] = useState(null)
    const [description, setDescription] = useState(null)
    const [quanity, setQuanity] = useState(null)
    const [cost, setCost] = useState(null)
    const [category_id, setCategory_id] = useState(null)

    const handleNameChange = (event) => 
    {
        setName(event.target.value)
    }
    const handleImgChange = (event) =>
    {
        setImg(event.target.files[0])
    }
    const handleDescriptionChange = (event) =>
    {
        setDescription(event.target.value)
    }
    const handleQuanityChange = (event) =>
    {
        setQuanity(event.target.value)
    }
    const handleCostChange = (event) =>
    {
        setCost(event.target.value)
    }
    const handleCategoryChange = (event) =>
    {
        setCategory_id(event.target.value)
    }

    const handleSubmit = (event) =>
    {
        event.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('img', img, img.name)
        formData.append('description', description)
        formData.append("quantity", quanity)
        formData.append('cost', cost)
        formData.append('category', category_id)

        fetch('http://127.0.0.1:8000/api/items/add', 
        {
            method: 'POST',
            headers:
            {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then((response) => response.json())
        .then((data) => 
        {
            console.log(data)
            navigate('/profile')
        })
        .catch((error) => console.log(error))
    }
    return ( 
        <><h2>СОЗДАТЬ ТОВАР</h2>
            <div className="form_create">
                <form onSubmit={handleSubmit}>
                    <input value={name} onChange={handleNameChange} placeholder='Название' type="text" />
                    <input onChange={handleImgChange} placeholder='Картинка' type="file" />
                    <textarea value={description} onChange={handleDescriptionChange} placeholder='Описание' type="text" />
                    <input value={quanity} onChange={handleQuanityChange} placeholder='Количество' type="text" />
                    <input value={cost} onChange={handleCostChange} placeholder='Цена' type="text" />
                    <select value={category_id} onChange={handleCategoryChange}>
                        <option selected='true' disabled='disabled'>Выберете категории</option>
                        {
                            categories.map( category => (
                                <option key={category.id} value={category.id}><p key={category.name}>{category.name}</p></option>
                            ))
                        }
                    </select>
                    <p>Нет категории? <Link to={'/category/add'}>Создать категорию</Link></p>
                    <button type='submit'>СОЗДАТЬ</button>
                </form>
            </div>
        </>
     );
}
 
export default AddItem;