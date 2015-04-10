import sklearn.metrics as metrics

def allErrors(y_true,y_predict):
	return {"r2":metrics.r2_score(y_true,y_predict),"mae":metrics.mean_absolute_error(y_true,y_predict),
	"mse":metrics.mean_squared_error(y_true,y_predict)}

#Best possible score is 1.0, lower values are worse. [0,1]
#basically 0% to 100% accuracy[0,1]
def rSquared(y_true,y_predict):
	return metrics.r2_score(y_true,y_predict)

#A positive floating point value (the best value is 0.0).
def meanSquared(y_true,y_predict):
	return metrics.mean_squared_error(y_true,y_predict)

#A positive floating point value (the best value is 0.0).
def mdeianSquared(y_true,y_predict):
	return metrics.median_absolute_error(y_true,y_predict)

#A positive floating point value (the best value is 0.0).
def meanAbosolute(y_true,y_predict):
	return metrics.mean_absolute_error(y_true,y_predict)

if __name__ == '__main__':
	test()