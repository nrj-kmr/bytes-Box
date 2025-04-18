import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { WorkSpace } from '../src/pages/Workspace';
import { HomePage } from '../src/pages/Home';
import './App.css'

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