import sklearn.metrics.mean_absolute_error as MAE
import sklearn.metrics.mean_squared_error as MSE
import sklearn.metrics.median_squared_error as MESE
import sklearn.metrics.r2_score as R2

def allErrors(y_true,y_predict):
	return [R2(y_true,y_predict),MSE(y_true,y_predict),MESE(y_true,y_predict),MAE(y_true,y_predict)]
	
#Best possible score is 1.0, lower values are worse. [0,1]
#basically 0% to 100% accuracy[0,1]
def rSquared(y_true,y_predict):
	return R2(y_true,y_predict)

#A positive floating point value (the best value is 0.0).
def meanSquared(y_true,y_predict):
	return MSE(y_true,y_predict)

#A positive floating point value (the best value is 0.0).
def mdeianSquared(y_true,y_predict):
	return MESE(y_true,y_predict)

#A positive floating point value (the best value is 0.0).
def meanAbosolute(y_true,y_predict):
	return MAE(y_true,y_predict)

if __name__ == '__main__':
	test()