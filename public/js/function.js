$(document).ready(function (event) {
    $(".favoriteIcon").on("click", async function (event) {
        let $this = $(this)
        let formData = new FormData()
        let method = ""
        let apiUrl = ""
        let nextIconUrl = ""
        if ($this.attr("src") == "img/favorite.png") {
            method = "POST"
            apiUrl = "/api/favorite"

            let urlParams = new URLSearchParams(window.location.search);
            let keyword = urlParams.get("keyword")
            let imageUrl = $this.data("image-url")

            formData.append("keyword", keyword)
            formData.append("imageUrl", imageUrl)

            nextIconUrl = "img/favorite_on.png"
        } else {
            let id = $this.data("favorite-id")
            if (!id) {
                console.error("ID not found!")
                return
            }
            apiUrl = `/api/favorite/${id}`
            method = "DELETE"
            nextIconUrl = "img/favorite.png"
        }
        $.ajax({
            url: apiUrl,
            data: formData,
            processData: false,
            contentType: false,
            type: method,
            })
            .then(
                function(data, textStatus, jqXHR) {
                    let id = data.data.id
                    $this.attr("data-id", id)
                    $this.attr("src", nextIconUrl)
                },
                function(jqXHR, textStatus, errorThrown){
                    alert("Encountered error, please try again.")
                })
    })
})