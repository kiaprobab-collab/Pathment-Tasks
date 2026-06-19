import { use, useEffect, useState } from 'react'
import SingleProduct from './SingleProduct';

const LoadData = () => {
  
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disableButton, setDisableButton] = useState(false);

    async function fetchProducts(){
        setLoading(true);

        const res = await fetch(` https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count *20}`);
        const data = await res.json();
        
        if (data && data.products && data.products.length) {
            setProducts((prevData) => [...prevData, ...data.products]);
            setLoading(false);
      }
        // setProducts(data.products);
        setLoading(false);
    }
    useEffect(() => {
        if(products && products.length === 100){
            setDisableButton(true);
        }
    },[products]);

    useEffect(() => {
        fetchProducts()
    }, [count])

    if(loading){
        return <p>Loading...</p>
    }

    return (
        <div style={{display:"flex", flexWrap:"wrap"}}>
            {products && products.length
            ?
            products.map((product)=> (

                <SingleProduct
                    key={product.id}
                    title={product.title}
                    thumbnail={product.thumbnail}
                />
            ))
            :
            null
        }
            <div>
                <button disabled={disableButton} onClick={() => setCount(count + 1)}>Load more data</button>
                {disableButton 
                    ?
                    <p>All 100 products are loaded</p>
                    :
                    null
                }
            </div>
        </div>
  )
}

export default LoadData