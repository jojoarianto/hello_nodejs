var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', function($scope, $http){

	var refresh = function(){
		// fungsi untuk reload data
		$http.get('/getkontak').success(function(res){
			$scope.contactlist = res;
			$scope.contact = "";
		});
	}

	refresh();

	// fungsi untuk klik add kontak
	$scope.addKontak = function(){
		// console.log($scope.contact);
		$http.post('/getkontak', $scope.contact).success(function(res){
			refresh();
		});
	}

	// fungsi untuk menghapus data
	$scope.removeKontak = function(id){
		$http.delete('deletekontak/'+id).success(function(res){
			refresh();
		});
	};

	// edit kontak
	$scope.editKontak = function(id){
		$http.get('/getkontak/'+id).success(function(res){
			$scope.contact = res;
			// alert('id = '+id);
		});
	};

	// save edit kontak
	$scope.saveUpdateKontak = function(id){
		$http.put('/editkontak/'+$scope.contact._id, $scope.contact).success(function(res){
			refresh();
		});
	};

	// clear fungsi
	$scope.clear = function(){
		$scope.contact = "";
	}
});