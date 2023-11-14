
app.config(function($routeProvider){
    $routeProvider
    .when("/main",{
        templateUrl : "./component/main.html",
        controller : 'mainController'
    })
    .when("/contact",{
        templateUrl : "./component/contact.html"
    })
    .when("/tour",{
        templateUrl : "./component/tour.html",
        controller : 'tourController'
    })
    .when("/blogsingle",{
        templateUrl : "./component/blog-single.html"
    })
    .when("/login",{
        templateUrl : "./component/sign-in.html"
    })
    .when("/register",{
        templateUrl : "./component/sign-up.html"
    })
    .when("/changepass",{
        templateUrl : "./component/changepass.html"
    })
    .when("/information",{
        templateUrl : "./component/information.html"
    })
    .when("/history",{
        templateUrl : "./component/historyticket.html"
    })
    .otherwise({
       redirectTo : "/main"
    })
    
})
app.run(function ($rootScope) {
    $rootScope.$on("$routeChangeStart", function () {
        $rootScope.loading = true

    })
    $rootScope.$on("$routeChangeSuccess", function () {
        $rootScope.loading = false

    })
    $rootScope.$on("$routeChangeError", function () {
        $rootScope.loading = false
        alert('loading Templet Errors')
    })
})