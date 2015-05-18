import KNNClassifier as nClass
import SVMClassifier as svmClass
import NaiveBClassifier as nBayesClass
from sklearn import cross_validation
import pylab
import numpy as np


def handleRequest(tDatax,tDatay,mineData,method):
    print method
    print 'we are in the Classification wrapper with our lovely data'
    if(method == 'knn'):
        resp = kneighbors(tDatax,tDatay,mineData)
    if(method == 'svm'):
        resp = supportVector(tDatax,tDatay,mineData)
    if(method == 'nb'):
        resp = naiveBayes(tDatax,tDatay,mineData)
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
    resp = {'Testset Class':y_test,'Predicted Testset Class':test_pred,'Classes':actual_pred}
    resp['mineAttrs'] = mineData
    resp['accuracy'] = accuracy
    return resp

def supportVector(tDataX,tDataY,mineData):
    X_train, X_test, y_train, y_test = cross_validation.train_test_split(tDataX, tDataY, test_size=0.4, random_state=0)
    # SVM regularization parameter
    # C represents the penalty parameter of the error term. The C parameter tells the SVM optimization how much you want to avoid misclassifying each training example.
    C = 1.0
    kernel = 'linear'

    svm = svmClass.SVM(kernel,C,X_train,y_train)
    test_pred = svm.predictDataSet(X_test)
    accuracy = svm.accuracy(X_test,y_test)

    actual_pred = svm.predictDataSet(mineData)
    resp = {'Testset Class':y_test,'Predicted Testset Class':test_pred,'Classes':actual_pred}
    resp['mineAttrs'] = mineData
    resp['accuracy'] = accuracy
    return resp

def naiveBayes(tDataX,tDataY,mineData):
    X_train, X_test, y_train, y_test = cross_validation.train_test_split(tDataX, tDataY, test_size=0.4, random_state=0)
   
    nb = nBayesClass.GNB(X_train,y_train)
    test_pred = nb.predictDataSet(X_test)
    accuracy = nb.accuracy(X_test,y_test)

    actual_pred = nb.predictDataSet(mineData)
    resp = {'Testset Class':y_test,'Predicted Testset Class':test_pred,'Classes':actual_pred}
    resp['mineAttrs'] = mineData
    resp['accuracy'] = accuracy
    return resp

