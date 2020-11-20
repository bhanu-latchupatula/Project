from flask import render_template, url_for, request, jsonify, request, make_response
from fcoretest import app

from fcoretest.main import model
from scipy.integrate import odeint
import numpy as np


@app.route('/')
def get_entry():
    return render_template('index.html')

@app.route('/process-entry', methods=['POST'])
def process_entry():
    req = request.get_json()
    # print(req)
    flow_inlet = float(req['flow_inlet']) # F_in
    heat_inlet = float(req['heat_inlet']) # Q
    initial_level = float(req['initial_level']) 
    iterations = int(req['iterations'])
    print(iterations)
    # initial condition
    z = [initial_level, 300]
    A = 0.2
    T_in = 300
    rho_cp = 4000000

    t = np.linspace(0,25)
    k = 0.1
    y2  = odeint(model, z, t, args=(k, A, flow_inlet, T_in, heat_inlet, rho_cp))
    liquid_level = y2[:, 0]
    temperature = y2[:, 1]
    t = t.tolist()
    time = [round(num, 2) for num in t]
    result = {
        "liquid_level": liquid_level.tolist(),
        "temperature": temperature.tolist(),
        "time": time
    }
    res = make_response(jsonify(result), 200)
    return res



