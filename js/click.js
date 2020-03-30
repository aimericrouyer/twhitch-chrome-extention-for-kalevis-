$(`#twitch`).click(function() {
    chrome.tabs.create({url :'https://www.twitch.tv/kalevis_/'})
    
})
$(`#discord`).click(function() {
    chrome.tabs.create({url :'https://discord.gg/aGag3hZ'})
    
})
$(`#twt`).click(function() {
    chrome.tabs.create({url :'https://twitter.com/Kalevis03'})
    
})
$(`#instagram`).click(function() {
    chrome.tabs.create({url :'https://www.instagram.com/kalevis__/'})
    
})
$(`#twitch2`).click(function() {
  chrome.tabs.create({url :'https://www.twitch.tv/kalevis_/'})
  
})
$(`#discord2`).click(function() {
  chrome.tabs.create({url :'https://discord.gg/aGag3hZ'})
  
})
$(`#twt2`).click(function() {
  chrome.tabs.create({url :'https://twitter.com/Kalevis03'})
  
})
$(`#instagram2`).click(function() {
  chrome.tabs.create({url :'https://www.instagram.com/kalevis__/'})
  
})
$(`#cocherouge`).click(function() {
      chrome.storage.sync.set({'notiflive': true}, function(){})
      $('.cochevert').removeClass("hide");
      $('.cocherouge').addClass("hide");
  })
$(`#cochevert`).click(function() {
      chrome.storage.sync.set({'notiflive': false}, function(){})
      $('.cocherouge').removeClass("hide");
      $('.cochevert').addClass("hide");
})
$("#param").on("click", function(e){
  e.preventDefault();
  
  if($(this).hasClass("open")) {
    $(this).removeClass("open");
    $('.onstream').removeClass("hide");
    $('.nostream').removeClass("hide");
    $('.parametre').addClass("hide");
  } else {
    $(this).addClass("open");
    $('.onstream').addClass("hide");
    $('.nostream').addClass("hide");
    $('.parametre').removeClass("hide");
  }
});
