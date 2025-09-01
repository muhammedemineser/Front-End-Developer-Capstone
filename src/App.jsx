import './App.css'
import { Navbar } from './components/Navbar'
import { Main } from './components/Main'
import { Footer } from './components/Footer'
// in layout.jsx oder App.jsx
import { Toaster } from "sonner"

function App() {

  return (
    <>
      <Toaster richColors />
      <Navbar />
      <Main />
      <Footer />
    </>
  )
}

export default App

