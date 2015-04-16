import json
import yaml
import db
from bson.json_util import dumps


def prepareData(dataObj):
	#parsing json to dictionary
	dataObj = yaml.load(dataObj)
	dataset = dataObj['data']

	#combing for if there are labels in the csv
	labels = None
	try:
		val = dataset[0,0]
		val = float(val)
	except Exception: 
		labels = dataset[0]
		dataset.remove(labels)

	if labels != None:
		dataObj['labels']=labels
	
	#convert the strings into floats
	dataset = convertFloats(dataset)
	dataObj['data']=dataset

	print dataObj
	return dataObj

def testData(dataObj):
	if dataObj['name'] == None:
		return {'status':'failure','reason':'No name given to dataset'}
	if dataObj['type'] == None:
		return {'status':'failure','reason':'No technique given to dataset'}
	if dataObj['purpose'] == None:
		return {'status':'failure','reason':'Purpose of dataset not stated'}
	if dataObj['purpose'] == 'Mining':
		obj = db.testMineForTrain(dataObj['name'],dataObj['type'])
		if obj['status'] == 'failure':
			return {'status':'failure','reason':'No training data found'}
	return True
	#dataset = db.getTreai

def convertFloats(dataset):
	fixedData=[]
	for e in dataset:
		row=[]
		for f in e:
			f=float(f)
			row.append(f)
		fixedData.append(row)

	return fixedData

def storeDataset(data):
	dataObj = prepareData(data)
	resp = testData(dataObj)
	if resp == True:
		print "success"
		resp = db.createDataset(dataObj)
	else:
		print resp
	return dumps(resp)

def getOneDataset(purpose,code):
	resp = db.getAdataset(purpose,code)
	return dumps(resp)

def getFilteredFullDatasets(name,technique,purpose):
	filterObj = {}
	resp = []
	if name != None:
		filterObj['name'] = str(name)

	if technique != None:
		filterObj['technique'] = str(technique)

	if purpose != None:
		if str(purpose) == 'Mining':
			resp = dumps( db.getMineFilterFull(filterObj))
		else:
			resp = dumps( db.getTrainFilterFull(filterObj))
	else:
		resp.append( db.getMineFilterFull(filterObj))
		resp.append( db.getTrainFilterFull(filterObj))
		return dumps(resp)
	

	#returns preview
def checkForTrain(name,technique):
	print 'ive entered the wrapper checking for train data'
	resp = db.checkForTrain(name,technique)
	print resp
	return dumps(resp)

def getFilteredDatasetPreviews(name,technique,purpose):
	filterObj = {}
	resp = []
	if name != None:
		filterObj['name'] = str(name)

	if technique != None:
		filterObj['technique'] = str(technique)

	if purpose != None:
		if str(purpose) == 'Mining':
			resp = dumps( db.getMineFilter(filterObj))
		else:
			resp = dumps( db.getTrainFilter(filterObj))
	else:
		resp.append( db.getMineFilter(filterObj))
		resp.append( db.getTrainFilter(filterObj))
		return dumps(resp)