import { createRoot } from 'react-dom/client'
import './App.css'
import App from '../Ilkshop/Shop'
import {BrowserRouter} from 'react-router'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
