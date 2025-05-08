import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from './components/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="byteBox-ui-theme">
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ThemeProvider>
  </StrictMode>,
)
