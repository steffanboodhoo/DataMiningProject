import KNNClassification
import pylab
import random
from sklearn import datasets

n_neighbors = 15
weights = 'uniform'

# import some data to play with
iris = datasets.load_iris()
split = 0.66

trainingSet_data = []
testSet_data = []
trainingSet_target = []
testSet_target = []

for x in range(len(iris.data)):
    if random.random() < split:
        trainingSet_data.append(iris.data[x])
        trainingSet_target.append(iris.target[x])
    else:
        testSet_data.append(iris.data[x])
        testSet_target.append(iris.target[x])

def testKNN():
	nClass = KNNClassification.KNNClass(n_neighbors,weights,trainingSet_target,trainingSet_data)
	predictedDataSet = nClass.predictDataSet(testSet_data)
	accuracy = nClass.accuracy(testSet_data,testSet_target)
	return {'target':testSet_target,'predicted':list(predictedDataSet),'accuracy':accuracy}