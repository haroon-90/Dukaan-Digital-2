import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/Routes.jsx'
import { UserProvider } from './components/Context/UserContext.jsx'
import { ThemeProvider } from './components/Context/ThemeContext.jsx'
import { LoadingProvider } from './components/Context/LoadingContext.jsx'
import { Toaster } from 'react-hot-toast';
import { ConfirmProvider } from './components/UI/Confirm';

function App() {

  return (
    <>
      <ThemeProvider>
        <LoadingProvider>
          <Toaster position="top-center" duration={1000}
            toastOptions={{
              duration: 1000,
              error: {
                duration: 5000,
              },
            }} />
          <BrowserRouter>
            <UserProvider>
              <ConfirmProvider>
                <AppRouter />
              </ConfirmProvider>
            </UserProvider>
          </BrowserRouter>
        </LoadingProvider>
      </ThemeProvider>
    </>
  )
}

export default App
