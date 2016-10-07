(function() {
	angular.module("net.sgoyal.example", ['ngAccountKit', 'ngCookies', 'ui.router'])
		.config(function(accountKitProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
			accountKitProvider.configure("1769155430001571", "v1.1", state, '/');

			$stateProvider
				.state('index', {
					url: '/',
					templateUrl: 'templates/index.html',
					controller: 'AppCtrl'
				})
				.state('home', {
					url: '/home',
					templateUrl: 'templates/home.html',
					controller: 'HomeCtrl'
				});
			$urlRouterProvider.otherwise("/");
			$locationProvider.html5Mode(true);
		})
		.controller("AppCtrl", function($scope, $accountKit, $cookies, $state) {

			if ($cookies.get('resp')) {
				$state.go('home');
			}

			$scope.loginWithSMS = function() {
				$accountKit.loginWithSMS()
					.then(function(res) {
						console.log(res)
					});
			};

			$scope.loginWithEmail = function() {
				$accountKit.loginWithEmail()
					.then(function(res) {
						console.log(res)
					}, function(err) {
						console.log(err);
					});
			};

		})
		.controller("HomeCtrl", function($scope, $cookies, $state, $http) {
			if (!$cookies.get('resp')) {
				$state.go('index');
			} else {
				$scope.accountKitResponse = JSON.stringify(JSON.parse($cookies.get('resp')), null, 4);
			}

			$scope.logout = function() {
				$cookies.remove('resp');
				$state.go('index');
			};

			$scope.delMe = function() {
				var cookie = JSON.parse($cookies.get('resp'));
				var id = cookie.id;
				$http.get("/del?id=" + id)
					.then(function(resp) {
						if (resp.data.success)
							$scope.logout();
					});
			}
		});
})();