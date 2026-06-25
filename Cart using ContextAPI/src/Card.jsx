import React from 'react'
import { useCardContext } from './cardContext'

const Card = () => {
  const {cartItems, addItem, getTotalPrice} = useCardContext()
  console.log(cartItems)

  return (
    <div style={{ flex: 1, background: '#f9f9f9', padding: '20px', border: '2px solid #dddddd' }}>
      <h2>Your Shopping Cart ({cartItems.length})</h2>

      {cartItems.length === 0 ? (
        <p>The cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <h4>{item.name}</h4>
                <p>${item.price}</p>
                <p>{item.quantity}</p>
              </div>
              <div>
                <button onClick={() => addItem(item)}>+</button>
              </div>
            </div>
          ))}
           <h3>Total Price: ${getTotalPrice()}</h3>
        </>
      )}
    </div>
  );
}
export default Card