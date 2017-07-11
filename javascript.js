//Global Variables
var enterButton = document.getElementById("enter-button");
var markAsReadButton = document.getElementById("mark-as-read-button");
var deleteButton = document.getElementById("delete-button");
var mainContentBox = document.getElementById("main-content");
var websiteTitle = document.getElementById("website-title");
var websiteUrl = document.getElementById("website-url")

//Objects
var linkBox = {
  topHTML: '</h2><h3><a href="',
  bottomHtml: '</a></h3><div class="read-delete-links"><p class="read-link"><a href="#" class="read-target">Read</a></p><p><a href="#" class="delete-target">Delete</a></p></div>',
  buildIt: function(title, url){
    var boxHTML = document.createElement("article");
    boxHTML.className = "website-box";
    boxHTML.innerHTML = '<h2>' + title + this.topHTML +  url + '">' +  url + this.bottomHtml;

    mainContentBox.insertAdjacentHTML("afterbegin", boxHTML.outerHTML);
  }
}

function isValidURL(url) {
  var regEx=new RegExp("^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$");
  return regEx.test(url);
}

function websiteBoxLinks(e) {
  var targetBox = e.target.closest('article');
  if (e.target.className === "delete-target"){
    targetBox.parentNode.removeChild(targetBox);
  }
  if (e.target.parentNode.className === "read-link") {
    targetBox.classList.toggle('read');
  }
  e.stopPropagation();
}
//Event Listeners
enterButton.addEventListener("click", function(e){
  e.preventDefault();
  linkBox.buildIt(websiteTitle.value, websiteUrl.value);
});

websiteUrl.addEventListener ("blur", function(){
  var isValid = isValidURL(websiteUrl.value);
  if (isValid) {
    enterButton.disabled = false;
  } else {
    enterButton.disabled = true;
  }
});

websiteTitle.addEventListener ("input", function(){
  if (websiteTitle.value === "") {
    enterButton.disabled = true;
  } else {
    enterButton.disabled = false;
  }
});

mainContentBox.addEventListener("click", websiteBoxLinks, false);
