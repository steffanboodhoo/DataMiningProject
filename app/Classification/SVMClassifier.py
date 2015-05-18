from sklearn import svm
class SVM:

	def __init__(self,kernel,C,attributes,target):
		self.kernel = kernel
		self.C = C
		self.attributes = attributes
		self.target = target
		self.clf = svm.SVC(kernel = kernel, C = C)
		self.clf.fit(attributes,target)

	def predictTrainData(self):
		predictedData = self.clf.predict(self.attributes)
		return predictedData.tolist()

	def predictDataSet(self,attributes):
		predictedData = self.clf.predict(attributes)
		return predictedData.tolist()

	def disp(self):
		print self.clf

	def accuracy(self, attributes, target):
		result = self.clf.score(attributes,target)
		return result

	
