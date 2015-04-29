import RegressionRigid as rdg
import RegressionLinear as lin
from sklearn import cross_validation
import pylab

def handleRequest(tDatax,tDatay,mineData,method):
	print method
	print 'we are in the Regression wrapper with our lovely data'
	print tDatay
	if(method =='ridge'):
		resp = Ridge(tDatax,tDatay,mineData)
	elif method =='linear':
		resp = Linear(tDatax, tDatay, mineData)
	print resp
	return resp
	
def Linear(tDataX,tDataY,mineData):
	X_train, X_test, y_train, y_test = cross_validation.train_test_split(tDataX, tDataY, test_size=0.4, random_state=0)
	#print X_train,' ',y_train y_train is wrong
	regLin = lin.RegLnr(y_train,X_train)
	test_pred = regLin.predictDataSet(X_test)
	#print test_pred
	#compute metrics now

	#do actual prediction
	actual_pred = regLin.predictDataSet(mineData)
	#print actual_pred
	return {'testY':y_test,'testPredY':test_pred,'actual_pred':actual_pred}

def Ridge(tDataX,tDataY,mineData):
	X_train, X_test, y_train, y_test = cross_validation.train_test_split(tDataX, tDataY, test_size=0.4, random_state=0)
	regR = rdg.RegRidge(y_train,X_train)
	test_pred = regR.predictDataSet(X_test)

	actual_pred = regR.predictDataSet(mineData)
	return {'testY':y_test,'testPredY':test_pred,'actual_pred':actual_pred}


#def acceptData(trainData,testData):

#def predictLinear():
#def predictRidge():
