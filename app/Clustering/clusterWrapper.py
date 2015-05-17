import KMeans_bare as kmBasic
import pylab

def handleRequest(train,mine,method,n_clusters):
	print method
	print 'we are in the Regression wrapper with our lovely data'
	if(method =='kmeans'):
		resp = Ridge(tDatax,tDatay,mineData)
	'''
	elif method =='kmeans-regression':
		resp = Linear(tDatax, tDatay, mineData)
	elif method =='kmeans-classifier':
	'''
	print resp
	return resp
	
def kMeansBasic(data,mine,n_clusters):
	k = kmBasic(data,n_clusters)
	Z = k.group(mine)
	resp = {'centroids':k.clusters,'clusters':Z}
	return resp

#def acceptData(trainData,testData):

#def predictLinear():
#def predictRidge():
