
// $(document).ready(function() {

// let divEl = document.getElementById('mainDiv')
// console.log("divEl", divEl)

let bookMarkTabs = [];
let bookMarklist = [];

chrome.bookmarks.getSubTree('2',function(arr){
  for(let i = 0 ; i<arr[0].children.length; i++){
    //console.log(arr[0].children[i].url);
     bookMarklist.push(arr[0].children[i].url);
  }
});

var tabs2 = chrome.tabs.query({'active': false }, function (tabs2) {
  for(let j = 0; j < tabs2.length; j++){
    let obj = {};
    obj.title = tabs2[j].title;
    obj.url = tabs2[j].url;

    bookMarkTabs.push(obj)


  }
});

// let addAllButton = document.createElement('button');
// let divEl = document.getElementById('mainDiv')
// console.log("divEl", divEl)
// divEl.appendChild(addAllButton)

// addAllButton.className = 'addAll';
// addAllButton.innerHTML = "Add All";
// console.log(addAllButton);

// addAllButton.addEventListener('click', function(event){
//   console.log("please do something");
//   for(let k = 0; k < bookMarkTabs.length; k++){
//     chrome.bookmarks.create({'title': bookMarkTabs[k].title, 'url': bookMarkTabs[k].url})
//   }
// }, false);


//console.log(bookMarkTabs);



// let addAllButton = document.getElementById('addAll');
// addAllButton.addEventListener('click', function(event){
//   chrome.bookmarks.create({'title': tabs[i].title, 'url': tabs[i].url});
//   event.target.style.visibility = 'hidden';
// }, false);


var allTheTabs = chrome.tabs.query({'active': false }, function (tabs) {
  let list = document.getElementById('tabsList');
  for(let i = 0; i <tabs.length; i++){
    let bookMarkItem = {};
    bookMarkItem.url = tabs[i].url;
    bookMarkItem.title= tabs[i].title;
    bookMarkItem.id = tabs[i].id;
    //bookMarks.push(bookMarkItem);
    let listItem = document.createElement('li')
    listItem.id = 'li-'+tabs[i].id;
    let favIcon = document.createElement('img');
    favIcon.src=tabs[i].favIconUrl;
    favIcon.height ="15";
    favIcon.width="15";
    listItem.appendChild(favIcon);
    let anchor = document.createElement('a');
    anchor.href=tabs[i].url;
    anchor.target ="_blank";
    anchor.innerHTML = (tabs[i].title.length >= 60) ? tabs[i].title.substring(0, 60) + "..." : tabs[i].title;
    listItem.appendChild(anchor);
    let rbutton = document.createElement('button');
    rbutton.innerHTML ="Remove";
    rbutton.id = tabs[i].id;
    rbutton.addEventListener('click', function(event) {
      chrome.tabs.remove(Number(rbutton.id));
      let listI = document.getElementById('li-'+rbutton.id);
      console.log(listI);
      listI.parentNode.removeChild(listI);

    }, false);
    listItem.appendChild(rbutton);
   
    if(!bookMarklist.includes(tabs[i].url)){
      let addButton = document.createElement('button');
    addButton.addEventListener('click', function(event){
      chrome.bookmarks.create({'title': tabs[i].title, 'url': tabs[i].url});
      event.target.style.visibility = 'hidden';
    }, false);

    addButton.innerHTML = 'Add Bookmark'
    listItem.appendChild(addButton);
   }
  
    
    list.appendChild(listItem);
    
  
  }
});

// });

// console.log("The bookmarks function: " + addAllBookMarks())
// let addAllbutton = document.getElementById('addAll');
// addAllbutton.addEventListener('click', addAllBookMarks());

// let addAllButton = document.getElementById("addAll");

// addAllButton.addEventListener('click', function(event){
//   chrome.tabs.query({'active': false }, function (tabs) {
//     for(let j = 0; j < tabs.length; j++){
//       let obj = {};
//       obj.title = tabs[j].title;
//       obj.url = tabs[j].url;

//       bookMarkTabs.push(obj)


//     }
//   }
// }, false);
