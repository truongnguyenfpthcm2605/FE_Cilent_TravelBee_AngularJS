
app.config(function($routeProvider){
    $routeProvider
    .when("/main",{
        templateUrl : "./component/tourdetail.html",
        controller : 'tourdetail'
    })
    .when("/contact",{
        templateUrl : "./component/contact.html"
    })
    .when("/tour",{
        templateUrl : "./component/payment.html"
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