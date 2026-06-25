import ProductList from './ProductList'
import './App.css'
import Card from './Card'

function App() {

  return (
    <div style={{ display: 'flex', gap: '40px', padding: '20px' }}>
      <ProductList />
      <Card />
    </div>
  )
}

export default App
