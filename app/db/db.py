from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dataset_database

def createDataset(dataObj):
	if dataObj['purpose']=='training':
		dataset = db.Traindataset
	elif dataObj['purpose']=='mining':
		dataset = db.Minedataset
	dataset.insert(dataObj)

def getTrainDataset(name):
	dataset = db.Traindataset
	resp = dataset.find_one({'name':name})
	return resp

def getMineDataset(name):
	dataset = db.Minedataset
	resp = dataset.find_one({'name':name})
	return resp

def getTrainFilter(filterObj):
	dataset = db.Traindataset
	resp = []
	for d in dataset.find(filterObj,{'name':1,'type':1,'subject':1}):
		resp.append(d)
	return resp

def getMineFilter(filterObj):
	dataset = db.Minedataset
	resp = []
	for d in dataset.find(filterObj,{'name':1,'type':1,'subject':1}):
		resp.append(d)
	return resp

def checkForTrain(name,technique):
	dataset = db.dataset 
	dObj = dataset.find_one({'name':name,'type':technique},{'name':1,'type':1})
	if dObj == None:
		return {'status':'failure'}
	return {'status':'success'}

if __name__ == '__main__':
	getTest()
	#insertTest()
	