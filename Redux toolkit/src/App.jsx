import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Counter from './store/components/Counter'
import User from './store/components/User';
import { changeName } from './store/features/counter/counterSlice';

import { useEffect } from 'react';
import { fetchUser } from './store/features/user/userSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchUser())
  },[])

  return (
    <>
      <Counter />
      <input className='border' type="text" onChange={(e)=>dispatch(changeName(e.target.value))} />
      <User />
    </>
  )
}

export default App