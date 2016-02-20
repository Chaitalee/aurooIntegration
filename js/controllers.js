angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'ngDialog', 'angular-flexslider'])
.controller('HomeCtrl', function($scope, TemplateService, $location, NavigationService, ngDialog, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("home");
  $scope.menutitle = NavigationService.makeactive("Home");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.products = false;
  // $.jStorage.set('activeItem', 'item1');

  NavigationService.getHomePics(function (data) {
      $scope.homeImage = data;
      // console.log($scope.homeImage);
    });

  NavigationService.getPopularPdts(function (data) {
    $scope.brandlist = data;
    // console.log($scope.brandlist);
  })

  // $scope.subscribe = function (email) {
  //   return email;
  // }

  // $scope.input = $scope.subscribe(email) {
  //   return email;
  // };
  $scope.getCategory = function (brandId) {
    // console.log('Brand Id:', brandId);
    NavigationService.getCategoryImages(brandId, function (data) {
      if(data) {
        // console.log('nav service:', brandId);
        // console.log('nav service:', data);
        $scope.products = data;
      }
    })
  }

  $scope.subscribeEmail = "";
  $scope.subscribe = function (email) {
    // console.log('Email subscribe: ', email);
    NavigationService.subscribe(email, function (data) {
      // console.log(data);
      // console.log(email);
    })
    // $scope.subscribeEmail = data;
  }

  // $scope.showopup = {};
  $scope.pro = function(open) {
    $scope.products = open;
  };

  $scope.open = function(data) {
    $scope.showpop = data;
    ngDialog.open({
      template: 'views/content/quickview.html',
      scope: $scope,
      controller: 'HomeCtrl'

    });

  };

  // $.jStorage.set('popNot', undefined)
  // console.log('popNot value: ', $.jStorage.get('popNot'))
  popNot = $.jStorage.get('popNot');
  $scope.popme = function() {
    ngDialog.open({
      template: 'views/content/popup.html',
      scope: $scope
    });
  };

  $scope.close = function () {
    $.jStorage.set('popNot', true)
    // console.log('popNot value: ', $.jStorage.get('popNot'))
  }

  if(!popNot) {
    $scope.popme();
  }

  NavigationService.getSlider(function(data) {
    $scope.slides = data;
    // console.log('slider: ', $scope.slides);
  });

  NavigationService.getExclusiveProduct(function(data) {
    $scope.exclusiveProduct = data;
    // console.log($scope.exclusiveProduct);
  });

  // $scope.products = [{
  //   img: "img/products/8.jpg",
  //   name: "Zara",
  //   price: "25000"
  // }, {
  //   img: "img/products/7.jpg",
  //   name: "Zara",
  //   price: "25000"
  // }, {
  //   img: "img/products/5.jpg",
  //   name: "Zara",
  //   price: "25000"
  // }, {
  //   img: "img/products/4.jpg",
  //   name: "Zara",
  //   price: "25000"
  // }];

  // $scope.brandlist = [{
  //   back_img: "img/brandlist/acrylamhov.png",
  //   img: "img/brandlist/acrylam.png",
  //   show: false,
  // }, {
  //   back_img: "img/brandlist/acrylytehov.png",
  //   img: "img/brandlist/acrylyte.png",
  //   show: false,
  //   products: [{
  //     img: "img/acrylyte/sample/8801.jpg",
  //     name: "Acrylyte",
  //     code: "8801",
  //     size: "1220 x 2440mm x 3mm (T)"
  //   }, {
  //     img: "img/acrylyte/sample/8802.jpg",
  //     name: "Acrylyte",
  //     code: "8802",
  //     size: "1220 x 2440mm x 3mm (T)"
  //   }, {
  //     img: "img/acrylyte/sample/8803.jpg",
  //     name: "Acrylyte",
  //     code: "8803",
  //     size: "1220 x 2440mm x 3mm (T)"
  //   }, {
  //     img: "img/acrylyte/sample/8804.jpg",
  //     name: "Acrylyte",
  //     code: "8804",
  //     size: "1220 x 2440mm x 3mm (T)"
  //   }]
  // }, {
  //   back_img: "img/brandlist/corrianohov.png",
  //   img: "img/brandlist/corriano.png",
  //   show: false,
  // }];

  // $scope.producthov = [{
  //   img: "img/products/8.jpg",
  //   name: "Zara",
  //   price: "25000"
  // }, {
  //   img: "img/products/7.jpg",
  //   name: "Zara",
  //   price: "25000"
  // }, {
  //   img: "img/products/6.jpg",
  //   name: "Zara",
  //   price: "25000"
  // }, {
  //   img: "img/products/5.jpg",
  //   name: "Zara",
  //   price: "25000"
  // }];

  $scope.prosee = false;

  $scope.proclick = function(index) {
    // console.log(index);
    // for(var i=0;i<$scope.brandlist.length;i++){
    //     if(i==index){
    //         $scope.brandlist[i].show=true;
    //     }else{
    //         $scope.brandlist[i].show=false;
    //     }
    // }

    if (index == 1) {
      $scope.brandlist[index].show = !$scope.brandlist[index].show;
    }
  };
})

