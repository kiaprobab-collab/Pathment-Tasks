import { useCardContext } from "./cardContext";

import React from "react";

const ProductList = () => {
  const PRODUCTS = [
    { id: 1, name: "Wireless Headphones", price: 99 },
    { id: 2, name: "Mechanical Keyboard", price: 149 },
    { id: 3, name: "Gaming Mouse", price: 59 },
  ];

  const value = useCardContext();

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
    <div style={{ border: '1px solid #cccccc', padding: '15px' }}>
      {PRODUCTS.map((item) => (
        <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h5>{item.name}</h5>
          <p>{item.price}</p>
          <button onClick={() => value.addItem(item)}>Add to item</button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ProductList;
