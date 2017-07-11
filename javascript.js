// If the user omits the title or the URL, the application should not create the link and should instead display an error.
//   only disables button, no error displayed yet
//
// The application should be responsive and work equally well on desktop and mobile.
//   fix mobile landscape display
//
// The application should be able to keep count of the total number of links currently on the page.
//   add querySelectorAll('article').length and display it
//
// The application should be able to keep count of the total number of read and unread links currently on the page.
//   add querySelectorAll('read').length and display it
//   add above article.length - read.length and display it
//
// Add a “Clear Read Bookmarks” button which clears all the read bookmarks when clicked.

//Global Variables
var enterButton = document.getElementById("enter-button");
var markAsReadButton = document.getElementById("mark-as-read-button");
var deleteButton = document.getElementById("delete-button");
var mainContentBox = document.getElementById("main-content");
var websiteTitle = document.getElementById("website-title");
var websiteUrl = document.getElementById("website-url")

//Objects
var linkBox = {
  topHTML: '</h2><h3><a href="http://',
  bottomHtml: '</a></h3><div class="read-delete-links"><p class="read-link"><a href="#" class="read-target">Read</a></p><p><a href="#" class="delete-target">Delete</a></p></div>',
  buildIt: function(title, url){
    url = cleanHTTP(url);
    var boxHTML = document.createElement("article");
    boxHTML.className = "website-box";
    boxHTML.innerHTML = '<h2>' + title + this.topHTML +  url + '" target="_new">' +  url + this.bottomHtml;

    mainContentBox.insertAdjacentHTML("afterbegin", boxHTML.outerHTML);
  }
}

//Event Listeners
enterButton.addEventListener("click", function(e){
  e.preventDefault();
  linkBox.buildIt(websiteTitle.value, websiteUrl.value);
});

websiteUrl.addEventListener ("input", validateForm);

websiteTitle.addEventListener ("input", validateForm);

mainContentBox.addEventListener("click", websiteBoxLinks, false);

//Functions
function isValidURL(url) {
  var regEx=new RegExp("^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$");
  return regEx.test(url);
}

function cleanHTTP(url) {
  if (!url.match(/^[a-zA-Z]+:\/\//)) {
    return url;
  } else {
    var urlSplit = url.split("//");
    var urlArray = urlSplit.slice(1);
    return urlArray.toString();
  }
}

function validateForm() {
  if (isValidURL(websiteUrl.value) && websiteTitle.value !== "") {
    enterButton.disabled = false;
  } else {
    enterButton.disabled = true;
  }
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
