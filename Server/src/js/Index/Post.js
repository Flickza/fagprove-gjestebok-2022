import { paginationLogic } from "./Pagination.js";

//Fetch posts from posts route
export const fetchPosts = () => {
    //clear the messages div before fetching new messages
    return $.ajax({
        url: "/posts",
        method: "GET",
        success: function (data) {
            return data;
        },
        error: function (error) {
            console.log(error);
        },
    });
};

//generate html markup for posts
export const renderPosts = (posts, currentPage) => {
    //if there are no posts, run pagination logic with null parameters.
    //null parameter will remove pagination html
    if (!posts.length > 0) {
        paginationLogic(null)
        return "There are no posts :(";

    }
    //limit of posts per page
    const limit = 2;

    //set currentpage in data attribute of messages parent div
    $(".messages").attr("data-currentpage", currentPage);
    
    //send current page and array of posts for pagination
    //paginationLogic calculates what posts to render given the currentPage
    //returns an array of posts
    const postsToRender = paginationLogic(posts, currentPage, limit);

    let messages = postsToRender.map((message) => {
        return `
        <div data-id="${message._id}" class="card message mt-2 bg-light">
                <div class="card-body d-flex flex-column flex-sm-row">
                    <div class="cardAuthor w-10 d-flex flex-column px-5 align-items-center justify-content-center text-center border-end">
                        <div class="authorName">
                            <p class="fw-bold">${message.username}</p>
                        </div>
                        <div class="authorImage">
                            <img src="https://avatars.githubusercontent.com/u/58791043?v=4" alt=""
                            height="100px" width="100px" class="rounded-5 shadow">
                        </div>
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
                            <span class="title fw-bold mt-2 px-2">${message.title.toUpperCase()}</span>
                            <span class="date mt-2">${message.createdAt.split("T")[0] + " " + message.createdAt.split("T")[1].split(".")[0]}</span>
                        </div>
                        <hr>
                        <div class="cardBody mt-2 px-2">
                            <span class="body">${message.body}</span>
                        </div>
                        <hr class="mt-1">
                        <div class="cardFooter">
                            <div class="actions d-flex flex-column flex-md-row align-items-center">
                                <span class="date ms-auto text-muted fs-9">Redigert: ${message.updatedAt.split("T")[0] + " " + message.updatedAt.split("T")[1].split(".")[0]}</span>
                            </div>
                                <div class="commentField d-flex d-inline mb-1 mt-2 px-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" maxLength="50" name="commentField" placeholder="Kommentar... (Maks 50 Karakterer)">
                                        <button class="btn btn-primary postComment" type="button">
                                        <i class="bi bi-send-fill" style="color:white;"></i>
                                        </button>
                                    </div>
                                    <span class="quote text-end mt-1">
                                    <i class="bi bi-chat-square-quote px-2" style="font-size: 1.5rem; color: cornflowerblue;"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="children w-100 d-flex flex-column align-items-center fs-6">
                ${message.comments.map((c) => {
            return `
                    <div data-id="${c._id}" class="child shadow-sm mt-2 mb-2">
                        <div class="card d-flex flex-row align-items-center justify-content-end w-100">
                            <div class="cardAuthor h-100 w-auto px-3 border-end">
                                ${c.authorName}
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

    //return markup
    return messages;
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
export const renderFetch = async (pagenum) => {
    //fetch all posts
    await fetchPosts().then(function (data) {
        
        //when data renderposts is called, it returns html markup
        const html = renderPosts(data, pagenum);
        
        //append html markup to messages div
        $(".messages").html(html);
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