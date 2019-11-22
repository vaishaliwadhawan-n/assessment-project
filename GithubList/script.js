 var result=[];
        var final=[];
    function sendrequest(){
        var xhr=new XMLHttpRequest();
        xhr.open("GET",'https://api.github.com/users?since=135>; rel="next"');
        xhr.send();
        xhr.onload=function(){
            result=JSON.parse(xhr.responseText);
            for(var i=0;i<result.length;i++)
                final[i]=result[i].login;
            puttotable();
        }
    }
    
    function puttotable(){
    for(var i=0;i<final.length;i++){
        var tr=document.createElement("tr");
        var td=document.createElement("td");
        var a=document.createElement("button");
        a.setAttribute("id","clickforuser");
        a.setAttribute("class","btn btn-light");
        a.setAttribute("data-toggle","modal");
        a.setAttribute("data-target","#user-modal");
        a.innerHTML=final[i];
        td.appendChild(a);
        tr.appendChild(td);
        document.getElementById("allusers").appendChild(tr);
    }
    }
        
     $(document).on("click", "#clickforuser", function () {
        UserData = $(this);
        console.log(UserData[0].innerHTML);
         var xhr=new XMLHttpRequest();
         var url='https://api.github.com/users/'+UserData[0].innerHTML;
         console.log(url);
         var usercontent=new Object();
         xhr.open("GET",url);
         xhr.send();
         xhr.onload=function(){
             usercontent=JSON.parse(xhr.responseText);
             showuser(usercontent);
         }
         
    });
       
 $(document).on("click", "#backbtn", function () {
     location.replace("../app.html");
    });
    function showuser(usercontent){
        $('#user-header').html(usercontent.login);
        $('#user-body').html("USERNAME:" + usercontent.login+"<br>NAME:"+usercontent.name+"<br>FOLLOWERS:"+usercontent.followers+"<br>FOLLOWING:"+usercontent.following);
        $('#showfollowers').html("Followers");
        $('#showfollowers').attr('value',usercontent.login);
        $('#showfollowing').html("Following");
        $('#showfollowing').attr('value',usercontent.login);
    }

    $(document).on("click", "#showfollowers", function () {
         $('#user-modal').modal('hide');
         $('#userfollow').modal('show');
        UserData = $(this);
        console.log(UserData);
        console.log(UserData[0].value);
         var xhr=new XMLHttpRequest();
         var url='https://api.github.com/users/'+UserData[0].value+'/followers';
         var usercontent=new Object();
         xhr.open("GET",url);
         xhr.send();
         xhr.onload=function(){
             usercontent=JSON.parse(xhr.responseText);
             console.log(usercontent);   
             $('#tfollowers tr').remove();
             if(usercontent.length==0){
                 document.getElementById("userf-footer").innerHTML="No one Follows";
             }
             else{
             fillintable(usercontent,"tfollowers");
            document.getElementById("userf-footer").innerHTML="";
             }
         }
         
    });
        
    $(document).on("click", "#showfollowing", function () {
         $('#user-modal').modal('hide');
         $('#userfollowing').modal('show');
        UserData = $(this);
        console.log(UserData[0].value);
         var xhr=new XMLHttpRequest();
         var url='https://api.github.com/users/'+UserData[0].value+'/following';
         console.log(url);
         var usercontent=new Object();
         xhr.open("GET",url);
         xhr.send();
         xhr.onload=function(){
             usercontent=JSON.parse(xhr.responseText);
            $('#tfollowing tr').remove();
             if(usercontent.length==0){
                 document.getElementById("usero-footer").innerHTML="Not Following Anyone";
             }
              else{
             fillintable(usercontent,"tfollowing");
            document.getElementById("usero-footer").innerHTML="";
             }
         }
    });

    function fillintable(usercontent,tname){
            for(var i=0;i<usercontent.length;i++){
                var tr=document.createElement("tr");
                var td=document.createElement("td");
                td.innerHTML=usercontent[i].login;
                tr.appendChild(td);
                document.getElementById(tname).appendChild(tr);
            }
        }