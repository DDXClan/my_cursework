import './App.css';
import {Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import About from './componets/about/about';
import Category from './componets/category/category';
import Header from './componets/header/header';
import Item from './componets/item/item';
import MainPage from './componets/main_page/main_page';
import SignUp from './componets/signup/signup';
import Login from './componets/login/login';
import Profile from './componets/profile/profile';
import AddItem from './componets/add_item/add_item';
import Error from './componets/error/error';
import ItemByCategory from './componets/item_by_category/item_by_category/item_by_category';
import CreateCategory from './componets/add_category/add_category';

const useAdminAuthorization = () => {
  const [isAdmin, setAdmin] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetch('http://127.0.0.1:8000/api/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.role === 'admin') {
            setAdmin(true);
          }
        })
        .catch(error => console.log(error));
    }
  }, [token]);

  return isAdmin;
};

function App() {
  const isAdmin = useAdminAuthorization();
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/item/add'  element={isAdmin ? <AddItem/> : <Error/>}/> 
        <Route path='/item/:id' element={<Item/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/category/:id' element={<ItemByCategory/>}/>
        <Route path='/error' element={<Error/>}/>
        <Route path='/category/add' element={isAdmin ? <CreateCategory/>: <Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
