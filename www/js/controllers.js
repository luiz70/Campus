/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['uiGmapgoogle-maps'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,$ionicViewSwitcher,$state,Memory,$rootScope,Message,MarkerSpecial,uiGmapGoogleMapApi) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
	$scope.backLeft= false;
	$scope.backRight=false;
	$scope.backRegistro=false;
	//inicializa usuario
	$rootScope.Usuario=Memory.get("Usuario");
	if(!$rootScope.Usuario){
			$state.go("app.login")
	}
	$rootScope.backLeft=false;
	$rootScope.backRight=false;
	$scope.$on('$locationChangeStart', function(event, next, current) {
		if(!next.indexOf("registro")){
		$rootScope.Usuario=Memory.get("Usuario");
    	if(!$rootScope.Usuario){
			$state.go("app.login")
		}else{
			if(next.indexOf("login")>=0){
				event.preventDefault();
			}
			
		}
		}
	});
	
	if(navigator.splashscreen)navigator.splashscreen.hide();
	

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
	$scope.cerrarSesion=function(){
		Message.showLoading($scope.idioma.Login[9]);
		
		$timeout(function(){
			Memory.clean();
		$ionicViewSwitcher.nextDirection('back');
		$state.go('app.login')
		Message.hideLoading();
		
		},300)
	}
    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;
		

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
			
			default :
				break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
		
    };
	$scope.setBack = function(location) {
        var backLeft = false;
        var backRight = false;
		var backRegistro=false;
		
        switch (location) {
            case 'left':
                backLeft = true;
                break;
            case 'right':
                backRight = true;
                break;
			case 'registro':
				backRegistro=true;
			break;
			default :
				break;
        }

        $scope.backLeft = backLeft;
        $scope.backRight = backRight;
		$scope.backRegistro=backRegistro;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
	
	 $scope.placeSelected=function(place){
		 $ionicViewSwitcher.nextDirection('back');
		$state.go('app.home')
		
		uiGmapGoogleMapApi.then(function(maps) {
			$timeout(function(){
				MarkerSpecial.set($rootScope.mapa.getGMap(),place.Latitud,place.Longitud,"img/g1.png",place.Icono)
				},500)
			
		})
	}
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,Friends,Message,$ionicViewSwitcher,$state,uiGmapGoogleMapApi,MarkerSpecial,$rootScope) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
	$scope.$parent.setBack("right");
	//get friends
	$scope.Amigos=[];
	Friends.refresh()
	.success(function(data){
		Friends.set(data);
		$scope.Amigos=Friends.all()
		$timeout(function() {
        	// Set Motion
    		ionicMaterialMotion.fadeSlideInRight();
			// Set Ink
    		ionicMaterialInk.displayEffect();
    	}, 200);
		
	})
    //$scope.placeSelected=$scope.$parent.placeSelected;
	$scope.refreshFs=function(){
		Friends.refresh()
		.success(function(data){
			$scope.Amigos=data
			//Friends.set(data);
			
			$timeout(function() {
        	// Set Motion
    		ionicMaterialMotion.fadeSlideInRight();
			// Set Ink
    		ionicMaterialInk.displayEffect();
    		}, 200);
		})
		.finally(function() {
       		// Stop the ion-refresher from spinning
       		$scope.$broadcast('scroll.refreshComplete');
		})
	}
	$scope.buscaMapFriend=function(amigo){
		$ionicViewSwitcher.nextDirection('forward');
		$state.go('app.home')
		
		uiGmapGoogleMapApi.then(function(maps) {
			$timeout(function(){
				MarkerSpecial.setUserM($rootScope.mapa.getGMap(),20.734988,-103.455236,"img/g3.png",amigo.IdUsuario)
				},500)
			
		})
	}
	$scope.moreFriend=function(amigo){
 Message.showOptions("Titulo",[{text:'Ver ubicación'},{text:'Enviar mensaje'},{text:'Llamar'},{text:'Eliminar'}],function(data){
	   switch(data){
		   case 0: $scope.buscaMapFriend(amigo);
		   break;
		   case 1:
		   break;
		   case 2:
		   break;
		   case 3:
		   break;
	   }
   })
  }
})
.controller('PlacesCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, Places,$state,$ionicViewSwitcher) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
	$scope.$parent.setBack("left");
	//get places
	$scope.lugares=[];
	Places.refresh()
	.success(function(data){
		Places.set(data);
		$scope.lugares=Places.all()
		$timeout(function() {
        	// Set Motion
    		ionicMaterialMotion.fadeSlideInRight();
			// Set Ink
    		ionicMaterialInk.displayEffect();
    	}, 100);
	})
    $scope.placeSelected=$scope.$parent.placeSelected;
	$scope.refresh=function(){
		Places.refresh()
		.success(function(data){
			Places.set(data);
			$scope.lugares=Places.all()
			$timeout(function() {
        	// Set Motion
    		ionicMaterialMotion.fadeSlideInRight();
			// Set Ink
    		ionicMaterialInk.displayEffect();
    		}, 100);
		})
		.finally(function() {
       		// Stop the ion-refresher from spinning
       		$scope.$broadcast('scroll.refreshComplete');
		})
	}

})
.controller('addFriend', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$rootScope,Message,$ionicActionSheet,$ionicLoading) {

    $timeout(function () {
    	document.getElementById('fab-profile').classList.toggle('on');
    }, 800);
	$scope.addFriend=function(){
		Message.input("Agregar amigo","Proporciona la matrícula de tu amigo para agregarlo","text","Matrícula",function(res){
			$ionicLoading.hide();
		})
	}
	// Show the action sheet
  
   


})
.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$rootScope) {
    // Set Header
    $scope.$parent.hideHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
	$scope.$parent.setBack("right");

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope,$rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,uiGmapGoogleMapApi,MarkerSpecial) {
	 $scope.$parent.hideHeader();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
	
uiGmapGoogleMapApi.then(function(maps) {
	
	var r2 = document.createElement('script'); // use global document since Angular's $document is weak
            r2.src = 'js/res/richardMarker.js';
            document.body.appendChild(r2);
	$scope.bounds=new google.maps.LatLngBounds(
    new google.maps.LatLng(20.731122, -103.457905),
	new google.maps.LatLng(20.738225,-103.452099)
    
);
		$scope.map = { center: { latitude: 20.734684, longitude:  -103.455187 }, zoom:16,bounds:{ ne: {
			latitude:20.738225, longitude:-103.452099
        },
        sw: {
			latitude:20.731122,longitude: -103.457905
        }},
		options:{
		
    		mapTypeControl: false,
    		panControl: false,
	    	zoomControl: false,
    		scaleControl: false,
    		streetViewControl: false,
		},
		
		position:{ latitude: 20.734684, longitude:  -103.455187 },
		positionMarker:$scope.getUbicacion(),
		};
		$rootScope.mapa=$scope.map
	navigator.geolocation.getCurrentPosition($scope.mapSuccess, $scope.mapError);
                        
    });
            
  $scope.mapSuccess=function(position){
            
	  MarkerSpecial.set($scope.map.getGMap(),20.734975, -103.453861,"img/g2.png","ion-android-car")
	  $rootScope.inCampus=$scope.bounds.contains(new google.maps.LatLng(position.coords.latitude, position.coords.longitud))
	  if($rootScope.inCampus)
	  $scope.$apply(function(){
	   $scope.map.center={latitude:position.coords.latitude,longitude:position.coords.longitude}
	   
	   $scope.map.position={latitude:position.coords.latitude,longitude:position.coords.longitude}
                    $timeout(function(){
                             MarkerSpecial.setUserM($rootScope.mapa.getGMap(),$scope.map.position.latitude,$scope.map.position.longitude,"img/g3.png",$rootScope.Usuario.IdUsuario)
                             },500)
                    
	   })
  }
  $scope.mapError=function(){
  }
   
  $scope.getUbicacion=function(){
	  if($scope.map){
	  return {
			coords:{latitude: $scope.map.position.latitude, longitude:  $scope.map.position.longitude},
			options:{
				icon:{
			url: "/img/logo.png",
			size: new google.maps.Size(20, 20),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(10, 10),
			scaledSize:new google.maps.Size(20, 20)
			},
				
			}
	  }
	  }
	  $scope.$watch('map.position', function() {
       if($scope.map)$scope.map.positionMarker=$scope.getUbicacion()
   });
  }
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})
.controller('General', function($rootScope,Memory,$state,$scope) {
	
})
.controller('Registro', function($scope,Memory,Message,$http,$rootScope,$state,$ionicViewSwitcher) {
	$scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
	$scope.$parent.setBack("registro");
	$scope.registro={
		Email:"",
		Nombre:"",
		Apellido:"",
		Contrasena:""
	}
	$scope.registraUsuario=function(){
		
		if(!$scope.registro.Email || !$scope.registro.Nombre || !$scope.registro.Apellido || !$scope.registro.Contrasena){
			Message.alert($scope.idioma.registro[7],$scope.idioma.registro[8],function(){
			})
		}else{
			if($scope.registro.Email.indexOf("@itesm.mx")<0)
			Message.alert($scope.idioma.registro[7],$scope.idioma.registro[9],function(){ $scope.registro.Email=""})
			else{
				Message.showLoading($scope.idioma.registro[12]);
				$http.post("https://www.virtual-guardian.com/campus/registro?key=bJzepWm4sxNNRvB6RD5P",$scope.registro)
				.success(function(data){
					Message.hideLoading();
					if(data.Error){
						Message.alert($scope.idioma.registro[7],$scope.idioma.registro[11],function(){
						})
					}else{
					Message.alert($scope.idioma.registro[7],$scope.idioma.registro[10],function(){
						$ionicViewSwitcher.nextDirection('back');
						$state.go("app.login");
					});
					}
				})
			
			}
		}
		
	}
})
.controller('Login', function($scope,Memory,Message,$http,$rootScope,$state,$ionicViewSwitcher) {
	$scope.$parent.hideHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
	//Variable: almacena los datos proporcionados por el cliente.
	$scope.login={
		Matricula:"",
		Contrasena:""	
	}
	
	if(Memory.get("Usuario")!=null){
		$state.go("app.home")
	}
	//Funcion: revisa si se preciona enter en el teclado para realizar accion dependiendo del campo en el que se encuentre.
	$scope.loginKeyDown=function(event,field){
		//verificar si se preciono enter
		if(event.keyCode==13){
			//verificar en que campo se encuentra
			switch(field){
				case 1://Email
					$("#login_password").focus();
				break;
				case 2://Password
					if(window.cordova && window.cordova.plugins.Keyboard)cordova.plugins.Keyboard.close();
            		$scope.singIn()
				break;
			}
		}
	}
	
	
	//Funcion: enviar datos al servidor y validar credenciales
	$scope.singIn=function(){
		console.log($scope.login);
		if(!$scope.login.Matricula || $scope.login.Contrasena.length<6)Message.alert($scope.idioma.Login[1],$scope.idioma.Login[7],function(){
		
		});
		else{
			Message.showLoading($scope.idioma.Login[8]);
			$http.post("https://www.virtual-guardian.com/campus/login?key=bJzepWm4sxNNRvB6RD5P",$scope.login)
			.success(function(data){
				Message.hideLoading();
				Memory.clean();
				console.log(data);
				if(data.Error){
					Message.alert($scope.idioma.Login[1],$scope.idioma.Login[7],function(){
					$scope.login.Contrasena="";
					});
				}else{
					Memory.set("Usuario",data);
					$rootScope.Usuario=data;
					$ionicViewSwitcher.nextDirection('forward');
					$state.go('app.home')
					
				}
				
			})
			.error(function(data){
				Message.alert($scope.idioma.Login[1],$scope.idioma.Login[7],function(){
					$scope.login.Contrasena="";
					});
			})
		}
	}
})

;
