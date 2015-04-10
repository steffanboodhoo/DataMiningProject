from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dataset_database

def insertTest():
	dataset = db.dataset
	dataset.insert({'setA':[['a','b','c'],['a','b']]})

def getTest():
	dataset = db.dataset
	for data in dataset.find():
		print data 

if __name__ == '__main__':
	#insertTest()
	getTest()