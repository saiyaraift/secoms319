import logo from './logo.png';
import selfie from './selfie.JPEG';
import "./App.css";
import React, {useState, useEffect} from "react";
import {Categories} from "./Categories"

export const App = () => {
  console.log("Step 1 : After reading file :");
  const [Products, setProducts] = useState([]);
  const [ProductsCategory, setProductsCategory] = useState([]);
  const [query, setQuery] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [showCreator, setCreator] = useState(false);
  const [showAuthor, setAuthor] = useState(false);

  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [zipCode, setZipCode] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');

  const [email, setEmail] = useState('');
  const [EmailError, setEmailError] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [cvv, setCVV] = useState('');
  const [date, setDate] = useState('');

  const [formError, setFormError] = useState('');

  // RENDERS THE SHOPPING/PRODUCTS PAGE WHERE USERS CAN SEARCH BY NAME OR CATEGORY
  // UPON CHECKOUT, THIS IS VIEW IS COLLAPSED AND THE CART VIEW IS OPENED
  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProductsCategory(data);
        setProducts(data); 
      });
  }
  
  useEffect(() => {
    getAllProducts();
  }, []);

  
  const render_products = (ProductsCategory) => {
    return <div id="products" className='category-section fixed'>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
      <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{
        maxHeight: '800px', overflowY:
          'scroll'
      }}>
        {/* Loop Products */}
        {ProductsCategory.map((product, index) => (
          <div key={index} className="group relative shadow-lg pointer-events-none" >
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
                  <button type="button" className="bg-gray-300 group-hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l cursor-pointer pointer-events-auto" 
                    onClick={() => removeFromCart(product, index)}>
                    -
                  </button>
                  <button type= "button" className="bg-gray-300 group-hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r cursor-pointer pointer-events-auto" 
                    onClick={() => addToCart(product, index)}>
                    +
                  </button>
                </div>
                <div>
                  ${product.price} <span class="close">&#10005;</span>{howManyofThis(product._id)}
                </div> 

              </div>
              <p className="text-sm font-medium text-green-600">${product.price}</p>
            </div>
          </div>
        ))}
      </div >
      <div className='left-div'>
      <button type="button" className="but" onClick={()=>openPaymentFormWindow()}>Check Out</button>
      </div>
    </div>
  }



  // RENDERS THE CART VIEW ALONG WITH FORM FOR USER TO SUBMIT PAYMENT INFORMATION
  // UPON ORDER, WILL COLLAPSE CART VIEW AND OPEN CONFIRMATION VIEW
  // UPON RETURN, WILL COLLAPSE CART VIEW AND OPEN SHOPPING VIEW
  const cartView = (cart) => {
    return <div id="cart" className='category-section fixed collapse' style={{
      maxHeight: '800px', overflowY:
        'scroll'
    }}>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Cart({cart.length})</h2>
      <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{
        maxHeight: '800px', overflowY:
          'scroll'
      }}>
        {/* Loop Products */}
        {cart.map((product, index) => (
          <div key={index} className="group relative shadow-lg pointer-events-none" >
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
              </div>
              <p className="text-sm font-medium text-green-600">${product.price}</p>
            </div>
          </div>
        ))}
      </div >


      <div id='div_id'>
        <form id="purchase-form">
          <p>Final Total: ${cartTotal}</p>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required value={name} onChange={handleNameChange}></input>
          {formError && <span className="error">{formError}</span>}<br></br>

          <label for="email">Email:</label>
          <input type="email" id="email" name="email"  value={email} onChange={handleEmailChange} required></input>
          {EmailError && <span className="error">{EmailError}</span>}
          <br></br>

          <label for="address">Address:</label>
          <input type="text" id="address" name="address" required value={address} onChange={handleAddressChange}></input>
          {formError && <span className="error">{formError}</span>}
          <br></br>

          <label for="city">City:</label>
          <input type="text" id="city" name="city" required value={city} onChange={handleCityChange}></input>
          {formError && <span className="error">{formError}</span>}<br></br>

          <label for="state">State:</label>
          <input type="text" id="state" name="state" required value={state} onChange={handleStateChange}></input>
          {formError && <span className="error">{formError}</span>}<br></br>

          <label for="state">zipCode:</label>
          <input type="text" id="zipCode" name="zipCode" value={zipCode} onChange={handleZipCodeChange}
           required></input>
           {zipCodeError && <span className="error">{zipCodeError}</span>}
           <br></br>

          <label for="card-number">Card Number:</label>
          <input type="text" id="card-number" name="card-number" value={cardNumber} onChange={handleCardNumberChange} required></input>
          {cardNumberError && <span className="error">{cardNumberError}</span>}
          <br></br>

          <label for="expiry-date">Expiry Date:</label>
          <input type="text" id="expiry-date" name="expiry-date" required value={date} onChange={handleDateChange}></input>
          {formError && <span className="error">{formError}</span>}<br></br>

          <label for="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" required value={cvv} onChange={handleCVVChange}></input>
          {formError && <span className="error">{formError}</span>}<br></br>

          <input type="button" className='but' value="Order" onClick={() => confirmation()}></input>
          <input type="button" className='but' value="Cancel" onClick={() => closePaymentFormWindow()}></input>
        </form> 

      </div>
      <div>
        <button type="button" className="but" onClick={() => renderProducts()}>
          Return
        </button>
      </div>
    </div>
  }

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);

    // Regex to validate email format
    const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!validEmailRegex.test(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handleZipCodeChange = (event) => {
    const value = event.target.value;
    setZipCode(value);
    console.log(value);
    console.log(value.length);

    if (value.length !== 5) {
      setZipCodeError('Zip code must be exactly 5 digits');
    } else {
      setZipCodeError('');
    }
  };

  const handleCardNumberChange = (event) => {
    const { value } = event.target;
    setCardNumber(value);

    // Regex to validate credit card number format
    const validCardNumberRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

    if (!validCardNumberRegex.test(value)) {
      setCardNumberError('Invalid credit card number');
    } else {
      setCardNumberError('');
    }
  };

  
  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleAddressChange = (event) => {
    const { value } = event.target;
    setAddress(value);
  };
  const handleCityChange = (event) => {
    const { value } = event.target;
    setCity(value);
  };
  const handleStateChange = (event) => {
    const { value } = event.target;
    setState(value);
  };
  const handleCVVChange = (event) => {
    const { value } = event.target;
    setCVV(value);
  };
  const handleDateChange = (event) => {
    const { value } = event.target;
    setDate(value);
  };


 // RENDERS THE CONFIRMATION PAGE LISTING ORDER AS WELL AS PRICE/USER INFO 
 // UPON RETURN, REFRESHES THE SHOPPING PAGE AND CART
  const confirmationView = (cart) => {
    return <div id="confirmation" className='category-section fixed collapse'>
        <h3>Thank you for your purchase {name}!</h3>
        <h3>Card Number: {cardNumber}</h3>
        <h3>Shipping Address: {address}, {state}, {zipCode}</h3>
        <h3>Your order included:</h3>
        <h3 className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{
        maxHeight: '800px', overflowY:
          'scroll'
      }}>
        {cart.map((product, index) => (
          <div key={index} className="group relative shadow-lg pointer-events-none" >
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
              </div>
              <p className="text-sm font-medium text-green-600">${product.price}</p>
            </div>
          </div>
        ))}
        </h3>
        <h3>The total was: ${cartTotal}</h3>
        <h3>(Confirmation email sent to {email})</h3>
        <button type="button" className="but" onClick={() => ret()}>Return</button>
    </div>
  }


  const addToCart = (product, index) => {
    console.log("MADE IT WITH ADD BUTTON WITH THE PRODUCT" + {product})
    setCart([...cart, product]);
  };

  const removeFromCart = (product, index) => {
    console.log("MADE IT WITH REMOVE BUTTON WITH THE PRODUCT" + {product})
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem._id !== product._id);
    setCart(hardCopy);
  };

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
    console.log("HOW MANY OF THIS: " + id); 
    let hmot = cart.filter((cartItem) => cartItem._id === id);
    return hmot.length;
  }

  function handleClick(tag){
    let filtered = Products.filter(cat => cat.category === tag);
    if(tag === "all"){
      filtered = Products; 
    }
    setProductsCategory(filtered);
    console.log("Step 2: STATISTICS",Products.length,ProductsCategory.length);
  }

  function handleClickCart(a){
    //setProductsCategory(a);
    document.getElementById('div_c').style.visibility = 'collapse';
    document.getElementById('confirmation').style.visibility = 'collapse';
    document.getElementById('cusconfirmation').style.visibility = 'collapse';
    document.getElementById('creator').style.visibility = 'collapse';
    document.getElementById('author').style.visibility = 'collapse';
    document.getElementById('custom').style.visibility = 'collapse';
    document.getElementById('products').style.visibility = 'collapse';
    document.getElementById('cart').style.visibility = 'visible';
  }

  function handleClickShop(a){
    //setProductsCategory(a);
    document.getElementById('cart').style.visibility = 'collapse';
    document.getElementById('div_c').style.visibility = 'collapse';
    document.getElementById('confirmation').style.visibility = 'collapse';
    document.getElementById('cusconfirmation').style.visibility = 'collapse';
    document.getElementById('creator').style.visibility = 'collapse';
    document.getElementById('custom').style.visibility = 'collapse';
    document.getElementById('author').style.visibility = 'collapse';
    document.getElementById('products').style.visibility = 'visible';
  }

  function ret(){
    setProductsCategory(Products);
    setCart([]);
    document.getElementById('cart').style.visibility = 'collapse';
    document.getElementById('div_c').style.visibility = 'collapse';
    document.getElementById('confirmation').style.visibility = 'collapse';
    document.getElementById('cusconfirmation').style.visibility = 'collapse';
    document.getElementById('creator').style.visibility = 'collapse';
    document.getElementById('custom').style.visibility = 'collapse';
    document.getElementById('author').style.visibility = 'collapse';
    document.getElementById('products').style.visibility = 'visible';
  }

  function confirmation(){
    if (!name || !address|| !city || !state ||!cvv ||!date ||!email ||!cardNumber||!zipCode) {
      setFormError('Please fill out all fields');
      return;
    } else {
      setFormError('');
      // handle form submission
    document.getElementById('div_id').style.visibility = 'collapse';
    document.getElementById('cart').style.visibility = 'collapse';
    document.getElementById('div_c').style.visibility = 'collapse';
    document.getElementById('custom').style.visibility = 'collapse';
    document.getElementById('cusconfirmation').style.visibility = 'collapse';
    document.getElementById('confirmation').style.visibility = 'visible';
    }
  }

  function confirmationCus(){
    if (!name || !address|| !city || !state||!email ||!zipCode) {
      setFormError('Please fill out all fields');
      return;
    } else {
      setFormError('');
      // handle form submission
    document.getElementById('div_id').style.visibility = 'collapse';
    document.getElementById('cart').style.visibility = 'collapse';
    document.getElementById('div_c').style.visibility = 'collapse';
    document.getElementById('cusconfirmation').style.visibility = 'visible';
    }
  }

  function renderProducts(){
    document.getElementById('cart').style.visibility = 'collapse';
    document.getElementById('confirmation').style.visibility = 'collapse';
    document.getElementById('cusconfirmation').style.visibility = 'collapse';
    document.getElementById('div_id').style.visibility = 'collapse';
    document.getElementById('div_c').style.visibility = 'collapse';
    document.getElementById('custom').style.visibility = 'collapse';
    document.getElementById('author').style.visibility = 'collapse';
    document.getElementById('products').style.visibility = 'visible';
  }

  function openPaymentFormWindow() {
    document.getElementById('products').style.visibility = 'collapse';
    document.getElementById('cusconfirmation').style.visibility = 'collapse';
    document.getElementById('div_c').style.visibility = 'collapse'; 
    document.getElementById('custom').style.visibility = 'collapse';
    document.getElementById('cart').style.visibility = 'visible';
    if(cart.length != 0){
      document.getElementById('div_id').style.visibility = 'visible';
    }
  }

  function openCustomFromWindow(){
    document.getElementById('products').style.visibility = 'collapse';
    document.getElementById('cusconfirmation').style.visibility = 'collapse'; 
    document.getElementById('cart').style.visibility = 'collapse';
    document.getElementById('div_id').style.visibility = 'collapse';
    document.getElementById('creator').style.visibility = 'collapse';
    document.getElementById('custom').style.visibility = 'visible';
    document.getElementById('div_c').style.visibility = 'visible';
  }

  function openCreatorWindow(){
    document.getElementById('products').style.visibility = 'collapse';
    document.getElementById('cusconfirmation').style.visibility = 'collapse'; 
    document.getElementById('cart').style.visibility = 'collapse';
    document.getElementById('author').style.visibility = 'collapse';
    document.getElementById('div_id').style.visibility = 'collapse';
    document.getElementById('custom').style.visibility = 'collapse';
    document.getElementById('div_c').style.visibility = 'collapse';
    document.getElementById('creator').style.visibility = 'visible';
  }

  function openAuthorWindow(){
    document.getElementById('products').style.visibility = 'collapse';
    document.getElementById('cusconfirmation').style.visibility = 'collapse'; 
    document.getElementById('cart').style.visibility = 'collapse';
    document.getElementById('div_id').style.visibility = 'collapse';
    document.getElementById('custom').style.visibility = 'collapse';
    document.getElementById('div_c').style.visibility = 'collapse';
    document.getElementById('creator').style.visibility = 'collapse';
    document.getElementById('author').style.visibility = 'visible';
  }

