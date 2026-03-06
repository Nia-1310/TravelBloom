const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

function search() {
    const inputWord = document.getElementById("searchInput").value.toLowerCase().trim();
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = ``;
    if (inputWord === "beach" || inputWord === "beaches") {
        console.log("beach");
        fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            for(const beach of data.beaches){
                display(beach.name,beach.imageUrl,beach.description);
            }
        })
    }
    else if (inputWord === "temple" || inputWord === "temples") {
        console.log("temple");
        fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            for(const temple of data.temples){
                display(temple.name,temple.imageUrl,temple.description);
            }
        })
    }
    else {
        fetch("travel_recommendation_api.json")
            .then(response => response.json())
            .then(data => {
                const country = data.countries.find(item => item.name.toLowerCase() === inputWord);
                if (country) {
                    country.cities.forEach(city => {
                        display(city.name,city.imageUrl,city.description);
                    });
                }
                else {
                    for(const country of data.countries) {
                        const city = country.cities.find(city => city.name.split(",")[0].toLowerCase() === inputWord);     
                        if(city){
                            display(city.name,city.imageUrl,city.description);
                        }
                    }
                }
            })
    }
}

function display(name, imageUrl, description) {
    const recommendations = document.getElementById('recommendations');
    console.log(name,imageUrl,description);
    recommendations.innerHTML += `
    <div id="rec">
            <img src="${imageUrl}" id="img">
            <div id="descrip">
                <h2> ${name} </h2>
                <p>${description}</p>
                <button>Visit</button>
            </div>
        </div>
    `
}



function clearSearch() {
    document.getElementById("searchInput").value = "";
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = ``;
}
searchBtn.addEventListener("click", search);
clearBtn.addEventListener("click", clearSearch)
