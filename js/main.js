var api = 'helix';
var client_id = 'awn5pjjdxpb0mieqeb96d8cwr682nj';
var user = '45885376'; //id de Kalevis : 45885376
var timeToCheckLive = '30000';
var timeToResetNotifs = '10800000';

//"default_icon" : "img/icon_offline.png"
//"icons" : {
    //"70" : "img/icon_offline.png"
//},

chrome.storage.sync.get('init', function(init) {
if (init.init !== 1){
    chrome.storage.sync.set({'init': 1}, function(){})
    chrome.storage.sync.set({'notiflive': true}, function(){})
}})
chrome.storage.sync.get('notiflive', function(notiflive){
    if (notiflive.notiflive === true){
        $('.cochevert').removeClass("hide");
        $('.cocherouge').addClass("hide");
        
    }else{
        $('.cocherouge').removeClass("hide");
        $('.cochevert').addClass("hide");
        
    }
})

let stateNotif = "waitNotif";
let notif;
    
 
checkStream(user, client_id, api, false);
     
var check = setInterval(function(){
    checkStream(user, client_id, api, false);

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
                    $('#thirdWordStatusLink').html("Kalevis_ ne stream pas");
                    $('#thirdWordStatusLink').css('color', 'red');
                    $('.viewerBox').hide(); 
                    $('.titleBox').hide(); 
                    $('.gameBox').hide();
                    $('.lien').hide();
                    $('.onstream').hide();
                    $('.img').css('visibility', 'visible');
                    $('.nostream').css('visibility', 'visible');
                    $('.underline').css('color', 'transparent');
                    $('.streamon').addClass("hide");
                    $('.streamoff').removeClass("hide");
                }else{
                    var gameId = data["game_id"];
                    var liveTitle = data["title"];
                    var liveViewersCount = data["viewer_count"];
                    $.ajax({
                        type: "GET",
                        beforeSend: function(request) {
                          request.setRequestHeader("Client-Id", client_id);
                        },
                        url: "https://api.twitch.tv/"+api+"/games?id="+gameId,
                        processData: false,
                        success: function(response) {
                            var liveGame = response.data[0]['name'];
                            liveGame = "Joue &#xE0; : " + liveGame
                            $('#gamePlaying').html(liveGame);	
                        }
                        });
                    if(stateNotif != "notifSent"){
                        stateNotif = "ready2sendNotif";	
                    } 
                    $('#thirdWordStatusLink').html("Kalevis_ est en train de stream : ");
                    $('#thirdWordStatusLink').css('color', 'green');
                    $('#viewerCount').html(improveViewersDisplay(liveViewersCount));
                    $('#liveTitle').html(liveTitle);
                    $('.nostream').hide();
                    $('.img').hide();
                    $('.onstream').css('visibility', 'visible');
                    $('.gameBox').css('visibility', 'visible');
                    $('.lien').css('visibility', 'visible');
                    $('.underline').css('color', 'green');
                    $('.streamon').removeClass("hide");
                    $('.streamoff').addClass("hide");
                    $('#livetwitchdirect').html('<iframe src="https://player.twitch.tv/?channel=kalevis_" frameborder="0" allowfullscreen="true" scrolling="no" height="226" width="372" style="margin-top: -25px; margin-bottom: -15px;"></iframe>')

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
    
function improveViewersDisplay(viewers_count){
    return "Nombre de viewers : " + viewers_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}
