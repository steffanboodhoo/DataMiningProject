import json
import yaml
import db
from sklearn import preprocessing
from bson.json_util import dumps
import app.Regression.RegressionEval as evl
import app.Regression.RegressionWrapper as regr
import app.Classification.ClassificationWrapper as classify
import app.Clustering.clusterWrapper as clstr
import numpy as np

def prepareData(dataObj):
	#parsing json to dictionary
	dataObj = yaml.load(dataObj)

	#convert the strings into floats
	dataset = dataObj['data']
	print dataObj

	dataset = convertFloats(dataset)
	dataObj['data']=dataset
	print dataObj
	if(dataObj['purpose']=="Training" and (dataObj['type'] != "clustering")):
		target = dataObj['target']
		
		fixedTarget = []
		for e in target:
			fixedTarget.append(float(e))

		#print fixedTarget,' !!!!!!!!!!!!!!\n'
		dataObj['target'] = fixedTarget
		
		if not isinstance(target[0], basestring):
			target = convertFloats(target)
		dataObj['target'] = target

	'''
	clustering training or mining has no target
	elif (dataObj['purpose'] == "Training" and dataObj['type'] == "clustering"):
		target = dataObj['target']
		target = convertFloats(target)
		dataObj['target'] = target
	'''
	print dataObj
	return dataObj

def convertFloats(dataset):
	fixedData=[]
	for e in dataset:
		row=[]
		for f in e:
			# Check for empty field
			if f == '':
				f = 'NaN'
			else:
				f = float(f)
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

def getOneDataset(purpose, code):
	resp = db.getAdataset(name,purpose)
	return dumps(resp)

def getFilteredFullDatasets(name, technique, purpose):
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
def checkForTrain(name, technique):
	print 'ive entered the wrapper checking for train data'
	resp = db.checkForTrain(name,technique)
	print resp
	return dumps(resp)

def getFilteredDatasetPreviews(name, technique, purpose):
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


def mine(name,technique,method,normalization,standardization,specializedParam):
	#fetching from database
	print name,',',technique
	mineObj = db.getAdataset(name,'Mining')
	trainObj = db.getAdataset(name,'Training')
	
	if(technique!='clustering'):
		tdataY = np.array(trainObj['target'])

	tdataX = np.array(trainObj['data'])
	mineData = np.array(mineObj['data'])

	#Set missing values in datasets
	# imp = preprocessing.Imputer(missing_values='NaN', strategy='mean', axis=0)
	# trainData = imp.fit_transform(trainData)
	# mineData = imp.fit_transform(mineData)

	#seperating sets to fit model
	#n = len(trainDataX)
	
	 
	 #training data:x,y; mining data mineData (a set of x attributes i.e. independent)
	'''
	#applying preprocessing methods Normailization / Standardization
	if normalization == "yes":
		tdataX = normalize(tdataX)
		mineData = normalize(mineData)

	if standardization == "yes":
		min_max_scaler = preprocessing.MinMaxScaler()
		tdataX = min_max_scaler.fit_transform(tdataX)
		mineData = min_max_scaler.fit_transform(mineData)
	'''
	#finally ready to apply data mining
	resp = None
	if technique=="regression":
		resp = regr.handleRequest(tdataX,tdataY,mineData,method)
	
	elif technique=="classification":
		resp = classify.handleRequest(tdataX,tdataY,mineData,method)
		resp['aggregate'] = countCategories(resp['Classes'])
		labels = db.getAdataset(name,'Training')
		resp['labels'] = labels['labels']
		print resp
	
	elif technique=="clustering":
		resp = clstr.handleRequest(trainObj['data'],mineObj['data'],method,specializedParam)
		resp['aggregate']=countCategories(resp['clusters'])
		print resp

	if technique == "regression":
		errors = evl.allErrors(resp['testY'],resp['testPredY'])
		print errors
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

def countCategories(v):
	aggregates={}
	for d in v:
		if d in aggregates:
			aggregates[d]+=1
		else:
			aggregates[d]=1
	return aggregates