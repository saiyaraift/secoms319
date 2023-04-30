import { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);

  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);

  const [viewer3, setViewer3] = useState(false);


  const [viewer4, setViewer4] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);



  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(!viewer1);
  }

  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
        });
      setViewer2(!viewer2);
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  // function updateProduct(id){
  //   console.log(id);
  //   if (id >= 1 && id <= 20) {
  //     fetch("http://localhost:4000/" + id)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Show one product :", id);
  //         console.log(data);
  //         const dataArr = [];
  //         dataArr.push(data);
  //         setOneProduct(dataArr);
  //       });
  //     setViewer3(!viewer3);
  //   } else {
  //     console.log("Wrong number of Product id.");
  //   }
  //   const updatePrice = document.getElementById("price").value; 
  //   console.log(id, updatePrice); 
  //   fetch('http://localhost:4000/update/' + id, {
  //     method: "PUT", 
  //     headers: {"content-type":"application/json"}, 
  //     body: JSON.stringify({
  //       price: updatePrice
  //     }), 
  //   }).then((response) => {
  //     if(response.ok){
  //       console.log("update fetch works"); 
  //       return response.json(); 
  //     }
  //     else {
  //       throw new Error("failed to updated price"); 
  //     }
  //   }).then((data) => {
  //     console.log(data); 
  //     setOneProduct([data]); 
  //     setViewer3(!viewer3); 
  //   }).catch((error) => console.log(error)); 
  // }

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    } else if (evt.target.name === "rate") {
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({
        ...addNewProduct,
        rating: { rate: temp, count: value },
      });
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }

  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
  }

  const showAllItems = product.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [checked4]);

  function renderCreate() {
    console.log("made it to render create");
    document.getElementById('read').style.visibility = "collapse";
    document.getElementById('delete').style.visibility = "collapse";
    document.getElementById('update').style.visibility = "collapse";
    document.getElementById('credits').style.visibility = 'collapse';
    document.getElementById('create').style.visibility = 'visible';
  }

  function renderRead() {
    console.log("made it to render read");
    console.log(document.getElementById('read'));
    document.getElementById('create').style.visibility = 'collapse';
    document.getElementById('delete').style.visibility = "collapse";
    document.getElementById('credits').style.visibility = 'collapse';
    document.getElementById('update').style.visibility = "collapse";
    document.getElementById('read').style.visibility = "visible";
  }

  function renderUpdate() {
    document.getElementById('read').style.visibility = 'collapse';
    document.getElementById('create').style.visibility = 'collapse'; document.getElementById('credits').style.visibility = 'collapse';
    document.getElementById('delete').style.visibility = "collapse";
    document.getElementById('update').style.visibility = "visible";
  }

  function renderDelete() {
    document.getElementById('read').style.visibility = 'collapse';
    document.getElementById('create').style.visibility = 'collapse'; document.getElementById('credits').style.visibility = 'collapse';
    document.getElementById('update').style.visibility = "collapse";
    document.getElementById('delete').style.visibility = "visible";
  }

  function renderCredits() {
    document.getElementById('read').style.visibility = 'collapse';
    document.getElementById('create').style.visibility = 'collapse';
    document.getElementById('delete').style.visibility = "collapse";
    document.getElementById('update').style.visibility = "collapse";
    document.getElementById('credits').style.visibility = 'visible';
  }

  return (
    <div>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Catalog of Products</span>
        </div>
      </nav>
      <nav class="bg-gray-50 dark:bg-gray-700">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">
          <div class="flex items-center">
            <ul class="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={renderCreate}>Create</button>
              </li>
              <li>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={renderRead}>Read</button>
              </li>
              <li>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={renderUpdate}>Update</button>
              </li>
              <li>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={renderDelete}>Delete</button>
              </li>
              <li>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={renderCredits}>Credits</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="read" className='category-section fixed collapse'>
        <button onClick={() => getAllProducts()}>Show All users</button>
        <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)} />
        <h3>Show all available Products:</h3>
        {viewer1 && <div>Products {showAllItems}</div>}
        <hr></hr>
        <h3>Show one Product by Id:</h3>
        {viewer2 && <div>Product: {showOneItem}</div>}
      </div>

      <div id="update" className='category-section fixed collapse'>
        <h3>Update One Product Price by Id:</h3>
        {/* <h3>Update One Product Price by Id:</h3>
      <input type="text" id="message" name="message" placeholder="id" onChange={(e) => updateProduct(e.target.value)}/>
      {viewer3 && <div>Product: {showOneItem}</div>}
      <h5>Update Price To:</h5>
      <input type="text" id="price" name="message" placeholder="price"/>
      <hr></hr>  */}
      </div>


      <div id="create" className='category-section fixed collapse'>
        <h3>Add a new product :</h3>
        <form action="">
          <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
          <input type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} />
          <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
          <input type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} />
          <input type="text" placeholder="category?" name="category" value={addNewProduct.category} onChange={handleChange} />
          <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} />
          <input type="number" placeholder="rate?" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
          <input type="number" placeholder="count?" name="count" value={addNewProduct.rating.count} onChange={handleChange} />
          <button type="submit" onClick={handleOnSubmit}>
            submit
          </button>
        </form>
      </div>

      <div id="delete" className='category-section fixed collapse'>
        <h3>Delete one product:</h3>
        <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
          onChange={(e) => setChecked4(!checked4)} />
        <button onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button onClick={() => getOneByOneProductNext()}>Next</button>
        <button onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
        {checked4 && (
          <div key={product[index]._id}>
            <img src={product[index].image} width={30} /> <br />
            Id:{product[index]._id} <br />
            Title: {product[index].title} <br />
            Category: {product[index].category} <br />
            Price: {product[index].price} <br />
            Rate :{product[index].rating.rate} and Count:
            {product[index].rating.count} <br />
          </div>
        )}
      </div>

      <div id="credits" className='category-section fixed collapse'>
        <h1>Credits view</h1>
      </div>

    </div>
  );



} // App end

export default App;