.controller('NavBarCtrl', function($scope, $stateParams) {
  // $scope.states = {};
  // $scope.states.activeItem = 'item1';
  $scope.items = [{
      id: 'item1',
      title: 'Home',
      url: '#/home'

  }, {
      id: 'item2',
      title: 'Know Us',
      url: '#/knowus'
  }, {
      id: 'item3',
      title: 'Products',
      url: "#/products"
  },
  {
      id: 'item4',
      title: 'Gallery',
      url: "#/gallery"
  },
  {
      id: 'item5',
      title: 'Download',
      url: "#/download"
  },
  {
      id: 'item6',
      title: 'Contact Us',
      url: "#/contactus"
  }];
  // console.log('activeItem: ', $scope.states.activeItem);
  $scope.getLocation = function(id) {
    // $.jStorage.set('activeItem', id);
    // console.log('activeItem: ', $stateParams.activeItem);
    // $scope.location = $location;
    // console.log('location', $scope.location)
    // console.log('path', $location.url())
    // console.log('location1', $location)
    // $scope.exclusiveProduct = data;
    // console.log($scope.exclusiveProduct);
  };
  $scope.isActive = function (id) {
    // console.log('Testing item: ', $stateParams.activeItem)
    // console.log('Testing item2: ', id)
    // console.log("We're in the is active function!")
    if($stateParams.activeItem == id)
      return true
    return false
  }
})

.controller('ContactUsCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("contactus");
  $scope.menutitle = NavigationService.makeactive("Contact-Us");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.submitForm = function(formData,formValid) {
    if(formValid.$valid)
    {
      $scope.formComplete = true;
      NavigationService.contactSubmit(function(data){
        $scope.contact=data;
        // console.log($scope.contact);
      });
    }
    else
    {

    }
  };
})


.controller('DownloadCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("download");
  $scope.menutitle = NavigationService.makeactive("Download");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  
  NavigationService.getGallery(function(data) {
    $scope.download = data;
    // console.log($scope.download);
  });
  // $scope.download = [{
  //   img: "img/gallery/decolite.png",
  //   pdf: "img/pdf/decolite.pdf"
  // }, {
  //   img: "img/gallery/lucento.png",
  //   pdf: "img/pdf/lucento.pdf"
  // }, {
  //   img: "img/gallery/mikano.png",
  //   pdf: "img/pdf/mikano.pdf"
  // }, {
  //   img: "img/gallery/vereno.png",
  //   pdf: "img/pdf/vereno.pdf"
  // }, {
  //   img: "img/gallery/acrylam.png",
  //   pdf: "img/pdf/acrylam.pdf"
  // }, {
  //   img: "img/gallery/egger.png",
  //   pdf: "img/pdf/egger.pdf"
  // }, {
  //   img: "img/gallery/flos.png",
  //   pdf: "img/pdf/flos.pdf"
  // }, {
  //   img: "img/gallery/decoart.png",
  //   pdf: "img/pdf/decoart.pdf"
  // }, {
  //   img: "img/gallery/acrylyte.png",
  //   pdf: "img/pdf/acrylyte.pdf"
  // }, {
  //   img: "img/gallery/corriano.png",
  //   pdf: "img/pdf/corriano.pdf"
  // }, {
  //   img: "img/gallery/stylite.png",
  //   pdf: "img/pdf/stylite.pdf"
  // }, {
  //   img: "img/gallery/decopanel.png",
  //   pdf: "img/pdf/decopanel.pdf"
  // }, {
  //   img: "img/gallery/decoris.png",
  //   pdf: "img/pdf/decoris.pdf"
  // }, {
  //   img: "img/gallery/forescolor.png",
  //   pdf: "img/pdf/forescolor.pdf"
  // }, {
  //   img: "img/gallery/fashionwall.png",
  //   pdf: "img/pdf/fashionwall.pdf"
  // }, {
  //   img: "img/gallery/emporio.png",
  //   pdf: "img/pdf/emporio.pdf"
  // }, {
  //   img: "img/gallery/matrixwall.png",
  //   pdf: "img/pdf/matrixwall.pdf"
  // }, {
  //   img: "img/gallery/solido.png",
  //   pdf: "img/pdf/solido.pdf"
  // }, {
  //   img: "img/gallery/d3wall.png",
  //   pdf: "img/pdf/d3wall.pdf"
  // }, {
  //   img: "img/gallery/europratik.png",
  //   pdf: "img/pdf/europratik.pdf"
  // }];
})

