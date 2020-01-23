var nextPage = "";
var prevPage = "";

function watchPrevPage(){
    $('#prevPage').on('click', (event)=>{
        event.preventDefault();
        runAjax(prevPage);
    });
  }

function watchNextPage(){
    $('#nextPage').on('click', (event)=>{
        event.preventDefault();
        runAjax(nextPage);
    });
  }

function runAjax(token){
    let url = "https://www.googleapis.com/youtube/v3/search";
    $.ajax({
        url : url,
        method : "GET",
        dataType : "json",
        data:{
          key: "AIzaSyABgmb3m6_BHW4iXi_GF5SzhjZnpx3EMWw",
          q: $('#searchBox').val(),
          maxResults: 10,
          part: "snippet",
          type: 'video',
          pageToken: token,
        },
        success : function( responseJSON ){
            prevPage = responseJSON.prevPageToken;
            nextPage = responseJSON.nextPageToken;
            displayResults( responseJSON );
        },
        error : function( err ){
          console.log( err );
        }
      });
}

function displayResults( responseJSON ){
    $('#list').empty();
    console.log(responseJSON);
    for(i=0;i<responseJSON.items.length;i++){
        $('#list').append(`
        <div class="videoResult">
            <a href = "https://www.youtube.com/embed/${responseJSON.items[i].id.videoId}" target="_blank">
            <p> ${responseJSON.items[i].snippet.title}</p>
            <img src="${responseJSON.items[i].snippet.thumbnails.default.url}" alt="thumbnail">
            </a>
        </div>
            `
        )
    }
  }

  function watchForm(){
  
    let form = document.getElementById( 'videosForm' );
    
    form.addEventListener( 'submit' , ( event ) => {
        $('#list').empty();
        event.preventDefault();
        $('.buttons').toggleClass('hidden');
        runAjax("");
        watchPrevPage();
        watchNextPage();
    });
  }

  function init(){
    $('.buttons').toggleClass('hidden');
    watchForm();
  }
  
  init();