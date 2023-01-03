// region =========================== //
let apiRegion = 'https://restcountries.com/v3.1/region/';
let form = document.querySelector('form');


selectedRegion.addEventListener('change', (e) => {

    let selectedRegion = document.getElementById('selectedRegion').value;
    let getRegion = apiRegion + selectedRegion;


    console.log("result: " + getRegion);

    fetch(getRegion)
        .then(response => response.json())
        .then(data => initialize(data))
        .catch(error => {
            console.log("error!!!");
            console.error(error);
        });

    function initialize(listOfCountries) {
        const countries = listOfCountries;
        countries.sort((a, b) => {
            const nameA = a.name.common.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.common.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        })
        let options = "";
        for (let i = 0; i < countries.length; i++) {
            options += `<option value="${countries[i].cca3}">${countries[i].name.common}</option>`
        }



        document.getElementById('countryList').innerHTML = options;
    }
});



// country =========================== //
let apiCountry = 'https://restcountries.com/v3.1/alpha/';

popupBtn.addEventListener('click', (e) => {
    e.preventDefault()

    let getCountry = document.getElementById('countryList').value;
    let selectedCountry = apiCountry + getCountry;

    console.log(selectedCountry);

    let countryObject = "";

    fetch(selectedCountry)
        .then(response => {
            response.json()
                .then(data => {
                    countryObject = data

                    render = ""
                    render += `<div>Country: ${countryObject[0].name.common}</div>`
                    render += `<div>Capital: ${countryObject[0].capital || "Not defined"}</div>`
                    render += `<div>Population: ${countryObject[0].population.toLocaleString()}</div>`
                    render += `<div>Area: ${countryObject[0].area.toLocaleString()}</div>`
                    render += `<div>Currency Code: ${countryObject[0].currencies[Object.keys(countryObject[0].currencies)[0]].name} (${Object.keys(countryObject[0].currencies)[0]})</div>`
                    render += `<div><img src="${countryObject[0].flags.png}"></div>`
                    render += `<div class = "map">Map: <a href="${countryObject[0].maps.googleMaps}" target="_blank">Open in Google Maps</a></div>`

                    document.getElementById('output').innerHTML = render


                })
        })
        .catch(error => {
            console.log("error!!!");
            console.error(error);
        });


});

// popup =========================== //
function myFunction() {
    let popup = document.getElementById("popup");
    popup.classList.toggle("show");
}

let modal = document.getElementById("popup");
let span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none";
    window.location.reload(true);
}
