var timeToCheckLive = '10000'; //check every 10000 ms / 10 s the channel
var api = 'helix'; //type of api (don't change)
var client_id = 'awn5pjjdxpb0mieqeb96d8cwr682nj'; //you can change with your own 
var user = '45885376'; //id of the streamer
var timeToResetNotifs = '10800000'; //it send a notif to the maximum 1 time every 3h because 10800000ms = 3h

let stateNotif = "waitNotif";
let notif;
chrome.storage.sync.get('init', function(init) { //initialize the chrome.storage
    if (init.init !== 1){
        chrome.storage.sync.set({'init': 1}, function(){}) //this line prevents that the installation is done at each chrome start-up
        chrome.storage.sync.set({'notiflive': true}, function(){}) //basic users will receive a notification a notification to each live
}})
     
 
checkStream(user, client_id, api, false); //launch the script whent the programme is starting
     
setInterval(function(){ //launches the script with a previously defined interval : timeToCheckLive
    chrome.storage.sync.get('notiflive', function(notiflive){
        if (notiflive.notiflive === true){ //check if the script should send a notification or not
            checkStream(user, client_id, api, true);
        }else{
            checkStream(user, client_id, api, false);
        }
    })
}, timeToCheckLive );
    
var resetNotif = setInterval(function(){ //this line ensures that a notification is sent every 3 hours at most by putting a 3 hour interval defined above : timeToResetNotifs
    stateNotif = "waitNotif";
}, timeToResetNotifs );
    
    
function checkStream(user, client_id, api, notification){ //the main function
        $.ajax({ //call the api
            type: "GET",
            beforeSend: function(request) {
              request.setRequestHeader("Client-Id", client_id);
            },
            url: "https://api.twitch.tv/"+api+"/streams?user_id="+user, 
            processData: false,
            success: function(response) {
                var data = response.data[0]; 
                if(typeof data == "undefined"){ //if the answer isn't definited it means that the live is off
                    stateNotif = "waitNotif";
                    chrome.browserAction.setIcon({path: "img/icon_offline.png"}); //change the icon of the extension 
                    chrome.browserAction.setTitle({title: 'kalevis_ - Hors ligne'}) //change the title of the extension 
                    chrome.browserAction.setBadgeText({text: ''})
                }else{
                    
                    if(stateNotif != "notifSent"){ //it check if the last notification has been send more than 3h ago
                        stateNotif = "ready2sendNotif";	
                    } 
                    chrome.browserAction.setIcon({path: "img/icon.png"}); //change the icon of the extension 
                    chrome.browserAction.setTitle({title: 'kalevis_ - En live'}) //change the title of the extension 
                    chrome.browserAction.setBadgeText({text: ''})

                }	
                    if(stateNotif == "ready2sendNotif" && notification==true){  //related to the line 50 51 52 it check if last notification has been send more than 3h ago then it check if the user want to receive a notification
                        cleanNotif(notif); //it clear the clock
                        notif = sendNotif(); //it send the notif
                        stateNotif = "notifSent"; //it reset the vriable
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

function cleanNotif(notif){ //the function of clear notif
    if(typeof notif != "undefined"){
        notif.close();
    }
}
function sendNotif(){ //it definite what contain the notification
    return new Notification('Live Twitch de kalevis_!',	{
            icon : 'img/icon.png',
            title : 'Live Twitch de kalevis_!', 
            body : 'kalevis_ est actuellement en live sur Twitch! (clique ici pour accéder au live)'
    });
}
    

