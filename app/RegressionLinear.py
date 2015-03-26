from sklearn import linear_model

class RegLnr:

	def __init__(self,target,attributes,target_name,attribute_names):
		self.target=target
		self.attributes=attributes
		self.target_name=target_name
		self.attribute_names=attribute_names
		self.clf = linear_model.LinearRegression()
		self.clf.fit(attributes,target)

	def predictTrainData(self):
		predictedData = self.clf.predict(self.attributes)
		return predictedData

	def predictDataSet(self,attributes):
		predictedData = self.clf.predict(attributes)
		return predictedData

	def disp(self):
		print self.clf

	
