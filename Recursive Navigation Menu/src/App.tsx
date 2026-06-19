import TreeView  from '../components/index'
import menus from "../components/data.js";
import './App.css'


function App() {
 

  return (
    <>
     <TreeView menus={menus}/>
    </>
  )
}

export default App
