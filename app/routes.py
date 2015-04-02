from flask import render_template
from flask import jsonify
from flask import render_template
from app import app
import RegressionWrapper as regr
import ClassificationWrapper as classify
@app.route('/')
@app.route('/index')
def index():
	#return "ddddd"
	return render_template('starter.html')

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