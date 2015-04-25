import os, json, logging
from flask import request, redirect, url_for, render_template, jsonify, Response
from app import app
import app.db.dbWrapper as dbWrapper
import app.Regression.RegressionWrapper as regr
import app.Classification.ClassificationWrapper as classify

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html')

@app.route('/myAnalysis')
def myanalysis():
	return render_template('myAnalysis.html')

@app.route('/regression/linear/test')
def regressionLinear():
	 data = regr.testLinear()
	 print data
	 return jsonify(**data)

@app.route('/regression/ridge/test')
def regressionRidge():
	data = regr.testRidge()
	print data
	return jsonify(**data)

@app.route('/classification/knn/test')
def KNNClassification():
	data = classify.testKNN()
	print data
	return jsonify(**data)

@app.route('/upload')
def upload_file():
	return render_template('upload.html')

@app.route('/selection')
def selection():
	return render_template('selection.html')

@app.route('/analysis')
def analysis():
	return render_template('analysis.html')

@app.route('/upload_success', methods = ['POST','GET'])
def upload_success():
    if request.method == 'POST':
        dataset = request.data
        
       	dbWrapper.storeDataset(dataset)
       	print len(dataset)
        return jsonify(result = dataset)

@app.route('/checkForTrain', methods = ['GET','OPTIONS'])
def checkForTrain():
	#print request.args.get('test')
	name = str(request.args.get('name'))
	technique = str(request.args.get('technique'))
	resp = dbWrapper.checkForTrain(name,technique)
	return resp

#made a change here******&&&&&&&######!!!!!!!!!
@app.route('/dataset/previews')
def datasetPreviews():
	name = request.args.get('name')
	technique = request.args.get('technique')
	purpose = request.args.get('purpose')
	resp = dbWrapper.getFilteredDatasetPreviews(name,technique,purpose)
	return resp

@app.route('/dataset/fullData')
def datasetFullData():
	name = request.args.get('name')
	technique = request.args.get('technique')
	purpose = request.args.get('purpose')
	print 'db---'
	resp = dbWrapper.getFilteredFullDatasets(name,technique,purpose)
	return resp

@app.route('/Mine')
def mineData():
	name = str(request.args.get('name')) #ourIdentifier
	technique = str(request.args.get('technique')) #technique being used e.g. classification regression
	method = str(request.args.get('method'))#the method being used e.g. linearRegression, ridgeRegression, lassoRegression
	normalization = str(request.args.get('normalization'))#yes,no for normalization
	standardization = str(request.args.get('standardization'))#yes, no for standardization
	resp = dbWrapper.mine(name,technique,method,normalization, standardization)
	return resp
	#print name,'',technique,'',method,'',normalization,'',standardization
