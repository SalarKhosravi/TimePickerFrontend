import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'

// --- PWA Silent Auto-Update ---
const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
        forceUpdateSW(true)
    }
})

function forceUpdateSW(force) {
    updateSW(force)  // force install new SW + auto reload
}
// --------------------------------

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
