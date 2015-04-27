from pymongo import MongoClient

URI = "mongodb://adminuser:adminuser@ds061611.mongolab.com:61611/datamining"
client = MongoClient(URI)
db = client.get_default_database()

def createDataset(dataObj):
	if dataObj['purpose'] == 'Training':
		dataset = db.Traindataset
	elif dataObj['purpose'] == 'Mining':
		dataset = db.Minedataset
	dataset.insert(dataObj)
	return {'status':'success'}

def getAdataset(name, purpose):
	if purpose == 'Training':
		dataset = db.Traindataset
	elif purpose == 'Mining':
		dataset = db.Minedataset
	return dataset.find_one({'name':name})
	 
def getTrainFilter(filterObj):
	dataset = db.Traindataset
	resp = []
	for d in dataset.find(filterObj,{'name':1,'type':1,'subject':1,'purpose':1}):
		resp.append(d)
	return resp

def getMineFilter(filterObj):
	dataset = db.Minedataset
	resp = []
	for d in dataset.find(filterObj,{'name':1,'type':1,'subject':1,'purpose':1}):
		resp.append(d)
	return resp

def getTrainFilterFull(filterObj):
	print(filterObj)
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

def checkForTrain(name, technique):
	dataset = db.Traindataset 
	dObj = dataset.find_one({'name':name,'type':technique})
	if dObj == None:
		return {'status':'failure'}
	return {'status':'success'}

if __name__ == '__main__':
	getTest()
	#insertTest()