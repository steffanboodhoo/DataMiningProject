import os, json, logging
from flask import request, redirect, url_for, render_template, jsonify, Response
from app import app
import app.db.dbWrapper as dbWrapper
import app.wrappers.RegressionWrapper as regr
import app.wrappers.ClassificationWrapper as classify

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html')

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

def allowed_file(filename):
	return '.' in filename and \
		filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/upload')
def upload_file():
	return render_template('upload.html')

@app.route('/upload_success',methods=['POST','GET'])
def upload_success():
    if request.method == 'POST':
        dataset = request.data
        
       	dbWrapper.storeDataset(dataset)
       	print len(dataset)
        return jsonify(result=dataset)

@app.route('/checkForTrain',methods=['GET','OPTIONS'])
def checkForTrain():
	#print request.args.get('test')
	name = request.args.get('name')
	technique = request.args.get('technique')
	obj = {'name':str(name),'technique':str(technique)}
	print obj
	resp = dbWrapper.checkForTrain(name,technique)
	return resp

@app.route('/analysis')
def analysis():
	return render_template('analysis.html')

@app.route('/datasetPreviews/<string:purpose>')
def datasetPreviews(purpose):
	obj = dbWrapper.getDatasetPreviews(purpose)
	return obj