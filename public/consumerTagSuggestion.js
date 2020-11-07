const city = document.querySelector(".explorecity").value;
const searchInput = document.querySelector(".search-tag");
const suggestionPanel = document.querySelector(".suggestions");

let typingTimer;
let doneTypingInterval = 700; 

searchInput.addEventListener("keyup", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
})

function doneTyping () {
    if(searchInput.value == "") {
        suggestionPanel.innerHTML = "";
    } else {
        suggestionPanel.innerHTML = "";
        fetch('../suggestion/'+city+'/'+searchInput.value)
        .then(result => result.json())
        .then(result => {
        // console.log(result);
        result.forEach((suggested) => {
            const div = document.createElement("div");
            div.innerHTML = suggested;
            div.setAttribute("onClick", "selectTag(this.innerHTML)");
            // div.setAttribute("id", suggested.name+"_"+suggested.state);
            suggestionPanel.appendChild(div);
        });
    
        })
        .catch(err => {
            console.log(err);
        })
    }
}

function selectTag(tag) {
    document.querySelector(".search-tag").value = tag;
    suggestionPanel.innerHTML = "";
}
function autoFillSuggested(city) {
    selectTag(tag);
}