import { useState } from 'react'
import MenuList from './menulist'
import {FaMinus, FaPlus} from 'react-icons/fa'

const MenuItem = ({item}) => {
    const [displayCurrentChildren, setDisplayCurrentChildren] = useState({})

    function handleTogleChildren(getCurrentLabel){
        setDisplayCurrentChildren({
            ...displayCurrentChildren,
            [getCurrentLabel] : !displayCurrentChildren[getCurrentLabel]
        })
    }
    return (
    <li>
        <div style={{display: "flex",alignItems: "center",gap: "20px",cursor: "pointer",color: "#fff"}}>
            <p>{item.label}</p>
            {
                item && item.children && item.children.length ? (<span onClick={() => handleTogleChildren(item.label)}>{displayCurrentChildren[item.label] ? <FaMinus color="#fff" size={25} /> : <FaPlus color="#fff" size={25} />}</span>) : null
            }
        </div>
        {
            item && item.children && item.children.length > 0  && displayCurrentChildren[item.label]?
                <MenuList list={item.children}/>
            : null
        }
    </li>
  )
}

export default MenuItem