
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app-router';
import './App.css';


function App() {
  return (
   <BrowserRouter>
    <div className='container'>
     <AppRouter />
    </div>
   </BrowserRouter>
  );
}

export default App;
