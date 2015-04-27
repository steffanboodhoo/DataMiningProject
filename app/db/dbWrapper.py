import json
import yaml
import db
from bson.json_util import dumps
import app.Regression.RegressionEval as evl
import app.Regression.RegressionWrapper as regr
import app.wrappers.ClassificationWrapper as classify
import numpy as np

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
'''
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
'''
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
	resp = db.createDataset(dataObj)
	'''
	resp = testData(dataObj)
	if resp == True:
		print "success"
		resp = db.createDataset(dataObj)
	else:
		print resp
	'''
	return dumps(resp)

def getOneDataset(purpose,code):
	resp = db.getAdataset(name,purpose)
	return dumps(resp)

def getFilteredFullDatasets(name,technique,purpose):
	print 'getFilterFull'
	filterObj = {}
	resp = []
	if name != None:
		filterObj['name'] = str(name)

	if technique != None:
		filterObj['type'] = str(technique)

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
		filterObj['type'] = str(technique)

	if purpose != None:
		if str(purpose) == 'Mining':
			resp = dumps( db.getMineFilter(filterObj))
		else:
			resp = dumps( db.getTrainFilter(filterObj))
	else:
		resp.append( db.getMineFilter(filterObj))
		resp.append( db.getTrainFilter(filterObj))
	return dumps(resp)


def mine(name,technique,method,normalization,standardization):
	#fetching from database
	print name,',',technique
	mineObj = db.getAdataset(name,'Mining')
	trainObj = db.getAdataset(name,'Training')
	print mineObj
	print trainObj
	mineData = np.array(mineObj['data'])
	trainData = np.array(trainObj['data'])

	#seperating sets to fit model
	L = len(trainData[0])
	n = len(trainData)
	
	tdataY = trainData[0:n,(L-1)]
	tdataX = trainData[0:n,0:(L-1)]
	#training data:x,y; mining data mineData (a set of x attributes i.e. independent)

	#applying preprocessing methods Normailization / Standardization
	if normalization=="yes":
		tdataX = normalize(tdataX)
		mineData = normalize(mineData)

	#finally ready to apply data mining
	resp = None
	if technique=="regression":
		resp = regr.handleRequest(tdataX,tdataY,mineData,method)
	elif technique=="classification":
		resp = classify.handleRequest(tdataX,tdataY,mineData)

	errors = evl.allErrors(resp['testY'],resp['testPredY'])
	resp['errors'] = errors
	return dumps(resp)

def normalize(attributes):

	#ensuring the values are floats
	fixedDataX=[]
	for e in attributes:
		row=[]
		for f in e:
			f=float(f)
			row.append(f)
		fixedDataX.append(row)
	
	#normalizing each feature
	attributes = np.array(fixedDataX)
	L = len(attributes[0])
	n = len(attributes)
	for i in range(L):
		feature = np.array(attributes[0:n,i])
		feature = normalizeRow(feature)
		#feature = preprocessing.normalize(feature[:,np.newaxis], axis=0).ravel()
		attributes[0:n,i] = feature
		
	#attributes = preprocessing.normalize(fixedDataX)
	print attributes
	return attributes

	def normalizeRow(row):
		maximum = np.amax(row)
		minimum = np.amin(row)
		div = maximum - minimum
		v = []
		for e in row:
			v.append( (maximum - e) / div )
		#print v
		return v