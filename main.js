var uname = "Anonymous";
var dp = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNkyxRDOxzUXZkoNhbt2zTAH6tF2FAIfGqjQ&usqp=CAU";
var config = {
apiKey : "AIzaSyD7CiP6D4BcoimrwtzgvdiJNpmFX2pWa5I",
authDomain : "web-app-db49c.firebaseapp.com",
databaseURL : "https://web-app-db49c-default-rtdb.firebaseio.com",
storageBucket : "web-app-db49c.appspot.com",
messagingSenderId : "434688695330",
};
firebase.initializeApp(config);
var ref = firebase.database().ref("chat");
ref.on("value",function(result){
var dataset = result.val();
var keys = Object.keys(dataset);
for(var i=0;i<=keys.length;i++){
var k = keys[i];
var uname = dataset[k].uname;
var text = dataset[k].text;
var time = dataset[k].time;
var src = dataset[k].src;
document.getElementById("container").innerHTML += `<br><b><img style="display:inline-block;width:35px;height:35px;border:none;border-radius:50%;padding-right:5px" src="`+src+`"/>`+uname+` : </b>`+text+` <span>`+time+`</span><br>`;
}});
function submit(){
document.getElementById("container").innerHTML = "";
var text = document.getElementById("text").value;

var d = new Date();
var time = (d.getHours() - 12) + ":" + d.getMinutes();
var time_status = d.getHours() >= 12 ? "pm" : "am";
var date = d.toUTCString().split(" ").slice(0, 4).join(" ");
var time = time+" "+time_status+" "+date;
var metadata = {
uname : uname,
text : text,
time : time,
src : dp,
};
ref.push(metadata);
}

var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();

function sign_in(){
auth.signInWithPopup(provider);
}
auth.onAuthStateChanged(user => {
if(user){
uname = user.displayName;
var date = new Date();
var time = date.getHours()
var m;
if(time < 12) m = "good morning";
else if(time < 15) m = "good noon";
else if(time < 18) m = "good afternoon";
else if(time < 20) m = "good evening";
else m = "good night";
document.getElementById("header").innerText = m + " " + uname;
document.getElementById("dp").src = user.photoURL;
dp = user.photoURL;
}});
