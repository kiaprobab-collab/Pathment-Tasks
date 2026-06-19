

import MenuItem from './menuitem'

const MenuList = ({list = []}) => {
  return (
    <ul className="menu-list-container">
        {
            list && list.length ?
                list.map((listItem) => (
                    <MenuItem key={listItem.label} item={listItem}/>
                ))
            :
            null
        }
    </ul>
  )
}

export default MenuList