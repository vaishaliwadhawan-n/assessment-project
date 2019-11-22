$(document).on('click',"#getbtn",function(){
    if($('#getnum').val()){
       var url='https://api.github.com/search/users?q='+$('#getnum').val();
        console.log(url);
     $.get(url,function(data){
    console.log(data.items);
         puttodisplay(data);
     })  
    }
    else
        alert("Enter a number");
    });

function puttodisplay(resp){
    $('#news').html("");
    for(var i=0;i<resp.items.length;i++)
    {
        $('#news').append(
        `<div class='col-3 mb-5 ml-4 mr-4'>
            <div class="card " style="width: 18rem;height:25rem">
                <img src=${resp.items[i].avatar_url} class="card-img-top">
                    <div class="card-body">
                        <p class="card-text">${resp.items[i].login}</p>
                        <button id="clickforuser" class="btn btn-primary" data-toggle="modal" data-target="#user-modal">${resp.items[i].login}</button>
                    </div>
                </div>
            </div>
        </div>`
        )
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

   function showuser(usercontent){
        $('#user-header').html(usercontent.login);
        $('#user-body').html("USERNAME:" + usercontent.login+"<br>NAME:"+usercontent.name+"<br>FOLLOWERS:"+usercontent.followers+"<br>FOLLOWING:"+usercontent.following);
        $('#showfollowers').html("Followers");
        $('#showfollowers').attr('value',usercontent.login);
        $('#showfollowing').html("Following");
        $('#showfollowing').attr('value',usercontent.login);
    }

    function fillintable(usercontent,tname){
            for(var i=0;i<usercontent.length;i++){
          
                var tr=document.createElement("tr");
                var td=document.createElement("td");
                td.innerHTML=usercontent[i].login;
                tr.appendChild(td);
                document.getElementById(tname).appendChild(tr);
            }
        }