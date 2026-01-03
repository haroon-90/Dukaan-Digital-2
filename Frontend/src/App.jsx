import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/Routes.jsx'
import { UserProvider } from './components/Context/UserContext.jsx'
import { ThemeProvider } from './components/Context/ThemeContext.jsx'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <ThemeProvider>
        <Toaster position="top-center" duration={1000}
          toastOptions={{
            duration: 1000,
            error: {
              duration: 5000,
            },
          }} />
        <BrowserRouter>
          <UserProvider>
            <AppRouter />
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
