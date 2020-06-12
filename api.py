import requests

def getTotal():
    """
        Returns the latest data from the
        COVID-19 api.
        Total cases, deaths, and recovered
    """
    url = "https://covid-19-data.p.rapidapi.com/totals"
    querystring = {"format":"json"}
    headers = {
        'x-rapidapi-host': "covid-19-data.p.rapidapi.com",
        'x-rapidapi-key': "a03ee70f38msh668bb7cac193421p14c8a6jsncb658a19b591"
        }
    response = requests.request("GET", url, headers=headers, params=querystring)

    return response.json()[0]

def getDataForCountry(code):
    """
        Returns the latest data related to a country code
    """
    url = "https://covid-19-data.p.rapidapi.com/country/code"
    querystring = {"format":"json","code":code}
    headers = {
        'x-rapidapi-host': "covid-19-data.p.rapidapi.com",
        'x-rapidapi-key': "a03ee70f38msh668bb7cac193421p14c8a6jsncb658a19b591"
        }
    response = requests.request("GET", url, headers=headers, params=querystring)
    return response.json()[0]

if __name__ == "__main__":
    print(getTotal()['confirmed'])
    #print(getDataForCountry('Colombia'))
