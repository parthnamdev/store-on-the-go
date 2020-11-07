const searchInput = document.querySelector(".search-location");
const suggestionPanel = document.querySelector(".suggestions");
let cities;
fetch('./cities.json')
.then(result => result.json())
.then((result) => {
  cities = result;
})
.catch(err => {
  console.log(err);
})
.then(() => {
  searchInput.addEventListener("keyup", () => {
    const input = searchInput.value.toLowerCase();
    suggestionPanel.innerHTML = '';
    const suggestions = cities.filter((city) => {
        return city.name.toLowerCase().startsWith(input);
    });
    suggestions.forEach((suggested) => {
        const div = document.createElement("div");
        div.innerHTML = suggested.name + "," + suggested.state;
        div.setAttribute("onClick", "selectCity(this.innerHTML)");
        // div.setAttribute("id", suggested.name+"_"+suggested.state);
        suggestionPanel.appendChild(div);
    });
    if(input == "") {
        suggestionPanel.innerHTML = "";
    }
});
});

function selectCity(city) {
    document.querySelector(".search-location").value = city;
    suggestionPanel.innerHTML = "";
}
function autoFillSuggested(city) {
    selectCity(city);
}