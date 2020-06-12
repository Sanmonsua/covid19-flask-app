from flask import Flask, request, render_template, jsonify
import pandas as pd
import json
from api import *

app = Flask(__name__)

data_countries = pd.read_csv('countries.csv')
countries = json.loads(data_countries.to_json(orient='records'))
data_global = getTotal()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/global')
def globalData():
    return jsonify({
        "confirmed": data_global['confirmed'],
        "deaths": data_global['deaths'],
        "recovered": data_global['recovered'],
        "countries": countries
    })

@app.route('/country-data', methods=['POST'])
def country():

    country_code = request.form.get('country')
    data = getDataForCountry(country_code)
    #print(country['Name'])
    return jsonify({
        "confirmed": data['confirmed'],
        "deaths": data['deaths'],
        "recovered": data['recovered']
    })