function closePaymentFormWindow() {
  document.getElementById('div_id').style.visibility = 'hidden';
}

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log("Step 6 : in handleChange, Target Value :", e.target.value, " Query Value :", query);
    const results = Products.filter(eachProduct => {
      if (e.target.value === "") return ProductsCategory;
      return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setProductsCategory(results);
  }

   // RENDERS THE CUSTOM ORDER PAGE 
 // UPON RETURN, REFRESHES THE SHOPPING PAGE AND CART
 const customOrderView = (showForm) => {
  return <div id="custom" className='category-section fixed collapse'>

      <div id = "div_c">
        <form id="custom-form">
          <h3 id="custit">Custom Order Form</h3>
          <div style={{ display: 'inline-block' }}>
          <div>
              <label for="item"> Item </label>
              <div>
                <div>
                  <label>
                    <input type="radio" name="item" id="item" required></input>
                    Ornament
                    <span></span>
                  </label>
                </div>
  
                <div>
                  <label>
                    <input type="radio" name="item" id="item"></input>
                    Book Cover
                    <span></span>
                  </label>
                </div>
  
                <div>
                  <label>
                    <input type="radio" name="item" id="item"></input>
                    Animal
                    <span></span>
                  </label>
                </div>
  
                <div>
                  <label>
                    <input type="radio" name="item" id="item"></input>
                    Coaster
                    <span></span>
                  </label>
                </div>
              </div>
          </div>

     
  
          <div>
              <label for="size"> Size </label>
              <div>
                <div>
                  <label>
                    <input type="radio" name="size" id="size" required></input>
                    micro (1-2in)
                    <span></span>
                  </label>
                </div>
  
                <div>
                  <label>
                    <input type="radio" name="size" id="size"></input>
                    small (2-3in)
                    <span></span>
                  </label>
                </div>
  
                <div>
                  <label>
                    <input type="radio" name="size" id="size"></input>
                    regular (4-7in)
                    <span></span>
                  </label>
                </div>
  
                <div>
                  <label>
                    <input type="radio" name="size" id="size"></input>
                    large (8-12in)
                    <span></span>
                  </label>
                </div>
              </div>
          </div>
  
          <div>
              <label for="message" id="spec">Specifications (inlcude colors): </label>
              <textarea
                  rows="6"
                  name="message"
                  id="message"
                  class="formbold-form-input"
              ></textarea>
          </div>
          </div>

<div style={{ display: 'inline-block' }}>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required value={name} onChange={handleNameChange}></input>
          {formError && <span className="error">{formError}</span>}<br></br>

          <label for="email">Email:</label>
          <input type="email" id="email" name="email"  value={email} onChange={handleEmailChange} required></input>
          {EmailError && <span className="error">{EmailError}</span>}
          <br></br>

          <label for="address">Address:</label>
          <input type="text" id="address" name="address" required value={address} onChange={handleAddressChange}></input>
          {formError && <span className="error">{formError}</span>}
          <br></br>

          <label for="city">City:</label>
          <input type="text" id="city" name="city" required value={city} onChange={handleCityChange}></input>
          {formError && <span className="error">{formError}</span>}<br></br>

          <label for="state">State:</label>
          <input type="text" id="state" name="state" required value={state} onChange={handleStateChange}></input>
          {formError && <span className="error">{formError}</span>}<br></br>

          <label for="state">zipCode:</label>
          <input type="text" id="zipCode" name="zipCode" value={zipCode} onChange={handleZipCodeChange}
           required></input>
           {zipCodeError && <span className="error">{zipCodeError}</span>}
           <br></br>
          </div>

<div style={{textAlign:'center'}}>
          <input type="button" className='but' value="Get estimate" onClick={() => confirmationCus()}></input>
          <input type="button" className='but' value="Cancel" onClick={() => closePaymentFormWindow()}></input>
         </div>

        </form> 
        </div>



      <div>
        <button type="button" className="but" onClick={() => handleClickShop()}>
          Return
        </button>
      </div>
  </div>  
}


const cusConfirmationView = (cart) => {
  return <div id="cusconfirmation" className='category-section fixed collapse'>
      <h3>Thank you for your custom order {name}!</h3>
      <h3>Shipping Address: {address}, {state}, {zipCode}</h3>
     
   
      <h3>Your estimate will be sent to you through email!</h3>
      <h3>(Confirmation email sent to {email})</h3>
      <button type="button" className="but" onClick={() => ret()}>Return</button>
  </div>
}

//creator view
const creatorView = (showCreator) => {
  return <div id="creator" className='category-section fixed collapse'>
      <div class="album py-5 bg-light">
    <div class="container" id="cre">
      <img class = "imgf" id="selfie" src={selfie} alt="picture of creator" style={{ width: 600, height: 650 }}></img>
      <span id="span_cre">
        <h2>about me...</h2>
        <p>hi, my name is olivia garcia!</p>
        <p>i am from illinois, but i currently attend school at iowa state university. in school, i study 
          women and gender studies, environmental studies, and sustainability. last summer, i 
          picked up a new passion in crocheting. i love making cute little animals for my friends, 
          designing new clothing, and the crocheting process in general. i'm glad to be able to express my 
          creativity in such a fun form!
        </p>
        <p>
          beyond my work, i love spending time with my family and friends, traveling, 
          hammocking on campus, and listening to my favorite artists, like bad bunny! 
        </p>
        <p>thank you for visiting my page and please reach out if you have any questions! :)</p>
        <p>phone number: 728-382-3283<br></br>email: ogcrochet@gmail.com</p>
      </span>
    </div>
  </div>
      <button type="button" className="but" onClick={() => handleClickShop()}>Return</button>
  </div>
}

