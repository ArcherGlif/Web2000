
let containerPostButton    = document.getElementById("create_post_button")
let containerPosts      = document.getElementById("container_posts")
let containerFormPost   = document.getElementById("container_form_post")

let posts = []

function getPosts(){
    return posts
}

function addPost(post){
    getPosts().push(post)
}

function getFormatDate() {
    let month = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Декабря"
    ]
    let now = new Date()
    let idMonth = now.getMonth()

    let monthName = month[idMonth]
    let day = now.getDate()
    let year = now.getFullYear()

    return `${day} ${monthName} ${year}`
}

addPost({
    title:"Первый пост",
    description:"Этот первый пост послужил мне для создания страницы.",
    author:"Игнат",
    date:"19 Апреля 2020"
})

addPost({
    title:"Второй пост",
    description:"Этот пост послужил мне для определения растояния между постами и полность генерируемому посту из данных.",
    author:"Игнат",
    date:"23 Апреля 2020"
})

addPost({
    title:"Дизайн создания поста",
    description:"Создание дизайна формы для создания поста, ибо стандартное отображение не красиво выглядит",
    author:"Игнат",
    date:"24 Апреля 2020"
})

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
    let labelForTitle = domCreateElement("label")
    labelForTitle.innerText = "Заголовок"
    labelForTitle.setAttribute("for","form_post__title")

    let inputTitle = domCreateElement("input")
    inputTitle.setAttribute("id","form_post__title")
    inputTitle.setAttribute("name","title")
    inputTitle.setAttribute("type","text")
    inputTitle.required = true

    let labelForDescription = domCreateElement("label")
    labelForDescription.innerText = "Описание"
    labelForDescription.setAttribute("for","form_post__description")

    let inputDescription = domCreateElement("input")
    inputDescription.setAttribute("id","form_post__description")
    inputDescription.setAttribute("name","description")
    inputDescription.setAttribute("type","text")
    inputDescription.required = true

    let submit = domCreateElement("input")
    submit.setAttribute("type","submit")
    submit.setAttribute("value","Опубликовать")

    let submitCancel = domCreateElement("input")
    submitCancel.setAttribute("type","submit")
    submitCancel.setAttribute("value","Отмена")

    submitCancel.onclick = function(){
        containerFormPost.innerHTML = ""
        containerPostButton.appendChild(createUIPostButton())
    }

    let formPost = domCreateElement("form",
        [
            "form_post"
        ],
        [
            labelForTitle,
            inputTitle,
            labelForDescription,
            inputDescription,
            submit,
            submitCancel
        ]
    )

    formPost.onsubmit = function (e){
        e.preventDefault()
        let dataPost = {}
        let formPostData = new FormData(formPost)

        for (let [key,value] of formPostData)
            dataPost[key] = value

        dataPost["author"] = "Игнат"
        dataPost["date"] = getFormatDate()

        addPost(dataPost)

        containerFormPost.innerHTML = ""
        containerPosts.appendChild(createUIPost(dataPost))
        containerPostButton.appendChild(createUIPostButton())
    }

    formPost.setAttribute("id","form_post")

    return formPost
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

function createUIPostButton(){
    let button = domCreateElement("button")
    button.innerText = "Создать новый пост"
    button.onclick = function () {
        containerFormPost.innerHTML = ""
        containerFormPost.appendChild(createUIFormPost())
        containerPostButton.innerHTML = ""
    }
    return button
}

function renderPosts(where,posts){
    where.innerHTML = ""
    for (let post of posts) {
        where.appendChild(createUIPost(post))
    }
}

function renderPostButton(where){
    where.innerHTML = ""
    where.appendChild(createUIPostButton())
}

function renderBlog(){

    renderPosts(containerPosts ,getPosts())
    renderPostButton(containerPostButton)

}

renderBlog()
