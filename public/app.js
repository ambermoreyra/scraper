console.log
// Grab the articles as a json
$.getJSON("/articles", function (data) {
    console.log("data in /articles: ", data);
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        // $(".brewers").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");

        // $(".brewers").append("<div class='card'>");
        $(".brewers").append("<div data-_id='" + data[i]._id + "' class='card mb-4'>");
        $("[data-_id=" + data[i]._id + "]").append("<h3 data-id=" + data[i]._id + " class='card-header card-title'>");
        $("[data-id=" + data[i]._id + "]").append("<a dataId=" + data[i]._id + " class='article-link' target='_blank' href='https://www.mlb.com/brewers" + data[i].link + "'>" + data[i].title + "</a>").append("<a class='btn btn-info notes float-right'>" + 'Article Notes' + "</a>");
        // append("<a class='btn btn-danger delete ml-4 float-right'>" + 'Delete From Saved' + "</a>").append("<a class='btn btn-info notes float-right'>" + 'Article Notes' + "</a>");

    }
});

// $(document).on("click", ".save", function () {
//     BrewersSchema.saved = true;
//     console.log(BrewersSchema);
// }
// );

// Whenever someone clicks a p tag
$(document).on("click", ".notes", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $("a").attr("dataId");

    console.log("ID:", thisId);
    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            $("#notes").append("<br>");

            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#notes").append("<br>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});