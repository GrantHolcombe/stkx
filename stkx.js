angular.module('stkx', [])
  .controller('stockTicker', function($scope, $http) {

    $scope.trackedStock = [];
    $scope.stockTicker = [];

    $scope.addStock = function(symbol){
        $scope.trackedStock.push(symbol);
        $scope.getQuote(symbol);
    }

    $scope.getQuote = function(symbol) {
      $http({
        method: 'GET',
        params: { symbol: symbol },
        url: 'http://dev.markitondemand.com/Api/v2/Quote/json'
        }).then(function successCallback(response) {
            console.log(response);

            var name = response.data.Name
            var price = response.data.LastPrice


            $scope.stockTicker.push({
              stockName : name,
              stockPrice : price
              });
        



          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      }

    $scope.refreshTicker = function() {
      for(i = 0; i < $scope.trackedStock.length; i++){
            $scope.getQuote($scope.trackedStock[i]);
      }
    }

    $scope.refreshTicker();

  });
