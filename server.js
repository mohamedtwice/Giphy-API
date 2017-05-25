console.log('JS working');
$(onReady);

function onReady() {
  console.log('on ready function');
  $('#searchButton').on('click', searchIt);
}

function searchIt() {
  var searchUrl = "http://api.giphy.com/v1/gifs/search?q=";
  // target search input
  searchUrl += $('#search').val();
  searchUrl += "&api_key=dc6zaTOxFJmzC";
  // use text input to search
  console.log(searchUrl);

  // if input field is empty, don't search
  if ($('#search').val() === '') {
    alert("can't search for nothing!");
  } else {
    $.ajax({
      url: searchUrl,
      type: 'GET',
      success: searchResponse
    }); // end ajax
    // something to display results on page
  }

  function searchResponse(response) {
    console.log('back from search:', response);
    if (response.data.length === 0) {
      console.log("this is an empty array");
      $('#outputDiv').append("<div>Can't find anything!</div>");
    } else {
      var output = $('#outputDiv');
      // output.empty();
      var input = $('#search');
      //  input.attr('placeholder', 'searchagain');
      input.val('');
      for (var i = 0; i < response.data.length; i++) {
        console.log('for loop');
        var imgResult = response.data[i].images.downsized.url;
        var imgDisplay = '<div class="imgBox">';
        imgDisplay += '<img src=' + imgResult + '>' + '<br>';
        imgDisplay += '<button class="remove">Remove</button>';
        // imgDisplay += '<button class="favorite">Add to Favorites</button>';
        imgDisplay += '</div>';
        console.log(imgDisplay);
        output.append(imgDisplay);
      }

      $(document).on('click', '.remove', function() {
        console.log('remove button working');
        $(this).parent().remove();
      });
    }
  }
}