//author page
const authorView = (showAuthor) => {
  return <div id="author" className='category-section fixed collapse'>
     <p>Authors: Jade Seiler & Saiyara Iftekharuzzaman</p>
     <p>jcseiler@iastate.edu & saiyara@iastate.edu</p>
     <p>Class: COM S 319</p>
     <p>Date: May 6th, 2023</p>
     <p>This website's purpose is to supply a platform to sell and share crochet creations</p>
 
      <button type="button" className="but" onClick={() => handleClickShop()}>Return</button>
  </div>
}

  return (
    <div className="flex fixed flex-row">
      <div className="h-screen bg-red-300 p-3 xl:basis-1/5" style={{ minWidth: '65%' }}>
        <img className="w-full" src={logo} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
             <button type="button"  className="but"  onClick={() => openAuthorWindow()}>
            Website Authors
            </button>
          <div className="py-10">
            {(Categories) ? <p className='text-white'>Tags : </p> : ''}
            {
              Categories.map(tag => <button key={tag} className="inline-block bg-white rounded-full px-3 py-1
  text-sm font-semibold text-black-700 mr-2 mt-2"
                onClick={() => { handleClick(tag) }}>{tag}</button>)
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
{
          <div>
            <button type="button" className="but"
              onClick={() => handleClickCart(cart)}>
              cart
            </button>
            <button type="button" className="but"
              onClick={() => handleClickShop(Products)}>
              shop
            </button>
            <button type="button"  className="but"  onClick={() => openCustomFromWindow()}>
            custom order
            </button>
            <button type="button"  className="but"  onClick={() => openCreatorWindow()} >
            owner
            </button>
          </div>  }

        </div>
      </div>
      <div id='display' className="ml-5 p-10 xl:basis-4/5">
        {customOrderView(showForm)}
        {render_products(ProductsCategory)}
        {cartView(cart)}
        {confirmationView(cart)}
        {cusConfirmationView(cart)}
        {creatorView(showCreator)}
        {authorView(showAuthor)}
     
      </div>

</div>
  );
}


export default App;
