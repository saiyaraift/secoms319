fetch("data.json")
    .then(response => response.json())
    .then(data => dataToHTML(data));

function dataToHTML(data) {
    let mainContainer = document.getElementById("favoriteList");
    console.log(mainContainer);
    for (let i = 0; i < data.upcoming.length; i++) {
            let name = data.upcoming[i].name;
            let description = data.upcoming[i].description;
            let price = data.upcoming[i].price;
            let img = data.upcoming[i].img;
            console.log(name + " " + description + " " + price);

            let box = document.createElement("div");
            console.log(box);
            box.innerHTML = `<div class="col">
        <div class="card shadow-sm">
          <img src="${img}" alt="crochet product>
            <div class="card-body">
            <h3>${name}</h3>
            <h5>Price: ${price}</h5>
            <p class="card-text">${description}</p>
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

