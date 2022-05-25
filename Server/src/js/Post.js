export const fetchPosts = () => {
    //clear the messages div before fetching new messages
    $(".message").html("");
    $.ajax({
        url: "/posts",
        method: "GET",
        success: function (data) {
            console.log(data);
            data.forEach(function (message) {
                $(".messages").append(
                    `<div class="card message mb-2">
                            <div class="card-body d-flex flex-row">
                                <div class="cardAuthor d-flex flex-column px-5 align-items-center border-end">
                                <p><a href="#">${message.user}</a></p>
                                <img src="https://avatars.githubusercontent.com/u/58791043?v=4" alt="" 
                                height="100px" width="100px" class="rounded-5 shadow-sm">
                                </div>
                                <div class="cardContent d-flex flex-column align-self-stretch">
                                <span class="title fw-bold mt-2 px-2">${message.title}</span>
                                <hr>
                                <span class="body mt-2 px-2">${message.body}</span>
                                <hr class="mt-1">
                                <div class="cardFooter d-flex flex-row align-self-end">
                                    <span class="date text-end fw-light mt-1">5 min ago. (${message.createdAt.split("T")[0] + " " + message.createdAt.split("T")[1].split(".")[0]})</span></div>
                                </div>
                            </div>
                            </div>`
                );
            });
        },
        error: function (error) {
            console.log(error);
        },
    });
};

export const createPost = (title, body) => {
    $.ajax({
        url: "/posts",
        method: "POST",
        data: {
            title: title,
            body: body,
        },
        success: function (data) {
            console.log(data);
        },
    });
}