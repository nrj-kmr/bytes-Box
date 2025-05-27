import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WorkSpace } from './pages/WorkSpace';
import { HomePage } from './pages/Home';
import { SignIn } from './components/Signin';
import { NotFound } from './pages/404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workspace" element={<WorkSpace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
