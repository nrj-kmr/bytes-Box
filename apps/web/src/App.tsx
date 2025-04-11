import './styles/App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { WorkSpace } from './pages/WorkSpace';
import { HomePage } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workspace" element={<WorkSpace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
