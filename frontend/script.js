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

window.addEventListener("load", function (e){
    fetch("http://localhost:3000/cities")
        .then(response => response.json())
        .then(cities => {ShowCities(cities)})
        .catch(error => {console.error("CHYBA",error)})
})


zavrit_button.addEventListener("click", function (e){
    e.preventDefault()

    modalWindow.classList.add("disabled")


})

vytvorit_button.addEventListener("click",function (e){
    e.preventDefault()

    createModalWindow.classList.remove("disabled")

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
                        komentare.innerHTML = "hovno";

                    })
                    .catch(error => {console.error("CHYBA",error)})
            })

        })


    }


}