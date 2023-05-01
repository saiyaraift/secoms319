import { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);

  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);

  const [price, setPrice] = useState(0); 
  const [updatedPrice, setUpdatedPrice] = useState(price); 
  const [idToUpdate, setIdToUpdate] = useState(0); 
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

  function updateOneProduct(updateid, updatePrice) {
    console.log("Product to update :", updateid);
    fetch("http://localhost:4000/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: updateid, price: updatePrice}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update a product completed : ", updateid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
      setViewer3(!viewer3);
  }

  function getOneProductToUpdate(id) {
    setIdToUpdate(id); 
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
      setViewer3(!viewer3);
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  function handleUpdateClick(event){
    setUpdatedPrice(price); 
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

      <div id="read" className='category-section fixed collapse flex flex-row'>
        <div style={{
        maxHeight: '300px', overflowY:
          'scroll'
      }} >
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => getAllProducts()}>Show All Products</button>
        {viewer1 && <div>Available Products: {showAllItems}</div>}
        </div>
        <div>
        <h3 class="font-bold">Search by Id:</h3>
        <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)} />
        {viewer2 && <div>Product: {showOneItem}</div>}
        </div>
        <hr></hr>
      </div>

      <div id="update" className='category-section fixed collapse'>
        <h2 class="font-bold">Update One Product Price by Id:</h2>
        <h3 class="font-bold">Enter Id Here</h3>
        <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProductToUpdate(e.target.value)} />
        {viewer3 && <div>{showOneItem}</div>}


        <h3 class="font-bold">Enter New Price:</h3>
        <input type="number" id="price" name="price" placeholder="id" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={(e) => setUpdatedPrice(price)}>Update</button>
        <br></br>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={(e) => updateOneProduct(idToUpdate, price)}>Submit Update</button>
      </div>


      <div id="create" className='category-section fixed visible' action=''>
        <h3 class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Add a new product :</h3>
        <form class="w-full max-w-lg">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                ID
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Title
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Description
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} />
            </div>
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Image
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                Price
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Category
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="category?" name="category" value={addNewProduct.category} onChange={handleChange} />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Rate
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" placeholder="rate?" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Count
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" placeholder="count?" name="count" value={addNewProduct.rating.count} onChange={handleChange} />
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleOnSubmit}>Submit</button>
          </div>
        </form>
      </div>

      <div id="delete" className='category-section fixed collapse'>
        <h3 class="font-bold">Delete One Product:</h3>
        <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
          onChange={(e) => setChecked4(!checked4)} />
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={() => getOneByOneProductNext()}>Next</button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
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
        <h2 class="font-bold">SE/COMS 319 Construction of User Interfaces, Spring 2023</h2>
        <h3 class="font-bold">April 30, 2023</h3>
        <h2 class="font-bold">Web Page Creators:</h2>
        <p>Jade Seiler, jcseiler@iastate.edu</p>
        <p>Saiyara Iftekharuzzaman, saiyara@iastate.edu</p>
        <h2 class="font-bold">Project Description:</h2>
        <p>
          For this project, we created a MERN application using the fake store catalog given to use as per the assignment specifications. In this app, users can create(post)new data to add to the database, read(get) all the available products as well as search by product ids, update(put) certain elements of a product in the database, and delete(delete) a product given an id property.
        </p>
      </div>

    </div>
  );



} // App end

export default App;
