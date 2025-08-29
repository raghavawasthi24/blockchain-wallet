import './App.css'
import Header from './components/shared/header'
import Overview from './components/shared/overview'
import Table from './components/shared/table'

function App() {
  return (
    <main className='bg-[#212124]'>
      <Header/>
      <div className='p-4 flex flex-col gap-4'>
        <Overview/>
        <Table/>
      </div>
    </main>
  )
}

export default App
