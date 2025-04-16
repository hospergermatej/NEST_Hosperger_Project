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


let PlaceID;
let CityID;


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

    fetch("http://localhost:3000/place/" + PlaceID + "/comments")
        .then(response => response.json())
        .then(comments => {
            comments.forEach(comment => {

                const commentDiv = document.createElement("div")
                komentare.appendChild(commentDiv)
                commentDiv.classList.add("komentar")

                const commentUserName = document.createElement("div")
                commentUserName.innerHTML = comment.username
                commentDiv.appendChild(commentUserName)

                const commentContent = document.createElement("div")
                commentContent.innerHTML = comment.content
                commentDiv.appendChild(commentContent)

                const commentCreated = document.createElement("div")
                commentCreated.innerHTML = comment.createdAt
                commentDiv.appendChild(commentCreated)
            })
        })

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

        })


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

        divPlace.addEventListener("click", function (e){
            modalWindow.classList.remove("disabled")
            fetch("http://localhost:3000/place/" + Place.id)
                .then(response => response.json())
                .then(place => {
                    jmeno.innerHTML = "";
                    popis.innerHTML = "";
                    foto.innerHTML = "";
                    komentare.innerHTML = "";

                    jmeno.innerHTML = place.name
                    popis.innerHTML = place.description
                    const imageModalPlace = document.createElement("img")
                    imageModalPlace.src="klatovy.png";
                    foto.appendChild(imageModalPlace)


                })
                .catch(error => {console.error("CHYBA",error)})

            fetch("http://localhost:3000/place/" + Place.id + "/comments")
                .then(response => response.json())
                .then(comments => {
                    comments.forEach(comment => {

                        const commentDiv = document.createElement("div")
                        komentare.appendChild(commentDiv)
                        commentDiv.classList.add("komentar")

                        const commentUserName = document.createElement("div")
                        commentUserName.innerHTML = comment.username
                        commentDiv.appendChild(commentUserName)

                        const commentContent = document.createElement("div")
                        commentContent.innerHTML = comment.content
                        commentDiv.appendChild(commentContent)

                        const commentCreated = document.createElement("div")
                        commentCreated.innerHTML = comment.createdAt
                        commentDiv.appendChild(commentCreated)



                    })
                })
            PlaceID = Place.id
        })



    })


}


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