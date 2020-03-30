$(`#twitch`).click(function() {//when the element with the id twitch is clicked it create a new tab with the link
    chrome.tabs.create({url :'https://www.twitch.tv/kalevis_/'}) //the link
    
})
$(`#discord`).click(function() {//same
    chrome.tabs.create({url :'https://discord.gg/aGag3hZ'})//same
    
})
$(`#twt`).click(function() {//same
    chrome.tabs.create({url :'https://twitter.com/Kalevis03'})//same
    
})
$(`#instagram`).click(function() {//same
    chrome.tabs.create({url :'https://www.instagram.com/kalevis__/'})//same
    
})
$(`#twitch2`).click(function() {//same
  chrome.tabs.create({url :'https://www.twitch.tv/kalevis_/'})//same
  
})
$(`#discord2`).click(function() {//same
  chrome.tabs.create({url :'https://discord.gg/aGag3hZ'})//same
  
})
$(`#twt2`).click(function() {//same
  chrome.tabs.create({url :'https://twitter.com/Kalevis03'})//same
  
})
$(`#instagram2`).click(function() {//same
  chrome.tabs.create({url :'https://www.instagram.com/kalevis__/'})//same
  
})
$(`#cocherouge`).click(function() { //when the cocherouge is clicked it means that actually,the notification are disable 
      chrome.storage.sync.set({'notiflive': true}, function(){}) //if you clicked on it, it means you want to switch it so notification turn into true
      $('.cochevert').removeClass("hide"); //it show the cochevert because it mean that the notification are enable
      $('.cocherouge').addClass("hide"); //it hide the cocherouge because it mean that the notification are disable but it's not what we want
  })
$(`#cochevert`).click(function() { //when the cochevert is clicked it means that actually,the notification are enable 
      chrome.storage.sync.set({'notiflive': false}, function(){}) //if you clicked on it, it means you want to switch it so notification turn into false
      $('.cocherouge').removeClass("hide"); //it show the cocherouge because it mean that the notification are disable
      $('.cochevert').addClass("hide"); //it hide the cochevert because it mean that the notification are enable but it's not what we want
})
$("#param").on("click", function(e){ //this is called when you click on the gear
  e.preventDefault(); 
  
  if($(this).hasClass("open")) { //it check if the settings pannel is already open 
    $(this).removeClass("open"); //it close the settings pannel
    $('.onstream').removeClass("hide"); //it shows everything that has been hidden
    $('.nostream').removeClass("hide"); //it shows everything that has been hidden
    $('.parametre').addClass("hide"); //it hide the settings pannel
  } else { //the settings pannel isn't aleready open
    $(this).addClass("open"); //it open it
    $('.onstream').addClass("hide"); //it hide everything
    $('.nostream').addClass("hide"); //it hide everything
    $('.parametre').removeClass("hide"); //it show the element of the settings pannel
  }
});
