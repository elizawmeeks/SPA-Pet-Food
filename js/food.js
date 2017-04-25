console.log("hihi");
// Adding data request variable
var dataRequest = new XMLHttpRequest();

// Event listeners for loading
dataRequest.addEventListener("load", dataRequestComplete);
dataRequest.addEventListener("error", dataRequestFailed);

// Functions tied directly to event listeners
function dataRequestComplete(event){
	console.log("The file has loaded")
	var data = JSON.parse(event.target.responseText);
	console.log("The data is: ", data);
	showName(data);
}

function dataRequestFailed(event){
	console.log("Oops, an error occurred while getting the data");
}

// Function referenced inside dataRequestComplete, I tried more reasonable variable names but my brain followed taco ingredients better. Please forgive me, but visualizing this dataset like a taco was much easier.

// Brand Name
function showName(taco){
	var write = document.getElementById("stickItHere");
	var brandData = "";

	for (lettuce in taco){
		for (cheese in taco[lettuce]){
			var brand = taco[lettuce][cheese].name;
			var another = taco[lettuce][cheese].types;
			for (beans in taco[lettuce][cheese].types){
				var type = taco[lettuce][cheese].types[beans].type;
				for (salsa in taco[lettuce][cheese].types[beans].volumes){
					var volume = taco[lettuce][cheese].types[beans].volumes[salsa].name;
					var price = taco[lettuce][cheese].types[beans].volumes[salsa].price;
					brandData += `<div class="col s1"></div>
								<div class="col s5">
									<div class="card grey lighten-5">
										<div class="card-content center-align">
											<span class="card-title">${brand}</span>
											<p>Type: ${type}</p>
											<p>Volume: ${volume}</p>
											<p>Price: $${price}</p>
										</div>
									</div>
								</div>`
				}
			}
		}
	}

	write.innerHTML += brandData;
}

dataRequest.open("GET", "dogfood.json");
dataRequest.send();