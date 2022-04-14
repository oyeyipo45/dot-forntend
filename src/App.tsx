import './App.css'
import { PageviewGenerator } from './PageviewGenerator'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Stat from './Stats/Stat';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <Routes>
            <Route path='/' element={<PageviewGenerator />} />
            <Route path='/stats' element={<Stat />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App