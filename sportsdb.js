// document.getElementById('error-message').style.display = 'none';
function searchUpdate(){
    const inputField = document.getElementById('inputField');
    const inputValue = inputField.value;
    inputField.value = '';
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputValue}`
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('error-not-found').style.display = 'none';
    document.getElementById('searchResult').textContent = '';
    if(inputValue <= 0){
        document.getElementById('error-message').style.display = 'block';
    }
    else{
        document.getElementById("spinner").classList.remove("d-none");
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchValue(data))
        // .catch(error => displaySearchNotFound(error));
    }
}

function displaySearchNotFound(){
    document.getElementById('error-not-found').style.display = 'block';
    // document.getElementById('error-not-found').innerText = error;
}

function displaySearchValue(data){

    const specificTeamResult = document.getElementById('specificTeamResult');
    specificTeamResult.textContent = '';
    document.getElementById("spinner").classList.add("d-none");
    document.getElementById('error-not-found').style.display = 'none';

    const searchResult = document.getElementById('searchResult');
    searchResult.textContent = '';
    const teams = data.teams;
    if(teams === null){
        displaySearchNotFound();
    }
    else{
        for(const team of teams){
            console.log(team);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick="specificMeal('${team.strTeam}')" class="card h-100">
            <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${team.strCountry}</h5>
              <h5 class="card-title">${team.strTeam}</h5>
              <p class="card-text">${team?.strDescriptionEN?.slice(0,150)}</p>
            </div>
            </div>`;
            searchResult.appendChild(div);
        }
    }
}

function specificMeal(teamName){
    const url2 = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${teamName}`;
    fetch(url2)
    .then(res => res.json())
    // .then(data => console.log(data));
    .then(data => displaySpecificTeam(data.teams));
};

function displaySpecificTeam(team){
    console.log(team);
    const specificTeamResult = document.getElementById('specificTeamResult');
    specificTeamResult.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card mx-auto" style="width: 18rem;">
            <img src="${team[0].strTeamBadge}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title text-center">${team[0].strCountry}</h5>
            <p class="card-text text-center">${team[0].strTeam}</p>
            <a href="${team[0].strWebsite}" class="btn btn-primary w-100">Go Website</a>
            </div>
        </div>`
    specificTeamResult.appendChild(div);
}
