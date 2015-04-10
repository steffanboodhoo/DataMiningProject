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

	def __init__(self,target,attributes,target_name,attribute_names,normalization,standardization):
		self.target=target
		if(normalization):
			attributes = self.normalize(attributes)
			self.normalization = True
		#if(standardization):
		#	attributes = preprocessing.standardization(attributes)
		#	self.standardization = True
		self.attributes=attributes
		self.target_name=target_name
		self.attribute_names=attribute_names
		self.clf = linear_model.Ridge(alpha=0.5)
		self.clf.fit(attributes,target)

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

	def predictTrainData(self):
		#if(normalization)
		#if(standardization)
		predictedData = self.clf.predict(self.attributes)
		return predictedData

	def predictDataSet(self,attributes):
		#if(normalization)
		#if(standardization)

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