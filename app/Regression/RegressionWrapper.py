import RegressionLinear
import RegressionRigid
import RegressionEval as Eval
import pylab

def testLinear():
	regLin = RegressionLinear.RegLnr(dataY,dataX)
	predictedDataSet = regLin.predictTrainData()
	return {'target':dataY,'predicted':list(predictedDataSet),'error':Eval.allErrors(dataY,predictedDataSet)}

def testRidge():
	regRig = RegressionRigid.RegRidge(dataY,dataX)
	predictedDataSet = regRig.predictTrainData()
	return {'target':dataY,'predicted':list(predictedDataSet),'error':Eval.allErrors(dataY,predictedDataSet)}

def normalize(self,attributes):
	#ensuring the values are floats
	fixedDataX=[]
	for e in attributes:
		row=[]
		for f in e:
			f=float(f)
			row.append(f)
		fixedDataX.append(row)

		#normalizing each feature
		
	attributes = np.array(fixedDataX)
	L = len(attributes[0])
	n = len(attributes)
	for i in range(L):
		feature = np.array(attributes[0:n,i])
		self.normalizeRow(feature)
		feature = preprocessing.normalize(feature[:,np.newaxis], axis=0).ravel()
		attributes[0:n,i] = feature
		
	#attributes = preprocessing.normalize(fixedDataX)
	print attributes
	return attributes

	def normalizeRow(self,row):
		maximum = np.amax(row)
		minimum = np.amin(row)
		div = maximum - minimum
		v = []
		for e in row:
			v.append( (maximum - e) / div )
		print v
#def acceptData(trainData,testData):

#def predictLinear():
#def predictRidge():
