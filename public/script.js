document.querySelector("#Copyright").innerText = (new Date()).getFullYear();

function hide_loading0(){
  var elements = document.getElementsByClassName("load_div");
    if (elements.length > 0) {
      elements[0].style.zIndex = "-11";
      elements[0].style.opacity = "0.8";
      elements[0].style.transition = "1s";
    }
}
function hide_loading(){
  var elements = document.getElementsByClassName("load_div");
    if (elements.length > 0) {
      elements[0].style.zIndex = "-11";
      elements[0].style.opacity = "0.8";
      // elements[0].style.transition = "0.5s";
    }
}
function hide_loading2(){
  var elements = document.getElementsByClassName("load_div");
    if (elements.length > 0) {
      elements[0].style.zIndex = "-11";
      elements[0].style.transition = "1.5s";
    }
}

