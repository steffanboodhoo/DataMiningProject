import RegressionLinear
import RegressionRigid
import RegressionEvaluation as Eval
import pylab
dataX = [[4,3,3,14,13],
	[4,4,3,13,14],
	[4,3,1,17,12],
	[3,2,1,11,11],
	[5,3,2,16,15],
	[6,5,4,17,18],
	[6,5,4,17,16],
	[5,4,1,13,15],
	[5,4,1,14,14],
	[3,3,2,14,15],
	[4,2,2,16,16],
	[5,2,1,15,13]]

dataY = [15,17,16,12,14,18,19,15,15,13,11,16]
dataXLabels = ["wk1","wk2","wk3","sec1","sec2"]
dataYLabels = ["sec3"]

def testLinear():
	regLin = RegressionLinear.RegLnr(dataY,dataX,dataYLabels,dataXLabels,False,False)
	predictedDataSet = regLin.predictTrainData()
	return {'target':dataY,'predicted':list(predictedDataSet),'error':Eval.allErrors(dataY,predictedDataSet)}

def testRidge():
	regRig = RegressionRigid.RegRidge(dataY,dataX,dataYLabels,dataXLabels,True,False)
	predictedDataSet = regRig.predictTrainData()
	return {'target':dataY,'predicted':list(predictedDataSet),'error':Eval.allErrors(dataY,predictedDataSet)}

#def acceptData(trainData,testData):

#def predictLinear():
#def predictRidge():
