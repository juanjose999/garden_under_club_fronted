import './App.css'
import { AppRouter } from './AppRouter/AppRouter'
import { AuthProvider } from './context/AuthProvider'

function App() {

  return (
    <>
    <AuthProvider>
      <AppRouter ></AppRouter>

      </AuthProvider>
    </>
  )
}

export default App
