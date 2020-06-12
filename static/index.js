document.addEventListener('DOMContentLoaded', () =>{
  const request = new XMLHttpRequest();
  request.open('GET', '/global');

  request.onload = () =>{
    const data = JSON.parse(request.responseText);
    const confirmed = data.confirmed;
    document.querySelector('#confirmed').innerHTML = confirmed;
    const deaths = data.deaths;
    document.querySelector('#deaths').innerHTML = deaths;
    const recovered = data.recovered;
    document.querySelector('#recovered').innerHTML = recovered;
    var select = document.querySelector('#countrySelect')
    for (var i = 0; i < data.countries.length; i++) {
      const country = data.countries[i];
      const opt = document.createElement('option');
      opt.appendChild( document.createTextNode(country.Name) );
      opt.value = country.Code;
      select.appendChild(opt);
    }
  }
  request.send();

  document.querySelector('#form-country').onsubmit = () =>{
    const request_country = new XMLHttpRequest();
    request_country.open('POST', '/country-data');

    request_country.onload = () =>{
      const data = JSON.parse(request_country.responseText);
      const results_cards = document.createElement('div');
      results_cards.setAttribute("style", "margin-top:100px;");
      results_cards.setAttribute("class", "card-deck col-12 align-middle");
      results_cards.appendChild(createCard("bg-primary", "Confirmed", data.confirmed));
      results_cards.appendChild(createCard("bg-danger", "Deaths", data.deaths));
      results_cards.appendChild(createCard("bg-success", "Recovered", data.recovered));
      document.querySelector('#results').appendChild(results_cards);
    }


    const country_select = document.querySelector('#countrySelect');
    const opt = country_select.options[countrySelect.selectedIndex];
    const data = new FormData();
    data.append('country', opt.value);
    request_country.send(data);
    return false;
  };

});

function createCard(class_card, heading, value) {
  const card = document.createElement('div');
  card.setAttribute("style", "max-width: 18rem;");
  card.setAttribute("class", `card text-white ${class_card} mb-3`);
  const header = document.createElement('div');
  header.setAttribute("class", "card-header");
  const header_value = document.createElement('h4');
  header_value.setAttribute("class", "text-center")
  header_value.innerHTML = heading;
  header.appendChild(header_value);
  card.appendChild(header);
  const body = document.createElement('div');
  body.setAttribute("class", "card-body");
  const body_value = document.createElement('h1');
  body_value.setAttribute("class", "text-center");
  body_value.innerHTML = value;
  body.appendChild(body_value);
  card.appendChild(body);
  return card;
}
