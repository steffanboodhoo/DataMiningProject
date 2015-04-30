from sklearn import linear_model
from sklearn import preprocessing
class RegLnr:

	def __init__(self,target,attributes):
		self.target=target
		self.clf = linear_model.LinearRegression()
		self.clf.fit(attributes,target)

	def predictDataSet(self,attributes):
		predictedData = self.clf.predict(attributes)
		return predictedData

	def disp(self):
		print self.clf

	
