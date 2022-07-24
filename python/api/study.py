from flask import Blueprint, jsonify, request, make_response, current_app
from sqlalchemy import create_engine
from pathlib import Path
import traceback
import datetime
import json
import pandas as pd
import time
import json
import random

api = Blueprint('api_study', __name__)

@api.route('/config', methods=['GET'])
def get_study_config():
	try:

		src_path = Path('/usr/src/data/')
		index_path = src_path.joinpath('index.db')

		datasets = ["mnisttsne","swiss_roll_2d","swiss_roll_3d","condition_based_maintenance","clothes","epileptic_seizure"]
		random.shuffle(datasets)

		compare_01 = [
			{
				'imgA':'high',
				'imgB':'high'
			},{
				'imgA':'low',
				'imgB':'low'
			},{
				'imgA':'medium',
				'imgB':'medium'
			},{
				'imgA':'high',
				'imgB':'low'
			},{
				'imgA':'high',
				'imgB':'medium'
			},{
				'imgA':'medium',
				'imgB':'low'
			}
		]

		compare_02 = [
		    {
		    	'imgA':'low',
		    	'imgB':'medium',
		    	'imgR':'low'
		    },{
		    	'imgA':'medium',
		    	'imgB':'high',
		    	'imgR':'low'
		    },{
		    	'imgA':'low',
		    	'imgB':'high',
		    	'imgR':'low'
		    },{
		    	'imgA':'high',
		    	'imgB':'medium',
		    	'imgR':'high'
		    },{
		    	'imgA':'medium',
		    	'imgB':'low',
		    	'imgR':'high'
		    },{
		    	'imgA':'high',
		    	'imgB':'low',
		    	'imgR':'high'
		    }
		]

		skip_algorithms = ['RecursiveSubdivisionBasedSampling','SVDBasedSampling']

		auc_mask_values = {
			'abalone': [0.33 * 4,0.66 * 4],
			'bitcointsne': [0.33 * 1,0.66 * 1],
			'clothes': [0.33 * 2.5,0.66 * 2.5],
			'condition_based_maintenance': [0.33 * 2,0.66 * 2],
			'crowdsourced_mapping': [0.33 * 3,0.66 * 3],
			'epileptic_seizure': [0.33 * 1,0.66 * 1],
			'mnisttsne': [0.33 * 3,0.66 * 3],
			'swiss_roll_2d': [0.33 * 3,0.66 * 3],
			'swiss_roll_3d': [0.33 * 4,0.66 * 4],
			'ugulinotsne': [0.33 * 2,0.66 * 2],
		}

		engine = create_engine('sqlite:///'+str(index_path), echo=False)
		sqlite_connection = engine.connect()

		q_algorithm = ''
		for skip_algorithm in skip_algorithms:
			q_algorithm = q_algorithm + ' AND algorithm != "'+skip_algorithm+'"'

		payload = []

		for idx, dataset in enumerate(datasets):
			q_base = 'SELECT * FROM "'+dataset+'" WHERE '
			q_distance = {
				'high': 'distance >= 0.066 AND distance != 9e999',
				'low': 'distance <= 0.033 AND distance != 9e999',
				'medium': 'distance > 0.033 AND distance < 0.066 AND distance != 9e999'
			}

			result_set = {}
			for key in compare_01[idx]:
				query = q_base + q_distance[compare_01[idx][key]] + q_algorithm
				result = pd.read_sql(query, con=engine).sample()
				result = result.to_dict(orient='records')[0]
				result['scatter'] = 'api/data/'+ result['dataset'] +'-'+ result['algorithm'] +'-'+ str(int(result['sampling'])) +'-'+ str(result['size']) +'-'+ str(int(result['opacity'])) + '.png'
				result['bin'] = compare_01[idx][key]
				del result['json']
				del result['clusters']
				del result['auc']
				del result['auc_total']
				result_set[key] = result
			payload.append(result_set)

		for idx, dataset in enumerate(datasets):
			q_base = 'SELECT * FROM "'+dataset+'" WHERE '
			q_distance = {
				'high': 'distance >= 0.066 AND distance != 9e999',
				'low': 'distance <= 0.033 AND distance != 9e999',
				'medium': 'distance > 0.033 AND distance < 0.066 AND distance != 9e999'
			}

			result_set = {}
			for key in compare_01[idx]:
				query = q_base + q_distance[compare_01[idx][key]] + q_algorithm
				result = pd.read_sql(query, con=engine).sample()
				result = result.to_dict(orient='records')[0]
				result['scatter'] = 'api/data/'+ result['dataset'] +'-'+ result['algorithm'] +'-'+ str(int(result['sampling'])) +'-'+ str(result['size']) +'-'+ str(int(result['opacity'])) + '.png'
				result['bin'] = compare_01[idx][key]
				del result['json']
				del result['clusters']
				del result['auc']
				del result['auc_total']
				result_set[key] = result
			payload.append(result_set)

		for idx, dataset in enumerate(datasets):
			q_base = 'SELECT * FROM "'+dataset+'" WHERE '
			q_auc = {
				'high': 'auc_total >= '+str(auc_mask_values[dataset][1])+' AND distance != 9e999',
				'low': 'auc_total <= '+str(auc_mask_values[dataset][0])+' AND distance != 9e999',
				'medium': 'auc_total > '+str(auc_mask_values[dataset][0])+' AND auc_total < '+str(auc_mask_values[dataset][1])+' AND distance != 9e999'
			}

			result_set = {}
			for key in compare_02[idx]:
				query = q_base + q_auc[compare_02[idx][key]] + q_algorithm
				result = pd.read_sql(query, con=engine).sample()
				result = result.to_dict(orient='records')[0]
				result['scatter'] = 'api/data/'+ result['dataset'] +'-'+ result['algorithm'] +'-'+ str(int(result['sampling'])) +'-'+ str(result['size']) +'-'+ str(int(result['opacity'])) + '.png'
				result['bin'] = compare_02[idx][key]
				del result['json']
				del result['clusters']
				del result['auc']
				del result['distance']
				result_set[key] = result
			payload.append(result_set)

		sqlite_connection.close()

		response = make_response(jsonify(payload), 200)
		return response

	except Exception as e:
		print(traceback.format_exc(), flush=True)
		print(e, flush=True)
		return make_response('python-exception', 500)


@api.route('/submit', methods=['POST'])
def post_study_submit():
	try:

		data_path = Path('/usr/src/results/')
		dst_id = str(round(time.time() * 1000))
		dst_filename = dst_id+".json"
		dst_path = data_path.joinpath(dst_filename)
		# with open(dst_path, "w") as dst_file:
		#	json.dump(request.json, dst_file, indent=4)

		payload = { 'id': dst_id }
		response = make_response(jsonify(payload), 200)
		return response

	except Exception as e:
		print(traceback.format_exc(), flush=True)
		print(e, flush=True)
		return make_response('python-exception', 500)
