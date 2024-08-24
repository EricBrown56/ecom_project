import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import { Component } from 'react';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import HomePage from './components/HomePage';
import CustomerForm from './components/CustomerForm';
import ViewCustomers from './components/ViewCustomers';
import CustomerDetails from './components/CustomerDetails';
import AddProduct from './components/AddProduct';
import ViewProducts from './components/ViewProducts';
import LoginForm from './components/LoginForm';

function App() {
  

  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<LoginForm />} />
        <Route path='/Add-Customer' element={<CustomerForm />} />
        <Route path='/Customers' element={<ViewCustomers />} />
        <Route path='/Customers/:id' element={<CustomerDetails />} />
        <Route path='/Products' element={<ViewProducts />} />
        <Route path='/Add-Product' element={<AddProduct />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      
      

     
    </>
  )
}

export default App
