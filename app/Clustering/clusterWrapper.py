import KMeans_bare as kmBasic
import pylab

def handleRequest(train,mine,method,n_clusters):
	print method
	print 'we are in the Clustering wrapper with our lovely data'
	if(method =='kmeans'):
		resp = kMeansBasic(train,mine,n_clusters)
	'''
	elif method =='kmeans-regression':
		resp = Linear(tDatax, tDatay, mineData)
	elif method =='kmeans-classifier':
	'''

	print resp,'\n'
	return resp
	
def kMeansBasic(data,mine,n_clusters):
	k = kmBasic.clstrCl(data,n_clusters)
	Z = k.group(mine)
	resp = {'centroids':k.centroids(),'clusters':Z}
	resp['mine']=mine
	return resp

#def acceptData(trainData,testData):

#def predictLinear():
#def predictRidge():
