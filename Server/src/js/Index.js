import { deletePost, renderFetch } from "/js/Post.js";
import { handleFormState, handleFormSubmit } from "/js/Form.js";

await renderFetch();
//edit post handler
$(document.body).on("click", "div.edit", (e) => {
    const post = $(e.target).parents().eq(4);

    const postId = post.attr("data-id");
    const title = post.find(".cardContent .title").text();
    const body = post.find(".cardContent .body").text();

    $("form#Post").attr("state", "UPDATE");
    $("form#Post").attr("data-id", postId);

    $("form#Post input[name='title']").val(title);
    $("form#Post textarea[name='body']").val(body);
    handleFormState("UPDATE");
});

//delete post handler
$(document.body).on("click", "div.delete", async (e) => {
    const post = $(e.target).parents().eq(4);
    const postId = post.attr("data-id");

    await deletePost(postId);
    alert("Deleted!");
    await renderFetch();
});

//form submit handler
$(document.body).on("submit","form#Post", async (e) => {
    e.preventDefault();

    //get state of Form
    let formState = $("form#Post").attr("state");
    let formId = $("form#Post").attr("data-id");

    //get data from form
    const data = $("form#Post").serialize();

    //handle submit
    await handleFormSubmit(formState, data, formId);

    //reset form
    $("form#Post").trigger("reset");

    //render updated posts
    await renderFetch();
});

//form reset handler
$("form#Post").on("reset", () => {
    //set state back to create and id to empty
    $("form#Post").attr("state", "CREATE");
    $("form#Post").attr("data-id", "");
});