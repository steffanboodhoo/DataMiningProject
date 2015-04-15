import json
import yaml
import db

def storeDataset(data):
	dataObj = prepareData(data)
	resp = testData(dataObj)
	if resp == True:
		print "success"
	else:
		print resp
	return resp
	

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

def getAllTrain(technique):
	train = db.getAllTrain(technique)
	return train