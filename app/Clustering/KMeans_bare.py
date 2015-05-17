
from sklearn.cluster import KMeans

class clstrCl:

	def __init__(self,attributes,cluster_num):
		if(cluster_num is None):
			cluster_num=3
		#for some reason cluster_num was not null so i was getting an error take note and fix 
		#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		self.cluster = KMeans(init='k-means++',n_clusters=3,n_init=10)
		print attributes
		self.cluster.fit(attributes)

	def group(self,attributes):
		Z = self.cluster.predict(attributes)
		return Z.tolist()

	def centroids(self):
		info = self.cluster.cluster_centers_
		return info.tolist()