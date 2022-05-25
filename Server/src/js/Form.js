
import { createPost, updatePost } from "/js/Post.js";

export const handleFormState = (state) => {
    switch (state) {
        case "CREATE":
            $(".formTitle").text("Nytt Innlegg");
            //set button text
            $("#submitMessage").text("Post");
        case "UPDATE":
            //sett create post text
            $(".formTitle").text("Rediger Innlegg");

            //set button text
            $("#submitMessage").text("Rediger");
    }
};

export const handleFormSubmit = async (state, data, id) => {
    console.log(state,data,id);
    switch (state) {
        case "CREATE":
            //create new Post
            try {
                await createPost(data);
                alert("Created!");
            } catch (error) {
                alert(error);
            }
            break;

        case "UPDATE":
            //update post
            try {
                if (id != undefined) {
                    await updatePost(data, id);
                    alert("Updated!");
                }
            } catch (error) {
                alert(error);
            }
            break;
    }
}