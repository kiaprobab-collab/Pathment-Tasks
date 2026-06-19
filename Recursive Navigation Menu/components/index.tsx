
import MenuList from './menulist'

const TreeView = ({menus =[]}) => {
  return (
    <div style={{ minHeight: "100vh",width: "350px",background: "rgb(0, 71, 10)"}}> 
        <MenuList list={menus} />
    </div>
  )
}

export default TreeView