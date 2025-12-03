import './App.css'
import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01'
import Hero from './components/ui/hero'
import CustomFooter from './components/ui/customFooter'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar01 />
      <main className="flex-1">
        <Hero />
      </main>
      <CustomFooter />
    </div>
  )
}

export default App
