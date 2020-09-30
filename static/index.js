document.addEventListener('DOMContentLoaded', function onDocumentLoaded() {
	var request = new XMLHttpRequest()
	request.open('GET', '/global')

	request.onload = function onLoad() {
		var { confirmed, deaths, recovered, countries } = JSON.parse(
			request.responseText
		)
		document.querySelector('#confirmed').innerHTML = confirmed
		document.querySelector('#deaths').innerHTML = deaths
		document.querySelector('#recovered').innerHTML = recovered
		var select = document.querySelector('#countrySelect')
		countries.forEach(appendCountryToSelect)

		function appendCountryToSelect({ Name, Code }) {
			var opt = document.createElement('option')
			opt.appendChild(document.createTextNode(Name))
			opt.value = Code
			select.appendChild(opt)
		}
	}
	request.send()

	document.querySelector('#form-country').onsubmit = function onSubmit() {
		var request_country = new XMLHttpRequest()
		request_country.open('POST', '/country-data')

		request_country.onload = () => {
			var { confirmed, deaths, recovered } = JSON.parse(
				request_country.responseText
			)
			var results_cards = document.createElement('div')
			results_cards.setAttribute('style', 'margin-top:100px;')
			results_cards.setAttribute('class', 'card-deck col-12 align-middle')
			results_cards.appendChild(
				createCard('bg-primary', 'Confirmed', confirmed)
			)
			results_cards.appendChild(createCard('bg-danger', 'Deaths', deaths))
			results_cards.appendChild(
				createCard('bg-success', 'Recovered', recovered)
			)
			document.querySelector('#results').appendChild(results_cards)
		}

		var countrySelect = document.querySelector('#countrySelect')
		var { value } = country_select.options[countrySelect.selectedIndex]
		var data = new FormData()
		data.append('country', value)
		request_country.send(data)
		return false
	}
})

function createCard(classCard, heading, value) {
	var card = document.createElement('div')
	card.setAttribute('style', 'max-width: 18rem;')
	card.setAttribute('class', `card text-white ${classCard} mb-3`)
	var header = document.createElement('div')
	header.setAttribute('class', 'card-header')
	var header_value = document.createElement('h4')
	header_value.setAttribute('class', 'text-center')
	header_value.innerHTML = heading
	header.appendChild(header_value)
	card.appendChild(header)
	var body = document.createElement('div')
	body.setAttribute('class', 'card-body')
	var body_value = document.createElement('h1')
	body_value.setAttribute('class', 'text-center')
	body_value.innerHTML = value
	body.appendChild(body_value)
	card.appendChild(body)
	return card
}
