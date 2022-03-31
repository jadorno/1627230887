from flask import Blueprint, jsonify, request, make_response, current_app
from sqlalchemy import create_engine
from pathlib import Path
import traceback
import datetime
import json
import pandas as pd

api = Blueprint('api_threshold', __name__)

@api.route('/datasets', methods=['GET'])
def get_threshold_datasets():
	try:

		src_path = Path('/usr/src/data/')
		index_path = src_path.joinpath('index.db')

		engine = create_engine('sqlite:///'+str(index_path), echo=False)
		sqlite_connection = engine.connect()

		query = 'SELECT DISTINCT dataset FROM "index";'
		result = pd.read_sql(query, con=engine)

		sqlite_connection.close()
		payload = result.dataset.values.tolist()

		response = make_response(jsonify(payload), 200)
		return response

	except Exception as e:
		print(traceback.format_exc(), flush=True)
		print(e, flush=True)
		return make_response('python-exception', 500)

@api.route('/algorithms', methods=['GET'])
def get_threshold_algorithms():
	try:

		dataset = request.args.get('dataset', None)
		if dataset is not None:

			src_path = Path('/usr/src/data/')
			index_path = src_path.joinpath('index.db')

			engine = create_engine('sqlite:///'+str(index_path), echo=False)
			sqlite_connection = engine.connect()

			query = 'SELECT DISTINCT algorithm FROM "'+dataset+'";'
			result = pd.read_sql(query, con=engine)

			sqlite_connection.close()
			payload = result.algorithm.values.tolist()
			response = make_response(jsonify(payload), 200)

		else:
			response =  make_response('missing-args', 500)			

		return response

	except Exception as e:
		print(traceback.format_exc(), flush=True)
		print(e, flush=True)
		return make_response('python-exception', 500)

@api.route('/sampling', methods=['GET'])
def get_threshold_sampling():
	try:

		dataset = request.args.get('dataset', None)
		if dataset is not None:

			src_path = Path('/usr/src/data/')
			index_path = src_path.joinpath('index.db')

			engine = create_engine('sqlite:///'+str(index_path), echo=False)
			sqlite_connection = engine.connect()

			query = 'SELECT DISTINCT sampling FROM "'+dataset+'";'
			result = pd.read_sql(query, con=engine)

			sqlite_connection.close()
			payload = result.sampling.values.tolist()
			response = make_response(jsonify(payload), 200)

		else:
			response =  make_response('missing-args', 500)			

		return response

	except Exception as e:
		print(traceback.format_exc(), flush=True)
		print(e, flush=True)
		return make_response('python-exception', 500)

@api.route('/size', methods=['GET'])
def get_threshold_size():
	try:

		dataset = request.args.get('dataset', None)
		if dataset is not None:

			src_path = Path('/usr/src/data/')
			index_path = src_path.joinpath('index.db')

			engine = create_engine('sqlite:///'+str(index_path), echo=False)
			sqlite_connection = engine.connect()

			query = 'SELECT DISTINCT size FROM "'+dataset+'";'
			result = pd.read_sql(query, con=engine)

			sqlite_connection.close()
			payload = result['size'].values.tolist()
			response = make_response(jsonify(payload), 200)

		else:
			response =  make_response('missing-args', 500)			

		return response

	except Exception as e:
		print(traceback.format_exc(), flush=True)
		print(e, flush=True)
		return make_response('python-exception', 500)

@api.route('/opacity', methods=['GET'])
def get_threshold_opacity():
	try:

		dataset = request.args.get('dataset', None)
		if dataset is not None:

			src_path = Path('/usr/src/data/')
			index_path = src_path.joinpath('index.db')

			engine = create_engine('sqlite:///'+str(index_path), echo=False)
			sqlite_connection = engine.connect()

			query = 'SELECT DISTINCT opacity FROM "'+dataset+'";'
			result = pd.read_sql(query, con=engine)

			sqlite_connection.close()
			payload = result.opacity.values.tolist()
			response = make_response(jsonify(payload), 200)

		else:
			response =  make_response('missing-args', 500)			

		return response

	except Exception as e:
		print(traceback.format_exc(), flush=True)
		print(e, flush=True)
		return make_response('python-exception', 500)

