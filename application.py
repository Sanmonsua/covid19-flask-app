from flask import Flask, request, render_template
import pandas as pd
import json
from api import *

app = Flask(__name__)

data_countries = pd.read_csv('countries.csv')
countries = json.loads(data_countries.to_json(orient='records'))
data_global = getTotal()


@app.route('/')
def index():

    return render_template('index.html',
        confirmed=data_global['confirmed'],
        deaths=data_global['deaths'],
        recovered=data_global['recovered'],
        countries = countries
    )

@app.route('/country', methods=['POST'])
def country_data():
    code = request.form.get('country')
    country = data_countries.loc[data_countries['Code'] == code]
    data = getDataForCountry(country['Code'])
    #print(country['Name'])
    return render_template(
        'country.html',
        confirmed=data_global['confirmed'],
        deaths=data_global['deaths'],
        recovered=data_global['recovered'],
        countries = countries,
        confirmed_c=data['confirmed'],
        deaths_c=data['deaths'],
        recovered_c=data['recovered'],
        name = country.iloc[0]['Name']
    )
