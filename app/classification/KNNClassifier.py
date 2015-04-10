from sklearn import neighbors, datasets
import random

class KNN:

	def __init__(self,n_neighbors,weights,target,attributes):
		self.n_neighbors = n_neighbors
		self.weights = weights
		self.target = target
		self.attributes = attributes
		self.clf = neighbors.KNeighborsClassifier(n_neighbors, weights=weights)
		self.clf.fit(attributes,target)

	def predictTrainData(self):
		predictedData = self.clf.predict(self.attributes)
		return predictedData

	def predictDataSet(self,attributes):
		predictedData = self.clf.predict(attributes)
		return predictedData

	def disp(self):
		print self.clf

	def accuracy(self, attributes, target):
		result = self.clf.score(attributes,target)
		return result

	
