from flask import Flask
from pathlib import Path
from datetime import datetime
import traceback
import os
import pandas as pd
import json

from api.study import api as study_api
from api.threshold import api as threshold_api
from api.data import api as data_api


app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

app.register_blueprint(study_api, url_prefix='/api/study')
app.register_blueprint(threshold_api, url_prefix='/api/threshold')
app.register_blueprint(data_api, url_prefix='/api/data')

if __name__ == '__main__':

	port = int(os.environ.get('PORT', 80))
	debug = os.environ.get('FLASK_ENV', 'production')
	if debug == 'development':
		debug = True
	else:
		debug = False
	app.run(host= '0.0.0.0', port=port, debug=debug)
