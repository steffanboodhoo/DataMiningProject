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
    
    # X_train: The Attributes from the test data that will be used to train the model
    # X_test: The Attributes from the test data that will be used to test the model
    # y_train: The classification from the test data that will be used to train the model
    # y_train: The classification from the test data that will be used to test the model
   
    # A good rule of thumb is that k = the sqrt of n. Round to nearest int
    n_neighbors = int(np.sqrt(len(X_train)))
    weights = 'uniform'
    
    # we create an instance of Neighbours Classifier and fit the data.
    knn = nClass.KNN(n_neighbors,weights,X_train,y_train)
    test_pred = knn.predictDataSet(X_test)
    accuracy = knn.accuracy(X_test,y_test)
    
    actual_pred = knn.predictDataSet(mineData)
    return {'Testset Class':y_test,'Predicted Testset Class':test_pred,'Mining Results':actual_pred,'Accuracy':accuracy, 'Mining Attributes': mineData}