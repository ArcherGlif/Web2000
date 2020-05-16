
let containerPostButton    = document.getElementById("create_post_button")
let containerPosts      = document.getElementById("container_posts")
let containerFormPost   = document.getElementById("container_form_post")

// ...
function getPosts(){
    return JSON.parse(localStorage.getItem("posts")) || []
}


// функция для поиска поста по id
function findPostById(findId){
    for(let post of getPosts()){
        if(post.id === findId){
            return post
        }
    }
    return null
}

function deletePostById(delId){
    let posts = getPosts().filter(post=>post.id !== delId)
    setPosts(posts)
}

// ...
function setPosts(posts){
    localStorage.setItem("posts",JSON.stringify(posts))
}

// функция для добавления поста в список постов
function addPost(post){
    let posts = getPosts();
    posts.push(post);
    setPosts(posts);
}
// функция для получения id для поста, после каждого вызова увеличивается на 1
function getLastId(){
    if (!localStorage.getItem("lastId")) {
        localStorage.setItem("lastId",JSON.stringify(2))
        return 1;
    } else {
        let id = JSON.parse(localStorage.getItem("lastId"))
        localStorage.setItem("lastId",id+1)
        return id
    }
}

// функция генерирует согодняшнюю дату в формате 1 января 2000
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

// функция создает DOM элемент с тегом tag, классами из списка listClass и добавляет дейтей из списка listChild
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

// функция создает форму создания ноговго поста, в сдучае наличия postData создает форму редактирования поста
function createUIFormPost(postData) {

    let labelForTitle = domCreateElement("label")
    labelForTitle.innerText = "Заголовок"
    labelForTitle.classList.add("form-post__label")

    let inputTitle = domCreateElement("input")
    inputTitle.setAttribute("name","title")
    inputTitle.setAttribute("type","text")

    let titleValue = postData ? postData.title || "" : ""
    inputTitle.setAttribute("value",titleValue)
    inputTitle.setAttribute("autocomplete","off")
    inputTitle.required = true

    let blockTitle = domCreateElement("div",["form-post-cell"],[inputTitle,labelForTitle])

    let labelForDescription = domCreateElement("label")
    labelForDescription.innerText = "Описание"
    labelForTitle.classList.add("form-post__label")

    let inputDescription = domCreateElement("textarea")
    labelForTitle.classList.add("form-post__textarea")
    inputDescription.setAttribute("form","form-add-post")
    inputDescription.setAttribute("name","description")

    let descValue = postData ? postData.description || "" : ""
    inputDescription.innerText = descValue
    inputDescription.setAttribute("rows","5")
    inputDescription.setAttribute("autocomplete","off")
    inputDescription.required = true

    let blockDescription = domCreateElement("div",["form-post-cell"],[inputDescription,labelForDescription])

    let labelForAuthor = domCreateElement("label")
    labelForAuthor.innerText = "Автор"
    labelForTitle.classList.add("form-post__label")

    let inputAuthor = domCreateElement("input")
    inputAuthor.setAttribute("name","author")
    inputAuthor.setAttribute("type","text")

    let authorValue = postData ? postData.author || "" : ""
    inputAuthor.setAttribute("value",authorValue)
    inputAuthor.setAttribute("autocomplete","off")
    inputAuthor.required = true

    let blockAuthor = domCreateElement("div",["form-post-cell"],[ inputAuthor, labelForAuthor])


    let buttonDelete

    if (postData) {

        buttonDelete = domCreateElement("input")
        buttonDelete.setAttribute("type","button")
        buttonDelete.classList.add("form-post_btn__delete")
        buttonDelete.setAttribute("value","Удалить")

        buttonDelete.onclick = function(){
            deletePostById(postData.id)
            containerFormPost.innerHTML = ""
            containerPostButton.appendChild(createUIPostButton())
            renderPosts(containerPosts)
        }

    }

    let submit = domCreateElement("input")
    submit.setAttribute("type","submit")
    submit.classList.add("form-post_btn__success")

    if(postData){
        submit.setAttribute("value","Сохранить")
    }else{
        submit.setAttribute("value","Опубликовать")

    }

    let buttonCancel = domCreateElement("input")
    buttonCancel.setAttribute("type","button")
    buttonCancel.classList.add("form-post_btn__cancel")
    buttonCancel.setAttribute("value","Отмена")



    let addChildInBlockSubmit = postData ? [ buttonCancel, buttonDelete, submit ] : [ buttonCancel, submit ]
    let blockSubmit = domCreateElement("div",["form-post-btn"],addChildInBlockSubmit)


    buttonCancel.onclick = function(){
        containerFormPost.innerHTML = ""
        containerPostButton.appendChild(createUIPostButton())
        renderPosts(containerPosts)
    }

    let formPost = domCreateElement("form",
        [
            "form-post"
        ],
        [
            blockTitle,
            blockDescription,
            blockAuthor,
            blockSubmit
        ]
    )

    formPost.onsubmit = function (e){
        console.log("submit")
        e.preventDefault()
        let dataPost = {}
        let formPostData = new FormData(formPost)

        for (let [key,value] of formPostData)
            dataPost[key] = value

        dataPost["id"] = getLastId()
        dataPost["date"] = getFormatDate()

        if (postData) {
            deletePostById(postData.id)
        }
        addPost(dataPost)

        containerFormPost.innerHTML = ""
        containerPostButton.appendChild(createUIPostButton())
        renderPosts(containerPosts)
    }

    formPost.setAttribute("id","form-add-post")

    return formPost
}

// функция создает верстку поста по данным этого поста
function createUIPost(postData) {

    let postTitle   = domCreateElement("div",["post_title"])
    postTitle.innerText = postData.title
    postTitle.setAttribute("id-post", postData.id)

    postTitle.onclick = function(e){
        containerFormPost.innerHTML = ""
        containerPosts.innerHTML = ""
        containerFormPost.appendChild(createUIFormPost(postData))
        containerPostButton.innerHTML = ""
    }


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

// функция создает верстку кнопки для создания нового поста
function createUIPostButton(){
    let button = domCreateElement("button")
    button.innerText = "Создать новый пост"
    button.onclick = function () {
        containerFormPost.innerHTML = ""
        containerPosts.innerHTML = ""
        containerFormPost.appendChild(createUIFormPost())
        containerPostButton.innerHTML = ""
    }
    return button
}

// функция создает верстку всех постов и ложит их в контейнер where
function renderPosts(where){
    where.innerHTML = ""
    for (let post of getPosts()) {
        where.appendChild(createUIPost(post))
    }
}

// функция создает верстку кнопки создания нового поста ложит ее в контейнер where
function renderPostButton(where){
    where.innerHTML = ""
    let button = createUIPostButton()
    where.appendChild(button)
}
// функция рендерит всю верстку нажную для первого экрана ( все посты и кнопку создания нового поста )
function renderBlog(){

    renderPosts(containerPosts)
    renderPostButton(containerPostButton)

}

renderBlog()


