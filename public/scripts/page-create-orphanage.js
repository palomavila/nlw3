// create map
const map = L.map('mapid').setView([-22.5076514,-43.1779323], 15);

//create tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68]
});

//create
let marker;
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;
    // remove icon
    marker && map.removeLayer(marker);

    //add icon
    marker = L.marker([lat,lng], { icon })
    .addTo(map);
})

// add photo
function addPhotoField () {
    //pegar o container de fotos #images
    const container = document.querySelector('#images');
    //pegar o container para duplicar .new-images
    const fieldsContainer = document.querySelectorAll('.new-upload');
    //realizar o clone da última image adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);
    //checar se esta vazio
    const input = newFieldContainer.children[0];
    if (input.value == "") {
        return
    }
    //limpar
    input.value = "";
    //adicionar o clone ao container de #images
    container.appendChild(newFieldContainer);
}

function deleteField (event) {
    const span = event.currentTarget;

    const fieldsContainer = document.querySelectorAll('.new-upload');

    if (fieldsContainer.length <= 1) {
        //limpar o valor do campo
        span.parentNode.children[0].value = "";
        return
    }
    //deletar
    span.parentNode.remove();
}

//sim e não
function toggleSelect (event) {
    //remove active class from buttons
    document.querySelectorAll('.button-select button')
    .forEach(button => button.classList.remove('active'));
    //update active class
    const button = event.currentTarget;
    button.classList.add('active');
    //update hidden
    const input = document.querySelector('[name="open_on_weekends"]');
    //check yes or no
    input.value = button.dataset.value;
}

function validate(event) {
    //validate lat and lng
    const needsLatAndLng = false;
    if (needsLatAndLng) {
        event.preventDefault();
        alert('Selecione um ponto no mapa');
    }
}
