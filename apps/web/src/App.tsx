import './styles/App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { WorkSpace } from './pages/WorkSpace';
import { HomePage } from './pages/Home';
import { Login } from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workspace" element={<WorkSpace />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
