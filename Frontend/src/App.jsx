import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/Routes.jsx'
import { UserProvider } from './components/Context/UserContext.jsx'
import { ThemeProvider } from './components/Context/ThemeContext.jsx'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <ThemeProvider>
          <UserProvider>
            <AppRouter />
          </UserProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
