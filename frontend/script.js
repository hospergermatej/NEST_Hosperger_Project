const divMesta = document.querySelector(".mesta")
const divPlaces = document.querySelector(".mesta_pamatky")
const modalWindow = document.getElementById("detail")

const jmeno = document.querySelector(".jmeno")
const rating = document.querySelector(".rating")
const foto = document.querySelector(".foto")
const popis = document.querySelector(".popis")
const komentare = document.querySelector(".komentare")
const komentar_form = document.querySelector(".komentar_form")
const zavrit_button = document.querySelector(".zavrit")
const vytvorit_button = document.querySelector(".vytvorit_misto")
const createModalWindow = document.getElementById("create_form")
const inputNazev = document.querySelector(".input_nazev")
const inputPopis = document.querySelector(".input_popis")
const formButton = document.querySelector(".vytvorit")
const inputKomentarJmeno = document.querySelector(".komentar_jmeno")
const inputKomentarCont = document.querySelector(".komentar_content")
const odeslatButton = document.querySelector(".odeslat")
const deleteButton = document.querySelector(".deleteButton")
const editform = document.getElementById("edit_form")
const editInputNazev = document.querySelector(".edit_input_nazev")
const editInputPopis = document.querySelector(".edit_input_popis")
const editButton = document.querySelector(".editButton")
const editSaveButton = document.querySelector(".editSaveButton")
const stars = document.querySelectorAll(".star")
const ratingCount = document.querySelector(".ratingCount")
const exitSaveButton = document.querySelector(".exitSaveButton")
const exitButton= document.querySelector(".exitButton")

let PlaceID;
let CityID;


function ShowComments(){

    fetch("http://localhost:3000/place/" + PlaceID + "/comments")
        .then(response => response.json())
        .then(comments => {
            comments.forEach(comment => {

                const commentDiv = document.createElement("div")
                komentare.appendChild(commentDiv)
                commentDiv.classList.add("komentar")

                const commentUserName = document.createElement("div")
                commentUserName.innerHTML = "username: " + comment.username
                commentDiv.appendChild(commentUserName)

                const commentContent = document.createElement("div")
                commentContent.innerHTML = "content: " +comment.content
                commentDiv.appendChild(commentContent)

                const commentCreated = document.createElement("div")
                commentCreated.innerHTML = "created at: " + comment.createdAt
                commentDiv.appendChild(commentCreated)

                const deleteButtonComment = document.createElement("button")
                deleteButtonComment.innerHTML = "DELETE"
                deleteButtonComment.style = "justify-content: flex-end; background-color: red; color: white; height: 30px;"
                commentDiv.appendChild(deleteButtonComment)


                deleteButtonComment.addEventListener("click", async function(e){
                    await fetch("http://localhost:3000/place/" + PlaceID + "/comments/" + comment.id ,{method:"DELETE"})

                    komentare.innerHTML = ""

                    ShowComments()
                })

            })
        })
}


odeslatButton.addEventListener("click", async function (e) {

    await fetch("http://localhost:3000/place/" + PlaceID + "/comments", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: inputKomentarJmeno.value, content: inputKomentarCont.value})
    })



    komentare.innerHTML= ""

    ShowComments()

    inputKomentarJmeno.value = ""
    inputKomentarCont.value = ""


})

window.addEventListener("load", function (e){
    fetch("http://localhost:3000/cities")
        .then(response => response.json())
        .then(cities => {ShowCities(cities)})
        .catch(error => {console.error("CHYBA",error)})
})

