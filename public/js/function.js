$(document).ready(function (event) {
    $(".favoriteIcon").on("click", function (event) {
        if ($(this).attr("src") == "img/favorite.png") {
            $(this).attr("src", "img/favorite_on.png")
        } else {
            $(this).attr("src", "img/favorite.png")
        }
    })
})