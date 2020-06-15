from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, Response, jsonify

import requests
import os
import sys
import logging

flask_backend = Flask(__name__)

import logging
logging.basicConfig(level=logging.DEBUG)
flask_backend.config['TEMPLATES_AUTO_RELOAD'] = True

@flask_backend.route("/api/test", methods=['POST'])
def test():
    data = request.get_json(force=True)

    print(data)
    return jsonify({'Item 1':'chicken', 'Item 2':'steak', 'Item 3':'wegetarian for Raghav'})
    #return {"response": list(map(lambda x:x.serialize(), res_dict))}


#page-serve routes
@flask_backend.route("/")
#@flask_backend.route("/login")
#@flask_backend.route("/<path:path>")



def index():
    
    return render_template("index.html"), token="penpineappleapplepen")
flask_backend.run(debug=True, use_reloader=False)
