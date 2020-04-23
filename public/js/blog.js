
let createPostButton    = document.getElementById("create_post_button")
let containerPosts      = document.getElementById("container_posts")

let posts = [
    {
        title:"Второй пост",
        description:"Этот пост послужил мне для определения растояния между постами и полность генерируемому посту из данных.",
        author:"Игнат",
        date:"23 апреля 2020"
    },
]

function domCreateElement(tag, listClass, listChild){

    let element = document.createElement(tag)
    if (listClass && Array.isArray(listClass)) {
        listClass.forEach((cl)=>element.classList.add(cl))
    }
    if (listChild && Array.isArray(listChild)) {
        listChild.forEach((ch)=>element.appendChild(ch))
    }

    return element

}

function createUIFormPost() {
    return
}

function createUIPost(postData) {

    let postTitle   = domCreateElement("div",["post_title"])
    postTitle.innerText = postData.title

    let postDescription = domCreateElement("div",["post_description"])
    postDescription.innerText = postData.description

    let postAuthor = domCreateElement("div",["post_author"]);
    let postDate = domCreateElement("div",["post_date"]);
    postAuthor.innerText = `Автор: ${postData.author}`
    postDate.innerText = postData.date

    let postHeader  = domCreateElement("div",["post_header"], [postTitle])

    let postContainer = domCreateElement("div",["post_container"],[postDescription])

    let postFoother = domCreateElement("div",["post_foother"],[postAuthor,postDate])

    let post = domCreateElement("div",["post"], [postHeader,postContainer,postFoother])

    return post
}

function renderPosts(where,posts){
    for (let post of posts) {
        where.appendChild(createUIPost(post))
    }
}

renderPosts(containerPosts ,posts)

createPostButton.onclick = function () {
    createUIFormPost()
}