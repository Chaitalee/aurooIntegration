
var adminurl= "http://wohlig.io:81/callApi/euro/"

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
  var navigation = [{
    name: "Home",
    classis: "active",
    link: "#/home",
    subnav: [{
      name: "Subnav1",
      classis: "active",
      link: "#/home"
    }]
  }, {
    name: "Features",
    active: "",
    link: "#/feature",
    classis: "active",
    subnav: []
  }];

  return {
    getnav: function() {
      return navigation;
    },
    makeactive: function(menuname) {
      for (var i = 0; i < navigation.length; i++) {
        if (navigation[i].name == menuname) {
          navigation[i].classis = "active";
        } else {
          navigation[i].classis = "";
        }
      }
      return menuname;
    },
    
    getHomePics: function (callback) {
      $http.get(adminurl+'getHomePageImage').success(callback); 
    //   $http({
    //     url: adminurl + 'getHomePageImage',
    //     method: 'GET',
    //     withCredentials: true,
    //     data: {
    //       "image1":"img/adhesive-banner.jpg",
    //       "image2":"img/1.jpg",
    //       "image3":"img/2.jpg"
    //     }
    //   }).success(callback);
    },

    subscribe: function (mail, callback) {
      console.log(mail);
      $http({
        url: adminurl + 'getSubscribers',
        method: 'POST',
        withCredentials: true,
        data: {
          "email": mail
        }
      }).success(callback);
    },

    getPopularPdts:function (callback) {
      $http.get(adminurl+'getPopularProduct').success(callback);   
    },

    getCategoryImages:function (id, callback) {
      $http.get(adminurl+'getEachPopularProduct/'+id).success(callback);
    }
  }
});
