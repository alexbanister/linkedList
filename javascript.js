//Global Variables
var enterButton = document.getElementById("enter-button");
var mainContentBox = document.getElementById("main-content");
var websiteTitle = document.getElementById("website-title");
var websiteUrl = document.getElementById("website-url");
var clearButton = document.getElementById("clear-button");

//Objects
var linkBox = {
  topHTML: '</h2><h3><a href="http://',
  bottomHtml: '</a></h3><div class="read-delete-links"><p class="read-link"><a href="#" class="read-target">Mark Read</a></p><p><a href="#" class="delete-target">Delete</a></p></div>',
  buildIt: function(title, url){
    url = cleanHTTP(url);
    var boxHTML = document.createElement("article");
    boxHTML.className = "website-box";
    boxHTML.innerHTML = '<h2>' + title + this.topHTML +  url + '" target="_new">' +  url + this.bottomHtml;

    mainContentBox.insertAdjacentHTML("afterbegin", boxHTML.outerHTML);
  }
}

//Event Listeners
clearButton.addEventListener("click", function(e) {
  clearReadLinks();
  totalNumBoxLinks();
});

enterButton.addEventListener("click", function(e){
  e.preventDefault();
  linkBox.buildIt(websiteTitle.value, websiteUrl.value);
  websiteTitle.value = '';
  websiteUrl.value = '';
  enterButton.disabled = true;
  websiteTitle.focus();
  totalNumBoxLinks();
});

websiteUrl.addEventListener ("input", validateForm);

websiteTitle.addEventListener ("input", validateForm);

mainContentBox.addEventListener("click", function(e) {
  websiteBoxLinks(e);
  totalNumBoxLinks();
});

//Functions
function clearReadLinks() {
  var readLinksArray = document.querySelectorAll('.read');
  for (var i = 0; i < readLinksArray.length; i++){
    readLinksArray[i].parentNode.removeChild(readLinksArray[i]);
  }
}

function totalNumBoxLinks() {
  var boxLinksArray = document.querySelectorAll('.website-box');
  var readLinksArray = document.querySelectorAll('.read');

  var totalNumBoxLinks = document.querySelector("#total-links");
  totalNumBoxLinks.innerText = boxLinksArray.length;

  var totalReadLinks = document.querySelector("#read-links");
  totalReadLinks.innerText = readLinksArray.length;

  var totalUnreadLinks = document.querySelector("#unread-links");
  totalUnreadLinks.innerText = boxLinksArray.length - readLinksArray.length;
}

function isValidURL(url) {
  var regEx=new RegExp("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$");
  return regEx.test(url);
}

function cleanHTTP(url) {
  if (!url.match(/^[a-zA-Z]+:\/\//)) {
    return url;
  } else {
    return url.split("//").slice(1).join();
  }
}

function controlErrorState(input, message, error) {
  if (error) {
    input.classList.add('input-error');
    message.style.visibility = "visible";
  } else {
    input.classList.remove('input-error');
    message.style.visibility = "hidden";
  }
}

function validateForm() {
  var titleError = document.getElementById('title-error');
  var urlError = document.getElementById('url-error');

  if(!isValidURL(websiteUrl.value)){
    controlErrorState(websiteUrl, urlError, true);
  } else {
    controlErrorState(websiteUrl, urlError, false);
  }

  if(websiteTitle.value === ""){
    controlErrorState(websiteTitle, titleError, true);
  } else {
    controlErrorState(websiteTitle, titleError, false);
  }

  if (isValidURL(websiteUrl.value) && websiteTitle.value !== "") {
    enterButton.disabled = false;
    controlErrorState(websiteTitle, titleError, false);
    controlErrorState(websiteUrl, urlError, false);
  }
}

function websiteBoxLinks(e) {
  var targetBox = e.target.closest('article');
  if (e.target.className === "delete-target"){
    targetBox.parentNode.removeChild(targetBox);
  }

  if (e.target.parentNode.className === "read-link") {
    targetBox.classList.toggle('read');
    if (e.target.innerText === 'Mark Read') {
      e.target.innerText = 'Mark Unread';
    } else {
      e.target.innerText = 'Mark Read';
    }
  }
}
