import numpy as np
from sklearn.cluster import KMeans
from scipy.cluster.vq import  whiten
import matplotlib.pyplot as plt

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
	cluster = KMeans(init='k-means++',n_clusters=3,n_init=10)
	cluster.fit(dataX)
	
	print cluster.cluster_centers_
	#init is how we initialize the centroids whether random or according to euclidean distances
	#n_clusters how much clusters we want
	#n_init how many times we initialize different seeds -> re run the algorithm
	Z = cluster.predict(dataX)
	print Z
	'''
	Z = Z.reshape(dataX.shape)
	plt.figure(1)
	plt.clf()
	plt.imshow(Z, interpolation='nearest',
	           extent=(dataX.min(), dataX.max()),
	           cmap=plt.cm.Paired,
	           aspect='auto', origin='lower')

	plt.plot(reduced_data[:, 0], reduced_data[:, 1], 'k.', markersize=2)
	# Plot the centroids as a white X
	centroids = kmeans.cluster_centers_
	plt.scatter(centroids[:, 0], centroids[:, 1],
	            marker='x', s=169, linewidths=3,
	            color='w', zorder=10)
	plt.title('K-means clustering on the digits dataset (PCA-reduced data)\n'
	          'Centroids are marked with white cross')
	plt.xlim(x_min, x_max)
	plt.ylim(y_min, y_max)
	plt.xticks(())
	plt.yticks(())
	plt.show()
	'''
	

if __name__ == '__main__':
	main()