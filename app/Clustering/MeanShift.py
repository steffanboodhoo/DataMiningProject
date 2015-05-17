from sklearn.cluster import MeanShift, estimate_bandwidth
import numpy as np
from sklearn.datasets.samples_generator import make_blobs

class clstrCl:

	def __init__(self,attributes,bwidth):
		#if(bwidth is None):
		
		###############################################################################
		# Generate sample data
		
		centers = [[1, 1], [-1, -1], [1, -1]]
		X, _ = make_blobs(n_samples=10000, centers=centers, cluster_std=0.6)
		print '\n\n\n----------------------------------------'
		print X
		print '\n\n\n----------------------------------------'
		fixedX = np.array(attributes)
		#fixedX = X
		print fixedX
		
		bandwidth = estimate_bandwidth(fixedX, quantile=0.2,n_samples=500)
		self.cluster = MeanShift(bandwidth=bandwidth)
		self.cluster.fit(fixedX)
		'''
		centers = [[1, 1], [-1, -1], [1, -1]]
		X, _ = make_blobs(n_samples=10000, centers=centers, cluster_std=0.6)

		###############################################################################
		# Compute clustering with MeanShift

		# The following bandwidth can be automatically detected using
		bandwidth = estimate_bandwidth(X, quantile=0.2, n_samples=500)

		ms = MeanShift(bandwidth=bandwidth, bin_seeding=True)
		ms.fit(X)
		'''
		print '\n\n worked \n\n'


	def group(self,attributes):
		Z = self.cluster.predict(attributes)
		return Z.tolist()

	def centroids(self):
		info = self.cluster.cluster_centers_
		return info.tolist()