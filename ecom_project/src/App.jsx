import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import HomePage from './components/HomePage';
import CustomerForm from './components/CustomerForm';
import ViewCustomers from './components/ViewCustomers';


function App() {
  

  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Add-Customer' element={<CustomerForm />} />
        <Route path='/Customers' element={<ViewCustomers />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      
      

     
    </>
  )
}

export default App
