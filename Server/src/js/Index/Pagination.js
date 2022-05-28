//generate html markup for pagination
const paginationMarkup = (pages, limit, currentPage) => {
    //calculate amount of pages needed with a limit of x posts per page
    let pageAmount = Math.ceil(pages / limit);

    //create page number list
    let paginationHtml = ``;
    for (let i = 1; i < pageAmount + 1; i++) {
        //set current page item to blue
        if (i == currentPage) {
            paginationHtml += `<li class="page-item active"><a class="page-link">${i}</a></li>`;
        } else {
            paginationHtml += `<li class="page-item page"><a class="page-link" data-pagenum="${i}">${i}</a></li>`;
        }
    }
    //return html element with page numbers included
    return ` <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" id="prevPage" data-page="prev" data-minPage="${parseInt(1)}" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                    ${paginationHtml}
                <li class="page-item">
                    <a class="page-link" id="nextPage" data-page="next" data-maxPage="${pageAmount}" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>`;
}

export const paginationLogic = (posts, currentPage, limit) => {
    //remove pagination from dom, if there are no posts
    
    if (posts == null) return $("#pagination").html("");
    //generate pagination html
    let paginationHtml = paginationMarkup(posts.length, limit, currentPage);

    //inject pagination html to site
    $("#pagination").html(paginationHtml);

    //array of posts to render on current page
    let postsToRender = [];

    //if page is 1 get first x posts (x = limit)
    if (currentPage == 1) {
        postsToRender = posts.slice(0, limit);
    } else {
        //calculate start of next posts to render
        const offset = limit * currentPage - limit;

        //get next x posts from offset to offset + limit
        postsToRender = posts.slice(offset, offset + limit);
    }

    //return user to home.
    if (postsToRender.length == 0) {
        window.location.href = "/";
    } else {
        //return posts to render
        return postsToRender;
    }
}