function ShowCities(Cities){

    divMesta.innerHTML = "";

    Cities.forEach(City => {
        const divMesto = document.createElement("div")
        divMesto.innerHTML = "";
        divMesto.classList.add("mesto")
        divMesta.appendChild(divMesto)


        const imageMesto = document.createElement("img")
        imageMesto.src="klatovy.png";
        divMesto.appendChild(imageMesto)

        const nameMesto = document.createElement("div")
        nameMesto.innerHTML = City.name;
        divMesto.appendChild(nameMesto)

        divMesto.addEventListener("click", function (e){
            fetch("http://localhost:3000/cities/"+ City.id + "/places")
                .then(response => response.json())
                .then(places => {ShowPlaces(places)})
                .catch(error => {console.error("CHYBA",error)})

            CityID = City.id

            divPlaces.classList.remove("disabled")
        })


    })

exitButton.addEventListener("click",function (e){
    createModalWindow.classList.add("disabled")
})

function ShowPlaces(Places){

    divPlaces.innerHTML = "";


    vytvorit_button.classList.remove("disabled")


    Places.forEach( Place =>{
        const divPlace = document.createElement("div")
        divPlace.innerHTML = "";
        divPlace.classList.add("pamatka")
        divPlaces.appendChild(divPlace)

        const imagePlace = document.createElement("img")
        imagePlace.src="klatovy.png";
        divPlace.appendChild(imagePlace)

        const namePlace = document.createElement("div")
        namePlace.innerHTML = Place.name;
        divPlace.appendChild(namePlace)


        divPlace.addEventListener("click", async function(e){
            modalWindow.classList.remove("disabled")
            fetch("http://localhost:3000/place/" + Place.id)
                .then(response => response.json())
                .then(place => {
                    jmeno.innerHTML = "";
                    popis.innerHTML = "";
                    foto.innerHTML = "";
                    komentare.innerHTML = "";

                    jmeno.innerHTML = place.name
                    popis.innerHTML = "popis města: " + place.description
                    const imageModalPlace = document.createElement("img")
                    imageModalPlace.src="klatovy.png";
                    foto.appendChild(imageModalPlace)




                })
                .catch(error => {console.error("CHYBA",error)})

            await fetch("http://localhost:3000/place/" + Place.id)
                .then(response => response.json())
                .then(place => {
                    ratingCount.innerHTML = "(" + place.ratingCount + ")"
                    stars.forEach( star => {
                        if (star.id <= Math.round(place.rating/place.ratingCount)){
                            star.classList.add("star_color")
                        }else{
                            star.classList.remove("star_color")
                        }
                    })
                })




            PlaceID = Place.id

            komentare.innerHTML = ""

            ShowComments()


        })



    })


}

stars.forEach(star =>{
    star.addEventListener("click", async function(e){
        await fetch("http://localhost:3000/place/" + PlaceID + "/rating/" + star.id,
            {method:"PUT"})
        await fetch("http://localhost:3000/place/" + PlaceID)
            .then(response => response.json())
            .then(place => {
                ratingCount.innerHTML = "(" + place.ratingCount + ")"
                stars.forEach( star => {
                    if (star.id <= Math.round(place.rating/place.ratingCount)){
                        star.classList.add("star_color")
                    }else{
                        star.classList.remove("star_color")
                    }
                })
            })
    })
})

exitSaveButton.addEventListener("click", function (e){
    editform.classList.add("disabled")
})

editButton.addEventListener("click",function (e){
    editform.classList.remove("disabled")

    fetch("http://localhost:3000/place/" + PlaceID)
        .then(response => response.json())
        .then(place => {
            editInputNazev.value = place.name
            editInputPopis.value = place.description
        })



})

    editSaveButton.addEventListener("click", async function(e){
        await fetch("http://localhost:3000/place/" + PlaceID,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },body:JSON.stringify({name:editInputNazev.value,description:editInputPopis.value})
        })
        editform.classList.add("disabled")

        jmeno.innerHTML = editInputNazev.value
        popis.innerHTML = editInputPopis.value

                fetch("http://localhost:3000/cities/" +CityID + "/places")
                    .then(response => response.json())
                    .then(places => {
                        ShowPlaces(places)
                    })
    })



    deleteButton.addEventListener("click",async function (e){
        await fetch("http://localhost:3000/place/" + PlaceID , {method:"DELETE"})

        modalWindow.classList.add("disabled")

        fetch("http://localhost:3000/cities/"+ CityID + "/places")
            .then(response => response.json())
            .then(places => {ShowPlaces(places)})
            .catch(error => {console.error("CHYBA",error)})
    })



formButton.addEventListener("click", async function (e){

   await fetch("http://localhost:3000/cities/"+ CityID + "/places",{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({name:inputNazev.value,description:inputPopis.value})
    })

    createModalWindow.classList.add("disabled")



    fetch("http://localhost:3000/cities/"+ CityID + "/places")
        .then(response => response.json())
        .then(places => {ShowPlaces(places)})
        .catch(error => {console.error("CHYBA",error)})


    inputNazev.value = ""
    inputPopis.value = ""

})


zavrit_button.addEventListener("click", function (e){
    e.preventDefault()

    modalWindow.classList.add("disabled")


})

vytvorit_button.addEventListener("click",function (e){
    e.preventDefault()

    createModalWindow.classList.remove("disabled")

})







}