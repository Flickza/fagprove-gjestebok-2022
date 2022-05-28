import { paginationLogic } from "./Pagination.js";
import './ejs/ejs.min.js';
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
export const renderPosts = async (posts, currentPage, done) => {
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

    //generate html markup for posts using ejs template
    const html = await $.get("/templates/post.ejs").then(function (file, status, xhr) {
        var htmlMarkup = ``;
        postsToRender.forEach(post => htmlMarkup += ejs.render(file, post));
        return htmlMarkup;
    });

    return html;
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
    await fetchPosts().then(async function (data) {
        
        //when data renderposts is called, it returns html markup
        const html = await renderPosts(data, pagenum);
        
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