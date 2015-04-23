import KNNClassifier as nClass
from sklearn import cross_validation
import pylab
import numpy as np


def handleRequest(tDatax,tDatay,mineData,method):
    print method
    print 'we are in the Classification wrapper with our lovely data'
    if(method == 'knn'):
        resp = kneighbors(tDatax,tDatay,mineData)
    print resp
    return resp

def kneighbors(tDataX,tDataY,mineData):
    X_train, X_test, y_train, y_test = cross_validation.train_test_split(tDataX, tDataY, test_size=0.4, random_state=0)
    # A good rule of thumb is that k = the sqrt of n
    n_neighbors = np.sqrt(len(X_train))
    weights = 'uniform'
    
    # we create an instance of Neighbours Classifier and fit the data.
    knn = nClass.KNN(n_neighbors,weights,y_train,X_train)
    test_pred = knn.predictDataSet(X_test)
    accuracy = knn.accuracy(X_test,y_test)
    
    actual_pred = knn.predictDataSet(mineData)
    return {'testY':y_test,'testPredY':test_pred,'actual_pred':actual_pred}