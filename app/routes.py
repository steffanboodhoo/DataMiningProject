import os, json, logging
from flask import request, redirect, url_for, render_template, jsonify, render_template, send_from_directory, Response
from app import app
from werkzeug import secure_filename
import RegressionWrapper as regr
import ClassificationWrapper as classify

UPLOAD_FOLDER = './static/uploads'
ALLOWED_EXTENSIONS = set(['csv'])

@app.route('/')
@app.route('/index')
def index():
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

def allowed_file(filename):
	return '.' in filename and \
		filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/upload', methods = ['GET','POST'])
def upload_file():
	if request.method == 'POST':
		file = request.files['file']
		logging.debug('upload file ' + file.filename)
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			# file.save(os.path.join(UPLOAD_FOLDER, filename))
			
			content = file.read()
			print content

			jsonResponse = json.dumps({'file_content':content})
			response = Response(jsonResponse, mimetype='application/json')
			# return response
			# return redirect(url_for('uploaded_file',
   #                                  filename=filename))
	return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form action="" method=post enctype=multipart/form-data>
      <p><input type=file name=file>
         <input type=submit value=Upload>
    </form>
    '''

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER,
                               filename)