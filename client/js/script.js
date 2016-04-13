$(document).ready(function() {
    console.log("ready to code");
    document.addEventListener("keydown", keyDown, false);
    var x = 1;
    var y = 2;
    var notInGallery = true;

    function keyDown(e) {
        var keyEnter = e.keyCode;
        if (keyEnter == 13 && x < 10 && notInGallery) {
            $("#page" + x).fadeOut(750);
            x += 1;
            $("#page" + y).delay(750).fadeIn(750);
            y += 1;
            console.log(x);
            console.log(y);
            if (x == 10) {}
        }
    }
    $("#theGallery").on("click", function(e) {
        // e.preventDefault();
        notInGallery = false;
        $("#page" + x).fadeOut(750);
        $("#page1").fadeOut(750);
        $("#pageGallery").delay(750).fadeIn(750);
        $("textarea").val("");
        x = 1;
        y = 2;
    });
    $("#goToGallery").on("click", function(e) {
        //e.preventDefault();
        $("#page11").fadeOut(750);
        $("#pageGallery").delay(750).fadeIn(750);
        $("textarea").val("");
    });
    $("#home").on("click", function(e) {
        $("textarea").val("");
        // e.preventDefault();
        notInGallery = true;
        $("#page" + x).fadeOut(750);
        $("#page11").fadeOut(750);
        $("#pageGallery").fadeOut(750);
        $("#page1").delay(750).fadeIn(750);
        $("textarea").val("");
        x = 1;
        y = 2;
    });
    $("#continue").on("click", function() {
        $("#page10").fadeOut(750);
        $("#page11").delay(750).fadeIn(750);
        var nodeText = $("textarea").val();
        //create new p element with class and contents
        var $text = $("<p>");
        $text.addClass("usertext");
        $text.html(nodeText);
        $("#preview").html($text);
    });
    //Get stored data
    $.getJSON("data.json", function(dataObjects) {
        main(dataObjects);
        $("textarea").val("");
    });
});

function main(dataObjects) {
    function addAll() {
        $("#gallery").empty();
        dataObjects.forEach(function(data) {
            //create containing div element
            var $div = $("<div>");
            $div.addClass("node");
            //create new p element with class and contents
            var $text = $("<p>");
            $text.addClass("usertext");
            $text.html(data.text);
            $div.append($text);
            $("#gallery").prepend($div);
        });
    }
    addAll();
    //run addAll function when page first loads (above)
    $("#shareGallery").on("click", function(e) {
        //e.preventDefault();
        //grab values from form
        var nodeText = $("textarea").val();

        function node(text) {
            this.text = text;
        }
        var newNode = new node(nodeText);
        $.post("addData", newNode, function(result) {
            console.log(result);
            $("textarea").val("");
            dataObjects.push(newNode);
            $("#page11").fadeOut(750);
            $("#pageGallery").delay(750).fadeIn(750);
            //update the DOM
            addAll();
        });
    });
    // end of shareGallery
    $("#download").on("click", function(e) {
        e.preventDefault();
        var dataDownload = "text/json;charset=utf-," +
            encodeURIComponent(JSON.stringify(dataObjects));
        $("download").attr("href", "data:" + dataDownload);
        window.location = document.getElementById('download').href;
    });
}
