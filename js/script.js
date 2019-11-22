

$(document).on("click","#gitbtn",function(){
    location.replace('GithubList/app.html');
})

$(document).on("click","#newbtn",function(){
    location.replace('news.html');
})

$(document).on("click","#counbtn",function(){
    location.replace('GithubSearch/app.html');
})

$(document).on("click","#factbtn",function(){
    location.replace('Facts.html');
})


$(window).on('load',function(){
        $('#myModal').modal('show');
    
    var name=JSON.parse(localStorage.getItem("Name"));
    $('#details').html($('#details').html()+" <i>"+name+"</i>, What would you like to do Today?");
    });
