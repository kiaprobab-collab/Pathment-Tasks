import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const User = () => {
    const { users, error } = useSelector(state => state.user) 
    console.log(users, error)

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Users List</h2>
            {error && <p className="text-red-500">Error: {error}</p>}

          
            <ul className="list-disc pl-5">
                {users && users.map(user => (
                    <li key={user.id}>
                        {user.name} — <span className="text-gray-500">{user.email}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default User