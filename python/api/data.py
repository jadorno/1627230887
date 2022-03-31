from flask import Blueprint, jsonify, request, make_response, current_app, send_file
from sqlalchemy import create_engine
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
from pathlib import Path
import pandas as pd
import numpy as np
import traceback
import io

api = Blueprint('api_data', __name__)

@api.route('/<string:name>', methods=['GET'])
def get_data(name):
	try:

		args = name.split('.')[0].split('-')
		dataset = args[0]
		algorithm = args[1]
		sampling = args[2]
		size = int(args[3])
		opacity = int(args[4]) / 100

		src_path = Path('/usr/src/data/')
		index_path = src_path.joinpath('index.db')

		engine = create_engine('sqlite:///'+str(index_path), echo=False)
		sqlite_connection = engine.connect()

		query = 'SELECT source FROM "index" WHERE "dataset" == "'+dataset+'" AND "sampling" == '+sampling+' AND "algorithm" == "'+algorithm+'"'
		result = pd.read_sql(query, con=engine)
		sqlite_connection.close()

		img_data_path = src_path.joinpath(result.source.values[0])
		img_data = np.load(img_data_path)

		fig = Figure()
		ax = fig.add_subplot()
		ax.spines['top'].set_visible(False)
		ax.spines['right'].set_visible(False)
		ax.spines['bottom'].set_visible(False)
		ax.spines['left'].set_visible(False)
		ax.set_xticks([])
		ax.set_xticks([], minor=True)
		ax.set_yticks([])
		ax.set_yticks([], minor=True)
		ax.scatter(img_data[:,0], img_data[:,1], s=size, alpha=opacity, lw=0, color='black')

		output = io.BytesIO()
		FigureCanvas(fig).print_png(output)

		response = make_response(output.getvalue(), 200)
		response.mimetype = 'image/png'
		return response

	except Exception as e:
		print(traceback.format_exc(), flush=True)
		print(e, flush=True)
		return make_response('python-exception', 500)
