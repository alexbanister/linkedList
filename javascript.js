//WHAT WE NEED TO ACCOMPLISH.
  //We need two inputs:
    //One for the title of the bookmark.
    //One for the URL that the  bookmark should link to.
  //One button for creating the bookmark and adding it to the page
  //A section for all of the created bookmarks; each bookmark should display:
    //The title of the bookmark
    //The URL of the bookmark (this should be clickable and link to the URL)
    //A button to "Mark as read"
    //A button to "Remove" the bookmark


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
  bottomHtml: '</a></h3><div class="read-delete-links"><p class="read-link"><a href="">Read</a></p><p><a href="">Delete</a></p></div>',
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

//Event Listeners
enterButton.addEventListener("click", function(e){
  e.preventDefault();
  linkBox.buildIt(websiteTitle.value, websiteUrl.value);
});

websiteUrl.addEventListener ("blur", function(){
  isValid = isValidURL(websiteUrl.value);
  if (isValid) {
    console.log("It's good");
  }
  else {
    console.log("BAD!!!!!!!!");
  }
});

websiteTitle.addEventListener ("input", function(){
  // websiteUrl: input validation;
});

//Functions


function websiteTitle() {
  // input:
}
function enterButton() {
  // input:
}
