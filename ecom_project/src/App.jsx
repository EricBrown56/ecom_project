import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import HomePage from './components/HomePage';


function App() {
  

  return (
    <>
      <NavigationBar />
      <HomePage />

      <NotFound />
    </>
  )
}

export default App
