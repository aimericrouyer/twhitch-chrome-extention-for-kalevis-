var api = 'helix'; //type of api (don't change)
var client_id = 'awn5pjjdxpb0mieqeb96d8cwr682nj'; //you can change with your own 
var user = '45885376'; //id of the streamer
var timeToCheckLive = '30000'; //check every 30000 ms / 30 s the channel if the pannel of the extention is on
var timeToResetNotifs = '10800000'; //it send a notif to the maximum 1 time every 3h because 10800000ms = 3h (only for debug)

chrome.storage.sync.get('init', function(init) {//initialize the chrome.storage ( i place it here too for warn of a possible bug )
if (init.init !== 1){
    chrome.storage.sync.set({'init': 1}, function(){})//this line prevents that the installation is done at each chrome start-up
    chrome.storage.sync.set({'notiflive': true}, function(){})//basic users will receive a notification a notification to each live
}})
chrome.storage.sync.get('notiflive', function(notiflive){ //it setup the config page with what configuration we actually have
    if (notiflive.notiflive === true){
        $('.cochevert').removeClass("hide");
        $('.cocherouge').addClass("hide");
        
    }else{
        $('.cocherouge').removeClass("hide");
        $('.cochevert').addClass("hide");
        
    }
})

let stateNotif = "waitNotif"; //for debug
let notif; //for debug
    
 
checkStream(user, client_id, api, false); //don't change the false or you gonna receive a notification twice
     
var check = setInterval(function(){//launches the script while the header of the extention is open with a previously defined interval : timeToCheckLive
    checkStream(user, client_id, api, false);//don't change the false or you gonna receive a notification twice

}, timeToCheckLive );
    
var resetNotif = setInterval(function(){ //for debug
    stateNotif = "waitNotif";//for debug
}, timeToResetNotifs );//for debug
    
    
function checkStream(user, client_id, api, notification){
        $.ajax({//call the api when the header of the extention is open
            type: "GET",
            beforeSend: function(request) {
              request.setRequestHeader("Client-Id", client_id);
            },
            url: "https://api.twitch.tv/"+api+"/streams?user_id="+user,
            processData: false,
            success: function(response) {
                var data = response.data[0]; 
                if(typeof data == "undefined"){//if the answer isn't definited it means that the live is off
                    stateNotif = "waitNotif";
                    $('#thirdWordStatusLink').html("Kalevis_ ne stream pas"); //set the title
                    $('#thirdWordStatusLink').css('color', 'red');//set the title color
                    $('.viewerBox').hide();  //we hide the viewer count
                    $('.titleBox').hide(); //we hide the title of the live
                    $('.gameBox').hide(); //we hide the name of the games
                    $('.lien').hide(); //we hide some links
                    $('.onstream').hide(); //we hide what should be show if the streamer is online
                    $('.img').css('visibility', 'visible'); //we show somes pictures
                    $('.nostream').css('visibility', 'visible'); //we show what should be show if the streamer is offline
                    $('.underline').css('color', 'transparent'); //we hide the underline
                    $('.streamon').addClass("hide"); //for debug the config page
                    $('.streamoff').removeClass("hide"); //for debug the config page
                }else{
                    var gameId = data["game_id"];
                    var liveTitle = data["title"];
                    var liveViewersCount = data["viewer_count"];
                    $.ajax({ //it call the api for knowing what games does the streamer play
                        type: "GET",
                        beforeSend: function(request) {
                          request.setRequestHeader("Client-Id", client_id);
                        },
                        url: "https://api.twitch.tv/"+api+"/games?id="+gameId,
                        processData: false,
                        success: function(response) {
                            var liveGame = response.data[0]['name'];
                            liveGame = "Joue &#xE0; : " + liveGame //it add a little bit of text before the game name
                            $('#gamePlaying').html(liveGame); //show the result	 
                        }
                        });
                    if(stateNotif != "notifSent"){ //for debug
                        stateNotif = "ready2sendNotif";	//for debug
                    } 
                    $('#thirdWordStatusLink').html("Kalevis_ est en train de stream : "); //set the title
                    $('#thirdWordStatusLink').css('color', 'green'); //set the title color
                    $('#viewerCount').html(improveViewersDisplay(liveViewersCount)); //show the number of viewer
                    $('#liveTitle').html(liveTitle); //show the title of the live
                    $('.nostream').hide(); //we hide what should be show if the streamer is offline
                    $('.img').hide(); //hide somes pictures
                    $('.onstream').css('visibility', 'visible'); //we hide what should be show if the streamer is online
                    $('.gameBox').css('visibility', 'visible'); //show the game name
                    $('.lien').css('visibility', 'visible'); //show some links 
                    $('.underline').css('color', 'green'); //show the underline of the title
                    $('.streamon').removeClass("hide"); //for debug the config page
                    $('.streamoff').addClass("hide"); //for debug the config page
                    $('#livetwitchdirect').html('<iframe src="https://player.twitch.tv/?channel=kalevis_" frameborder="0" allowfullscreen="true" scrolling="no" height="226" width="372" style="margin-top: -25px; margin-bottom: -15px;"></iframe>')
                    //load the iframe of the twitch channel only if the live is on (to save resources)
                }	
                    if(stateNotif == "ready2sendNotif" && notification==true){ //for debug
                        cleanNotif(notif);
                        notif = sendNotif();
                        stateNotif = "notifSent";
                    }
                        if(typeof notif != "undefined"){//for debug
                            notif.onclick = function(event) {
                                  event.preventDefault(); 
                                  window.open('https://www.twitch.tv/kalevis_', '_blank');
                                  cleanNotif(notif);
                            }
                        }
            }
          });
    }

function cleanNotif(notif){//for debug
    if(typeof notif != "undefined"){
        notif.close();//for debug
    }
}
function sendNotif(){//for debug
    return new Notification('Live Twitch de kalevis_!',	{
            icon : 'img/icon.png',//for debug
            title : 'Live Twitch de kalevis_!', //for debug
            body : 'kalevis_ est actuellement en live sur Twitch! (clique ici pour accéder au live)'//for debug
    });
}
    
function improveViewersDisplay(viewers_count){ //get the number of viewer and add some text before the numbers
    return "Nombre de viewers : " + viewers_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}
