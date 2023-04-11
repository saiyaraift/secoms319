import logo from './logo.png';
import "./App.css";
import React, {useState, useEffect} from "react";
import {Products} from "./Products"
import {Categories} from "./Categories"

export const App = () => {
  console.log("Step 1 : After reading file :");
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [query, setQuery] = useState('');

  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const render_products = (ProductsCategory) => {
    return <div className='category-section fixed'>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
      <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{
        maxHeight: '800px', overflowY:
          'scroll'
      }}>
        {/* Loop Products */}
        {ProductsCategory.map((product, index) => (
          <div key={index} className="group relative shadow-lg" >
            <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
              <img
                alt="Product Image"
                src={product.image}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="flex justify-between p-3">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                  </a>
                  <p>Tag - {product.category}</p>
                </h3>
                <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate}</p>
                <p>{product.description}</p>

                <div className="inline-flex">
                  <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                    onClick={() => removeFromCart(product)}>
                    -
                  </button>
                  <button type= "button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                    onClick={() => addToCart(product)}>
                    +
                  </button>
                </div>
                <div>
                  ${product.price} <span class="close">&#10005;</span>{howManyofThis(product.id)}
                </div> 

              </div>
              <p className="text-sm font-medium text-green-600">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  }

  const addToCart = (product) => {
    console.log("MADE IT WITH ADD BUTTON WITH THE PRODUCT" + {product})
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    console.log("MADE IT WITH REMOVE BUTTON WITH THE PRODUCT" + {product})
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== product.id);
    setCart(hardCopy);
  };

  const cartItems = cart.map((product) => (
    <div key={product.id}>
      <img class=
        "img-fluid" src={product.image} width={30} />
      {product.title}
      ${product.price}
    </div>
  ));

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  function handleClick(tag){
    let filtered = Products.filter(cat => cat.category === tag);
    setProductsCategory(filtered);
    console.log("Step 2: STATISTICS",Products.length,ProductsCategory.length);
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log("Step 6 : in handleChange, Target Value :", e.target.value, " Query Value :", query);
    const results = ProductsCategory.filter(eachProduct => {
      if (e.target.value === "") return ProductsCategory;
      return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setProductsCategory(results);
  }

  return (
    <div className="flex fixed flex-row">
      <div className="h-screen bg-red-300 p-3 xl:basis-1/5" style={{ minWidth: '65%' }}>
        <img className="w-full" src={logo} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <h1 className="text-3xl mb-2 font-bold text-white"> STORE SE/ComS319 </h1>
          <p className="text-gray-700 text-white">
            by - <b style={{ color: 'black' }}>Jade Seiler & Saiyara Iftekharuzzaman</b>
          </p>
          <div className="py-10">
            {(Categories) ? <p className='text-white'>Tags : </p> : ''}
            {
              Categories.map(tag => <button key={tag} className="inline-block bg-white rounded-full px-3 py-1
  text-sm font-semibold text-black-700 mr-2 mt-2" 
  onClick={()=>{handleClick(tag)}}>{tag}</button>)
            }
          </div>


          <div className="py-10">
            <input type="search" value={query} onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
             />
          </div>


        </div>
      </div>
      <div className="ml-5 p-10 xl:basis-4/5">
        {console.log("Before render :", Products.length, ProductsCategory.length)}
        {render_products(ProductsCategory)}
      </div>
    </div>
  );
}


export default App;
