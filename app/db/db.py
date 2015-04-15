from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dataset_database

def createDataset(dataObj):
	if dataObj['purpose']=='training':
		dataset = db.Traindataset
	elif dataObj['purpose']=='mining':
		dataset = db.Minedataset
	dataset.insert(dataObj)

def getAdataset(purpose,code):
	if purpose =='training':
		dataset = db.Traindataset
	elif purpose =='mining':
		dataset = db.Minedataset
	return dataset.find_one({'code':code})

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

def getTrainFilterFull(filterObj):
	dataset = db.Traindataset
	resp = []
	for d in dataset.find(filterObj):
		resp.append(d)
	return resp

def getMineFilterFull(filterObj):
	dataset = db.Minedataset
	resp = []
	for d in dataset.find(filterObj):
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
	