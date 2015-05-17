import KMeans_bare as kmBasic
import MeanShift as msBasic
import pylab

def handleRequest(train,mine,method,specialParam):
	if(method =='kmeans'):
		resp = kMeansBasic(train,mine,specialParam)
	if(method =='meanShift'):
		resp = meanShiftBasic(train,mine,specialParam)
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

def meanShiftBasic(data,mine,bandwidth):
	k = msBasic.clstrCl(data,bandwidth)
	Z = k.group(mine)
	resp = {'centroids':k.centroids(),'clusters':Z}
	resp['mine']=mine
	return resp

#def acceptData(trainData,testData):

#def predictLinear():
#def predictRidge():