@api.route('/cluster', methods=['GET'])
def get_threshold_cluster():
	try:

		dataset = request.args.get('dataset', None)
		if dataset is not None:

			src_path = Path('/usr/src/data/')
			index_path = src_path.joinpath('index.db')

			engine = create_engine('sqlite:///'+str(index_path), echo=False)
			sqlite_connection = engine.connect()

			query = 'SELECT DISTINCT clusters FROM "'+dataset+'";'
			result = pd.read_sql(query, con=engine)

			sqlite_connection.close()
			payload = result.clusters.values.tolist()
			response = make_response(jsonify(payload), 200)

		else:
			response =  make_response('missing-args', 500)			

		return response

	except Exception as e:
		print(traceback.format_exc(), flush=True)
		print(e, flush=True)
		return make_response('python-exception', 500)

@api.route('/get', methods=['GET'])
def get_threshold_get():
	try:

		dataset = request.args.get('dataset', None)
		algorithms = request.args.get('algorithms', None)
		if algorithms is not None:
			algorithms = json.loads(algorithms)
		sampling = request.args.get('sampling', None)
		if sampling is not None:
			sampling = json.loads(sampling)
		size = request.args.get('size', None)
		if size is not None:
			size = json.loads(size)
		opacity = request.args.get('opacity', None)
		if opacity is not None:
			opacity = json.loads(opacity)
		cluster = request.args.get('cluster', None)
		if cluster is not None:
			cluster = json.loads(cluster)
		results = request.args.get('results', None)
		if results is not None:
			results = json.loads(results)

		if dataset is not None and sampling is not None and size is not None and opacity is not None and cluster is not None:

			src_path = Path('/usr/src/data/')
			index_path = src_path.joinpath('index.db')

			engine = create_engine('sqlite:///'+str(index_path), echo=False)
			sqlite_connection = engine.connect()

			query = 'SELECT * FROM "'+dataset+'" WHERE '

			if isinstance(sampling, list):
				if len(sampling) > 1:
					query = query + 'sampling >= '+str(sampling[0])+' AND '
					query = query + 'sampling <= '+str(sampling[1])+' AND '
				else:
					query = query + 'sampling == '+str(sampling[0])+' AND '
			else:
				query = query + 'sampling == '+str(sampling)+' AND '

			if isinstance(opacity, list):
				if len(opacity) > 1:
					query = query + 'opacity >= '+str(opacity[0])+' AND '
					query = query + 'opacity <= '+str(opacity[1])+' AND '
				else:
					query = query + 'opacity == '+str(opacity[0])+' AND '					
			else:
				query = query + 'opacity == '+str(opacity)+' AND '

			if isinstance(size, list):
				if len(size) > 1:
					query = query + 'size >= '+str(size[0])+' AND '
					query = query + 'size <= '+str(size[1])+' AND '
				else:
					query = query + 'size == '+str(size[0])+' AND '
			else:
				query = query + 'size == '+str(size)+' AND '

			if isinstance(cluster, list):
				if len(cluster) > 1:
					query = query + 'clusters >= '+str(cluster[0])+' AND '
					query = query + 'clusters <= '+str(cluster[1])+' AND '
				else:
					query = query + 'clusters == '+str(cluster[0])+' AND '
			else:
				query = query + 'clusters == '+str(cluster)+' AND '

			# if isinstance(algorithms, list):
			# 	query_booleans = query_booleans & (df.algorithm.apply(lambda x: x in algorithms))

			tmp = 'SELECT DISTINCT algorithm FROM "'+dataset+'";'
			tmp = pd.read_sql(tmp, con=engine)
			db_algorithm = set(tmp.algorithm.values.tolist())
			if isinstance(algorithms, list):
				for algorithm in algorithms:
					db_algorithm.remove(algorithm)
				for algorithm in db_algorithm:
					query = query + 'algorithm != "'+str(algorithm)+'" AND '

			query = query[:-4] + 'LIMIT '+str(results)
			# print(query)
			result = pd.read_sql(query, con=engine)
			sqlite_connection.close()

			result.scatter = ['api/data/'+str(Path(x).name) for x in result.scatter.values]
			response = make_response(result.to_json(orient='records'), 200)
			# payload = df.loc[query_booleans].sort_values(by=['distance'], ascending=False)

		else:
			response = make_response('missing-args', 500)			

		return response

	except Exception as e:
		print(traceback.format_exc(), flush=True)
		print(e, flush=True)
		return make_response('python-exception', 500)
