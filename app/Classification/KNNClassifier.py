from sklearn import neighbors
class KNN:

	def __init__(self,n_neighbors,weights,attributes,target):
		self.n_neighbors = n_neighbors
		self.weights = weights
		self.attributes = attributes
		self.target = target
		self.clf = neighbors.KNeighborsClassifier(n_neighbors, weights=weights)
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

	