.controller('QuickviewCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("quickview");
  $scope.menutitle = NavigationService.makeactive("QuickView");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('GalleryimageCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("galleryimage");
  $scope.menutitle = NavigationService.makeactive("Galleryimage");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.slide = [];
})

.controller('ProductsCtrl', function($scope, 
  TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("products");
  $scope.menutitle = NavigationService.makeactive("Products");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  NavigationService.getAllProducts(function (data) {
    $scope.brands = data;
    // console.log($scope.brands);
  });
  // [{
  //   img: "img/gallery/decolite.png"
  // }, {
  //   img: "img/gallery/lucento.png"
  // }, {
  //   img: "img/gallery/mikano.png"
  // }, {
  //   img: "img/gallery/vereno.png"
  // }, {
  //   img: "img/gallery/acrylam.png"
  // }, {
  //   img: "img/gallery/egger.png"
  // }, {
  //   img: "img/gallery/flos.png"
  // }, {
  //   img: "img/gallery/decoart.png"
  // }, {
  //   img: "img/gallery/acrylyte.png"
  // }, {
  //   img: "img/gallery/corriano.png"
  // }, {
  //   img: "img/gallery/stylite.png"
  // }, {
  //   img: "img/gallery/decopanel.png"
  // }, {
  //   img: "img/gallery/decoris.png"
  // }, {
  //   img: "img/gallery/forescolor.png"
  // }, {
  //   img: "img/gallery/fashionwall.png"
  // }, {
  //   img: "img/gallery/emporio.png"
  // }, {
  //   img: "img/gallery/matrixwall.png"
  // }, {
  //   img: "img/gallery/solido.png"
  // }, {
  //   img: "img/gallery/d3wall.png"
  // }, {
  //   img: "img/gallery/europratik.png"
  // }];
})

.controller('GalleryCtrl', function($scope, TemplateService, NavigationService, ngDialog, $timeout) {
  $scope.template = TemplateService.changecontent("gallery");
  $scope.menutitle = NavigationService.makeactive("Gallery");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.slide = [];
  NavigationService.getGallery(function(data) {
    $scope.gallery = data;
    // console.log($scope.gallery);
  })


  $scope.open = function(id) {
    NavigationService.getEachProductGallery(id, function(data) {
      $scope.eachprogallery = data;
      // console.log($scope.eachprogallery);
    });
    ngDialog.open({
      template: 'views/content/galleryimage.html',
      scope: $scope,
      controller: 'GalleryCtrl'
    });
  };
})

