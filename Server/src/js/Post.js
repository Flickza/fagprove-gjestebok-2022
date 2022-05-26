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
    //for each post append a new post to the messages div
    let messages = posts.map((message) => {
        return `
        <div data-id="${message._id}" class="card message mt-2">
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
                            <div class="actions d-flex flex-row align-items-center">
                                <span class="quote text-end mt-1">
                                    <i class="bi bi-chat-square-quote px-2" style="font-size: 1.5rem; color: cornflowerblue;"></i>"Quote"
                                </span>
                                <span class="date ms-auto text-muted fs-9">Redigert: ${message.updatedAt.split("T")[0] + " " + message.updatedAt.split("T")[1].split(".")[0]}</span>
                            </div>
                            <hr class="mt-1 mb-2">
                                <div class="commentField input-group mb-1 px-3">
                                    <input type="text" class="form-control" maxLength="50" name="commentField" placeholder="Kommentar... (Maks 50 Karakterer)">
                                    <button class="btn btn-primary postComment" type="button">
                                    <i class="bi bi-send-fill" style="color:white;"></i>
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="children d-flex flex-column align-items-end">
                ${message.comments.map((c) => {
                return `
                    <div data-id="${c._id}" class="child mt-2 mb-2">
                        <div class="card d-flex flex-row align-items-center">
                            <div class="cardAuthor px-3 border-end">
                                ${c.user}
                            </div>
                            <div class="card-body border-end">
                                ${c.comment}
                            </div>
                            <div class="card-actions">
                                <div class="deleteComment mt-1">
                                    <i class="bi bi-trash3 px-1" style="font-size: 1.2rem; color: cornflowerblue;"></i>   
                                </div>
                            </div>
                        </div>
                </div>`
                }).join("")}
                </div>
          </div>`; 
    }).join("");
    $(".messages").append(messages);
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

//comment post
export const commentPost = (id, data) => {
    $.ajax({
        url: `/posts/comment/${id}`,
        method: "PATCH",
        data: data,
        success: function (data) {
            console.log(data);
        },
    });
}

//delete comment
export const deleteComment = (postId, commentId) => {
    $.ajax({
        url: `/posts/comment/${postId}/${commentId}`,
        method: "DELETE",
        success: function (data) {
            console.log(data);
        },
    });
}