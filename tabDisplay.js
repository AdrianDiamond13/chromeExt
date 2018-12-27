
let bookMarks = [];


var allTheTabs = chrome.tabs.query({'active': false }, function (tabs) {
  let list = document.getElementById('tabsList');
  for(let i = 0; i <tabs.length; i++){
    let bookMarkItem = {};
    bookMarkItem.url = tabs[i].url;
    bookMarkItem.title= tabs[i].title;
    bookMarkItem.id = tabs[i].id;
    bookMarks.push(bookMarkItem);
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
    let addButton = document.createElement('button');
    addButton.addEventListener('click', function(event){
      chrome.bookmarks.create({'title': tabs[i].title, 'url': tabs[i].url});
    }, false);
    addButton.innerHTML = 'Add BookMark'

    rbutton.addEventListener('click', function(event) {
      chrome.tabs.remove(Number(rbutton.id));
      let listI = document.getElementById('li-'+rbutton.id);
      console.log(listI);
      listI.parentNode.removeChild(listI);

    }, false);
    listItem.appendChild(addButton);
    listItem.appendChild(rbutton);
    
    

    list.appendChild(listItem);
  
  }
});