.controller('BrandsCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("brands");
  $scope.menutitle = NavigationService.makeactive("Brands");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  // $scope.brandlist = [{
  //   img: 'img/brands/18.png'
  // }, {
  //   img: 'img/brands/1.png'
  // }, {
  //   img: 'img/brands/2.png'
  // }, {
  //   img: 'img/brands/3.png'
  // }, {
  //   img: 'img/brands/4.png'
  // }, {
  //   img: 'img/brands/5.png'
  // }, {
  //   img: 'img/brands/6.png'
  // }, {
  //   img: 'img/brands/7.png'
  // }, {
  //   img: 'img/brands/8.png'
  // }, {
  //   img: 'img/brands/9.png'
  // }, {
  //   img: 'img/brands/10.png'
  // }, {
  //   img: 'img/brands/11.png'
  // }, {
  //   img: 'img/brands/12.png'
  // }, {
  //   img: 'img/brands/13.png'
  // }, {
  //   img: 'img/brands/14.png'
  // }, {
  //   img: 'img/brands/15.png'
  // }, {
  //   img: 'img/brands/16.png'
  // }, {
  //   img: 'img/brands/17.png'
  // }];
})
.controller('KnowusCtrl', function($scope, TemplateService, NavigationService, ngDialog, $timeout) {
  $scope.template = TemplateService.changecontent("knowus");
  $scope.menutitle = NavigationService.makeactive("Know Us");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('CategoryCtrl', function($scope, TemplateService, NavigationService, ngDialog, $timeout, $stateParams) {
  $scope.template = TemplateService.changecontent("category");
  $scope.menutitle = NavigationService.makeactive("Category");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  // console.log('id:', $stateParams);
  // $scope.getCategoryId = function (categoryId) {
  //   console.log('CategoryId: ', categoryId);
  NavigationService.getEachCategory($stateParams.id, function (data) {
    $scope.category = data;
    // console.log('Category: ', $scope.category);
    // console.log('State: ', $stateParams.id);
  })

  NavigationService.getEachSeries($stateParams.id, $stateParams.code, function (data) {
    $scope.series = data;
    // console.log('Series: ', $scope.series);
  })
  // } 
  
  //     $scope.molding = [
  //         {
  //             img: "img/acrylyte/sample/8801.jpg",
  //             name: "Acrylyte",
  //             code: "8801",
  //             size: "1220 x 2440mm x 3mm (T)"
  // },
  //         {
  //             img: "img/acrylyte/sample/8802.jpg",
  //             name: "Acrylyte",
  //             code: "8801",
  //             size: "1220 x 2440mm x 3mm (T)"
  // },
  //         {
  //             img: "img/acrylyte/sample/8803.jpg",
  //             name: "Acrylyte",
  //             code: "8801",
  //             size: "1220 x 2440mm x 3mm (T)"
  // },
  //         {
  //             img: "img/acrylyte/sample/8804.jpg",
  //             name: "Acrylyte",
  //             code: "8801",
  //             size: "1220 x 2440mm x 3mm (T)"
  // },
  //         {
  //             img: "img/acrylyte/sample/8805.jpg",
  //             name: "Acrylyte",
  //             code: "8801",
  //             size: "1220 x 2440mm x 3mm (T)"
  // }
  //
  // ];

  // $scope.panel = [{
  //   img: "img/acrylyte/sample/8801.jpg",
  //   name: "Acrylyte",
  //   code: "8801",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8802.jpg",
  //   name: "Acrylyte",
  //   code: "8802",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8803.jpg",
  //   name: "Acrylyte",
  //   code: "8803",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8804.jpg",
  //   name: "Acrylyte",
  //   code: "8804",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8805.jpg",
  //   name: "Acrylyte",
  //   code: "8805",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8806.jpg",
  //   name: "Acrylyte",
  //   code: "8806",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8807.jpg",
  //   name: "Acrylyte",
  //   code: "8807",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8808.jpg",
  //   name: "Acrylyte",
  //   code: "8808",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8809.jpg",
  //   name: "Acrylyte",
  //   code: "8809",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8810.jpg",
  //   name: "Acrylyte",
  //   code: "8810",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8811.jpg",
  //   name: "Acrylyte",
  //   code: "8811",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8812.jpg",
  //   name: "Acrylyte",
  //   code: "8812",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8813.jpg",
  //   name: "Acrylyte",
  //   code: "8813",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8814.jpg",
  //   name: "Acrylyte",
  //   code: "8814",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8815.jpg",
  //   name: "Acrylyte",
  //   code: "8815",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, {
  //   img: "img/acrylyte/sample/8816.jpg",
  //   name: "Acrylyte",
  //   code: "8816",
  //   size: "1220 x 2440mm x 3mm (T)"
  // }, ];
  $scope.oneAtATime = true;
  $scope.open = function(data) {
    $scope.showpop = data;
    ngDialog.open({
      template: 'views/content/quickview.html',
      scope: $scope,
      controller: 'CategoryCtrl'
    });
  };
    $scope.feature = function() {
    ngDialog.open({
      template: 'views/content/featurespop.html',
      scope: $scope,
      controller: 'CategoryCtrl'
    });
  };

})

// .controller('SeriesCtrl', function($scope, $stateParams, NavigationService) {
//   // $scope.template = TemplateService.changecontent("series");
//   // $scope.menutitle = NavigationService.makeactive("Series");
//   // TemplateService.title = $scope.menutitle;
//   // $scope.navigation = NavigationService.getnav();
//   console.log('series: ', $stateParams.id, $stateParams.code);
  

// })

.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.getclass = "down-yes";
  $scope.open = function(get) {
    $scope.getclass = get;
  };
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
});
//$scope.toggle = function (flag) {
//    //            if (flag = true) {
//    //                $scope.showsearch = !$scope.showsearch;
//    //            } else {
//    $scope.showsearch = flag;
//    //            }
//}
