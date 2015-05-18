from sklearn import naive_bayes
class GNB:

	def __init__(self,attributes,target):
		self.attributes = attributes
		self.target = target
		self.clf = naive_bayes.GaussianNB()
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

	
