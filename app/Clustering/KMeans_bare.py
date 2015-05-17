
from sklearn.cluster import KMeans

class clstrCl:

	def __init__(self,attributes,cluster_num):
		if(cluster_num is None):
			cluster_num=3
		self.cluster = KMeans(init='k-means++',n_clusters=cluster_num,n_init=10)
		self.cluster.fit(attributes)

	def group(self,attributes):
		Z = self.cluster.predict(attribues)
		return Z