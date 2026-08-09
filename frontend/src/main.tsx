import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import {StoreProvider} from "./store/StoreProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreProvider>

)
