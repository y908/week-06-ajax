
window.onload = function() {
//array of chefs
    var chefs = ['Julia Child', 'Gordon Ramsay', 'Alton Brown', 'Ratatouille', 'Swedish Chef']; 
//displays gifs in chefView
    function displayChef(){

         $('.item').remove();

         var chef = $(this).attr('data-name'); 
         //chef = "cats";
         var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + chef + "&api_key=dc6zaTOxFJmzC&limit=10";

         $.ajax({url: queryURL, method: 'GET'})

        .done(function(response) {
         var results = response.data;

         for(var i=0; i < results.length; i++){
            if (results[i].rating == "r" || results[i].rating == "pg-13"){
                // do nothing
            }
            else {
             var gifDiv = $('<div class="item">')
             var rating = results[i].rating;
             var p = $('<p>').text( "Rating: " + rating);
             var personImage = $('<img>');
             personImage.attr('data-gifffer', results[i].images.fixed_height.url);
             gifDiv.append(p)
             gifDiv.append(personImage)
             $('#chefView').append(gifDiv); 

             Gifffer(); //runs function to pause gif
            
            }
         } // end of for loop
        
        }); // end of .done 
    }


    function renderButtons(){ //makes buttons
        $('#buttonsView').empty();
        for (var i = 0; i < chefs.length; i++){ 
             var a = $('<button>')
             a.addClass('chef');
             a.attr('data-name', chefs[i]);
             a.text(chefs[i]);             
             $('#buttonsView').append(a); 
        }
    }


     $('#addChef').on('click', function(){

        // remove previously displayed gifs
        $('.item').remove();

        var chef = $('#chef-input').val().trim();
        chefs.push(chef);
        renderButtons();
       
        return false;
    })

    //click button runs displayChef function
    $(document).on('click', '.chef', displayChef);

    renderButtons();

    

}//onload

