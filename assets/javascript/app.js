// Initial array of Animals
var animals = ["dogs", "cats", "goat"];

// Function for displaying data
function renderButtons() {

    // Deleting the buttons prior to adding new  buttons
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {


        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("animal");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", animals[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(animals[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    }
}



// This function handles events where one button is clicked
$("#add-animal").on("click", function () {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var animal = $("#animal-input").val().trim();
    // The movie from the textbox is then added to our array
    animals.push(animal);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
});


// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();



$("button").on("click", function () {


    var ani = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        ani + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div>");

            rating = results[i].rating;

            var p = $("<p>").text(results[i].rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);

            animalDiv.append(p);
            animalDiv.append(animalImage);


            $("#gifs-appear-here").prepend(animalDiv);



        };
    });

});


