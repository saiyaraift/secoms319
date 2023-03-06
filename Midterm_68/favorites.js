fetch("data.json")
    .then(response => response.json())
    .then(data => dataToHTML(data));

function dataToHTML(data) {
    let mainContainer = document.getElementById("favoriteList");
    console.log(mainContainer);
    for (let i = 0; i < data.products.length; i++) {
        if (i % 3 == 0) {
            let name = data.products[i].name;
            let description = data.products[i].description;
            let price = data.products[i].price;
            let img = data.products[i].img;
            console.log(name + " " + description + " " + price);

            let box = document.createElement("div");
            console.log(box);
            box.innerHTML = `<div class="col">
        <div class="card shadow-sm">
          <img src="${img}" alt="crochet product>
            <div class="card-body">
              <h3>${name}</h3>
            <p class="card-text">${description}</p>
            <p class="card-text">Price: ${price}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">Favorite</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Buy</button>
              </div>
              <small class="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>`;
            console.log(box);
            mainContainer.appendChild(box);
        }
    }
}

