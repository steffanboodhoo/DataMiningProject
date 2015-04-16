#when you build a model, the model may work very well for the training data but nothing else
#you would only realize this when testing the model with the testing data
#cross validation breaks up the training data and breaking it up, so from your training data,
#you have both training data and test data so you can find an estimated error rate

#random subsampling cross validation
#k fold cross validation

from sklearn import linear_model
from sklearn import preprocessing
import numpy as np
class RegRidge:

	def __init__(self,target,attributes):
		self.target=target
		self.clf = linear_model.Ridge(alpha=0.5)
		self.clf.fit(attributes,target)

	'''
	def predictTrainData(self):
		#if(normalization)
		#if(standardization)
		predictedData = self.clf.predict(self.attributes)
		return predictedData
	'''
	def predictDataSet(self,attributes):
		predictedData = self.clf.predict(attributes)
		return predictedData

	def disp(self):
		print self.clf

	def findBestAlpha(self):
		n_alphas = 200
		alphas = np.logspace(-10, -2, n_alphas)
		coef=0
		for a in alphas:
			self.clf.set_params(alpha=a)
    		self.clf.fit(self.attributes,self.target)
    		coefs.append(clf.coef_)
			#self.clf.