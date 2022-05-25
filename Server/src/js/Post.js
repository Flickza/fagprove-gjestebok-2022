//Fetch posts from posts route
export const fetchPosts = () => {
    //clear the messages div before fetching new messages
    return $.ajax({
        url: "/posts",
        method: "GET",
        success: function (data) {
            console.log(data);
            return data;
        },
        error: function (error) {
            console.log(error);
        },
    });
};

//render posts
export const renderPosts = (posts) => {
    $(".messages").html("");
    console.log(posts[0].updatedAt)
    //for each post append a new post to the messages div
    posts.forEach(function (message) {
        $(".messages").append(
            `<div data-id="${message._id}" class="card message mt-2">
                <div class="card-body d-flex flex-md-row flex-md-column flex-lg-row">
                    <div class="cardAuthor d-flex flex-column px-5 align-items-center border-end">
                        <p><a href="#">${message.user}</a></p>
                        <img src="https://avatars.githubusercontent.com/u/58791043?v=4" alt="" 
                        height="100px" width="100px" class="rounded-5 shadow">
                        <div class="userActions d-flex flex-row mt-2">
                                <div class="edit mt-1">
                                    <i class="bi bi-pencil-square px-1" style="font-size: 1.2rem; color: cornflowerblue;"></i>
                                </div>
                                <div class="delete mt-1">
                                    <i class="bi bi-trash3 px-1" style="font-size: 1.2rem; color: cornflowerblue;"></i>   
                                </div>
                        </div>            
                    </div>
                    <div class="cardContent d-flex flex-column">
                        <div class="cardTitle d-flex flex-row justify-content-between">
                            <span class="title fw-bold mt-2 px-2">${message.title}</span>
                            <span class="date mt-2">${message.createdAt.split("T")[0] + " " + message.createdAt.split("T")[1].split(".")[0]}</span>
                        </div>
                        <hr>
                        <div class="cardBody mt-2 px-2">
                            <span class="body">${message.body}</span>
                        </div>
                        <hr class="mt-1">
                        <div class="cardFooter">
                            <div class="actions d-flex flex-row">
                                <span class="comment text-end mt-1">
                                    <i class="bi bi-chat-square-dots px-2" style="font-size: 1.5rem; color: cornflowerblue;"></i>
                                </span>
                                <span class="quote text-end mt-1">
                                    <i class="bi bi-chat-square-quote" style="font-size: 1.5rem; color: cornflowerblue;"></i>
                                </span>
                                <span class="date ms-auto text-muted fs-9">Redigert: ${message.updatedAt.split("T")[0] + " " + message.updatedAt.split("T")[1].split(".")[0]}</span>
                                </div>
                        </div>
                    </div>
                </div>
          </div>`
        );
    });
}
//create a new post 
export const createPost = (data) => {
    $.ajax({
        url: "/posts",
        method: "POST",
        data: data,
        success: function (data) {
            console.log(data);
        },
    });
}

//fetch and render Posts;
export const renderFetch = async () => {
    await fetchPosts().then(function (data) {
        renderPosts(data);
    });
}

//update post
export const updatePost = (data, id) => {
    $.ajax({
        url: `/posts/${id}`,
        method: "PATCH",
        data: data,
        success: function (data) {
            console.log(data);
        },
    });
}

//delete post
export const deletePost = (id) => {
    $.ajax({
        url: `/posts/${id}`,
        method: "DELETE",
        success: function (data) {
            console.log(data);
        },
    });
}