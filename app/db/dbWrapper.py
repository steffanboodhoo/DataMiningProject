import json
import yaml

def storeDataset(data):
	print data
	print '\n\nretrieving data'
	#datastr = str(data)
	dataObj = yaml.load(data)
	dataset = dataObj['data']
	dataset = convertFloats(dataset)
	dataObj['data']=dataset
	print dataObj
import db

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