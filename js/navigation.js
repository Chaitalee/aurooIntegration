var adminurl = "http://192.168.0.123/eurobackend/index.php/json/";
//var adminurl = "http://localhost/eurobackend/index.php/json/";
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
  },
  {
    name: "Features",
    active: "",
    link: "#/feature",
    classis: "active",
    subnav: []
  }];

  return {
    getSlider: function(callback) {
      $http.get(adminurl + 'getSlider').success(callback);
    },
    getExclusiveProduct: function(callback) {
      $http.get(adminurl + 'getExclusivePdt').success(callback);
    },
    getGallery: function(callback) {
      $http.get(adminurl + 'getGalleryImages').success(callback);
    },
    getSlide: function(callback) {
      $http.get(adminurl + 'getGalleryImages').success(callback);
    },
    eachPopularProduct: function(id, callback) {
      $http.get(adminurl + 'getEachPopularProduct/'+ id).success(callback);
    },
    getEachProductGallery: function(id,callback) {
      // console.log(id);
      $http.get(adminurl + 'getEachProductGallery/'+id).success(callback);
    },
    contactSubmit:function(mail,callback){

      $http({
        url: adminurl + 'contactUs',
        method: 'POST',
        withCredentials: true,
        data: {
          "email": mail
        }
      }).success(callback);
    },

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
      // console.log(mail);
      $http.get(adminurl + 'getSubscribers?email='+ mail).success(callback);
    },

    getPopularPdts:function (callback) {
      $http.get(adminurl+'getPopularProduct').success(callback);
    },

    getCategoryImages:function (id, callback) {
      $http.get(adminurl+'getEachPopularProduct?id='+id).success(callback);
    },

    getAllProducts:function (callback) {
      $http.get(adminurl+'getAllProducts').success(callback);
      //$http.get('http://amit.io/selfbackend/index.php/json/getCategory').success(callback);
    },

    getEachCategory: function (id, callback) {
      // console.log('nsId: ', id);
      $http.get(adminurl + 'getCategoryById?id=' + id).success(callback);
    },

    // getAllSeries: function (code, callback) {
    //   $http.get(adminurl + 'getAllSeries?category=' + code).success(callback);
    // },

    getEachSeries: function (id, code, callback) {
      // console.log('Code: ', id);
      // console.log('Code: ', id);
      $http.get(adminurl + 'category?id=' + id + '/series?code=' + code).success(callback);
    }
  };
});
