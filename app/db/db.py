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
	return dumps(resp)

def getMineDataset(name):
	dataset = db.Minedataset
	resp = dataset.find_one({'name':name})
	return dumps(resp)

def getAllTrain(dataset_type):
	dataset = db.Traindataset
	resp = []
	for d in dataset.find({'type':dataset_type},{'name':1,'type':1,'subject':1}):
		resp.append(d)

	return dumps(resp)

def testMineForTrain(technique,name):
	dataset = db.dataset 
	dObj = dataset.find_one({'name':name,'type':technique})
	if dObj == None:
		return False
	return True

if __name__ == '__main__':
	getTest()
	#insertTest()
	