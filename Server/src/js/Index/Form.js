import { createPost, updatePost } from "./Post.js";

export const handleFormState = (state) => {
    switch (state) {
        case "CREATE":
            //set create title text
            $(".formTitle").text("Nytt Innlegg");
            //set button text
            $("#submitMessage").text("Post");
            break;
        case "UPDATE":
            //sett create post text
            $(".formTitle").text("Rediger Innlegg");
            //set button text
            $("#submitMessage").text("Rediger");
            break;
    }
};


export const handleFormSubmit = (state, data, id) => {
    switch (state) {
        case "CREATE":
            //create new Post
            try {
                createPost(data);
            } catch (error) {
                alert(error);
            }
            break;

        case "UPDATE":
            //update post
            try {
                if (id != undefined) {
                    updatePost(data, id);
                }
            } catch (error) {
                alert(error);
            }
            break;
    }
}