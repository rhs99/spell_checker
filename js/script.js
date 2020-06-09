var begin = 0;
var cnt = 0;
var totalSubmission = 0;
var userName = "";
var totalWords = 5;

document.addEventListener("DOMContentLoaded",
  function (event) {
  
    document.querySelector("#login-btn")
      .addEventListener("click", function () {

        var name = document.querySelector("#user-name").value;
        userName = name;
        document.querySelector("#login").innerHTML = "";
         
        var userHtml = userName;
        document.querySelector("#login-info").innerHTML = userHtml;
        play();

      });       
  }
);

function play(){

  var clipCnt = "Current word no : " + (cnt+1);

  if(cnt < totalWords){
    document.querySelector("#clip-cnt").innerHTML = clipCnt;
  }else{
    document.querySelector("#clip-cnt").innerHTML = "";
  }

  var src = "data/" + cnt + ".ogg";
  var html = '<audio src="';
  html += src;
  html += '" controls>';
  html += "</audio>";

  if(cnt < totalWords){
    document.querySelector("#display")
      .innerHTML = html;
  }else{
    document.querySelector("#display")
        .innerHTML = "";
  }

 
  var responseHtml = '<input id="response" type="text">';
  responseHtml += '<button id="submit" onclick="validate()">submit</button>';
  responseHtml += '<button id="help" onclick="helper()">help</button>';


  if(cnt < totalWords){
    document.querySelector("#user-response")
        .innerHTML = responseHtml;
  }else{
    document.querySelector("#user-response")
        .innerHTML = "";
  }
 
  
  if(begin == 0){

    begin = 1;

    var anal = "<label>Progress :</label>";
    anal += '<progress id="pgr-mtr" value="0" max="' + totalWords + '"></progress>';
    anal += "<br><br>";
    anal += "<label> Accurecy :</label>";
    anal += '<meter id="acc-mtr" value="0" min="0" max="1"></meter>';
    document.querySelector("#analysis").innerHTML = anal;

    var scr = "<label>Score :</label>";
    document.querySelector("#scr-lbl").innerHTML = scr;
 }

};

 


function validate(){

  totalSubmission++;

  var ans = document.querySelector("#response").value;

  $ajaxUtils.sendGetRequest("data/words.txt", 
            function (res) {

              var words = res.split("\n");

              if(words[cnt] === ans.trim().toLowerCase()){
                cnt++;
                setServerResponse("")
                
              }else{
                setServerResponse("Wrong!") 
              }

              analysis();

              play();

            }, false);

};

function helper(){
  totalSubmission++;

  $ajaxUtils.sendGetRequest("data/words.txt", 
            function (res) {

              var words = res.split("\n");
              setServerResponse(words[cnt]);
                
            }, false);

};


function setServerResponse(res){

  
    var html = "<span> " + res + "</span>";
  
    document.querySelector("#server-response")
        .innerHTML = html;

};

function analysis(){

    var pgr = document.querySelector("#pgr-mtr");
    pgr.value = cnt;

    var acc = document.querySelector("#acc-mtr");
    acc.value = cnt/totalSubmission;

    var point = (cnt/totalSubmission)*10*cnt;

    document.querySelector("#score").innerHTML = point.toFixed(2);

    if(cnt>=totalWords)
    {
      congratulate();
    }
};


function congratulate(){
 
  var html = "Congratulation! You have done it!!!";
  document.querySelector("#complete").innerHTML = html;

};





