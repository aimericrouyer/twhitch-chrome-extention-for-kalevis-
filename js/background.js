var timeToCheckLive = '10000';
var api = 'helix';
var client_id = 'awn5pjjdxpb0mieqeb96d8cwr682nj';
var user = '45885376'; //id de Kalevis : 45885376
var timeToResetNotifs = '10800000';

let stateNotif = "waitNotif";
let notif;
chrome.storage.sync.get('init', function(init) {
    if (init.init !== 1){
        chrome.storage.sync.set({'init': 1}, function(){})
        chrome.storage.sync.set({'notiflive': true}, function(){})
}})
     
 
checkStream(user, client_id, api, false);
     
setInterval(function(){
    chrome.storage.sync.get('notiflive', function(notiflive){
        if (notiflive.notiflive === true){
            checkStream(user, client_id, api, true);
        }else{
            checkStream(user, client_id, api, false);
        }
    })
}, timeToCheckLive );
    
var resetNotif = setInterval(function(){ 
    stateNotif = "waitNotif";
}, timeToResetNotifs );
    
    
function checkStream(user, client_id, api, notification){
        $.ajax({
            type: "GET",
            beforeSend: function(request) {
              request.setRequestHeader("Client-Id", client_id);
            },
            url: "https://api.twitch.tv/"+api+"/streams?user_id="+user,
            processData: false,
            success: function(response) {
                var data = response.data[0]; 
                if(typeof data == "undefined"){
                    stateNotif = "waitNotif";
                    chrome.browserAction.setIcon({path: "img/icon_offline.png"});
                    chrome.browserAction.setTitle({title: 'kalevis_ - Hors ligne'})
                    chrome.browserAction.setBadgeText({text: ''})
                }else{
                    
                    if(stateNotif != "notifSent"){
                        stateNotif = "ready2sendNotif";	
                    } 
                    chrome.browserAction.setIcon({path: "img/icon.png"});
                    chrome.browserAction.setTitle({title: 'kalevis_ - En live'})
                    chrome.browserAction.setBadgeText({text: ''})

                }	
                    if(stateNotif == "ready2sendNotif" && notification==true){
                        cleanNotif(notif);
                        notif = sendNotif();
                        stateNotif = "notifSent";
                    }
                        if(typeof notif != "undefined"){
                            notif.onclick = function(event) {
                                  event.preventDefault(); 
                                  window.open('https://www.twitch.tv/kalevis_', '_blank');
                                  cleanNotif(notif);
                            }
                        }
            }
          });
    }

function cleanNotif(notif){
    if(typeof notif != "undefined"){
        notif.close();
    }
}
function sendNotif(){
    return new Notification('Live Twitch de kalevis_!',	{
            icon : 'img/icon.png',
            title : 'Live Twitch de kalevis_!', 
            body : 'kalevis_ est actuellement en live sur Twitch! (clique ici pour accéder au live)'
    });
}
    

