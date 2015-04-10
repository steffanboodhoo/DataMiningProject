import numpy as np

dataX = [[4,3,3,14,13],
	[4,4,3,13,14],
	[4,3,1,17,12],
	[3,2,1,11,11],
	[5,3,2,16,15],
	[6,5,4,17,18],
	[6,5,4,17,16],
	[5,4,1,13,15],
	[5,4,1,14,14],
	[3,3,2,14,15],
	[4,2,2,16,16],
	[5,2,1,15,13]]

def main():
	d = np.array(dataX)
	n=len(d)
	print dataX
	print d[0:n,0]

	A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
	B = np.array(A)
	print B[0:3, 0]
	B[0:3,0] = [0,0,0]
	print B
	x = np.random.rand(1000)*100
	print x

if __name__ == '__main__':
	main()