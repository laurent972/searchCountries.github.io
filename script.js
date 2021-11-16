const searchInput = document.getElementById('search');
const results = document.getElementById('results');

let countries;
let searchTerm= " ";

const fetchCountries = async()=> {
    countries = await fetch("https://restcountries.com/v2/all?fields=name,population,flag")
    .then(res=>res.json())
};

const showCountries = async() =>{
    await fetchCountries();

    results.innerHTML = (
        countries
        .filter(country=>country.name.toLowerCase().includes(searchTerm.toLowerCase()
        ))
        .map(country=>(
            `
            
            <li class="country-item">
                <img class="country-flag" src="${country.flag}"/>
                <h3 class="country-name">${country.name}</h3>
                <div class="country-info">
                    <h2 class="country-population">${numberWithCommas(country.population)}</h2>
                    <h5>Habitants</h5>
                </div>
            </li>
            
            `

        )).join('')
        );

};

showCountries();

searchInput.addEventListener('input', (e)=> {searchTerm=e.target.value;
    showCountries();
})

function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}