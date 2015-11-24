angular.module('starter.services', ['LocalStorageModule','ngError'])
.factory('Memory', function(localStorageService) {
	
	return {
		set: function(key,val){
			localStorageService.set(key, val);
		},
		get: function(key){
			return localStorageService.get(key);
		},
		clean: function(){
			localStorageService.clearAll();
		}
	}
})

.factory('Message', function(localStorageService,$ionicLoading,$ionicPopup,$timeout,$ionicActionSheet) {
	var dictionary=null
	var alertPopUp=null;
	var inputPopUp=null
	
   
	return {
		setDictionary:function(dictionary){
			this.dictionary=dictionary
		},
		showLoading: function(texto){
			$ionicLoading.show({
      			template: '<div style="width:100%"><ion-spinner icon="ripple" class="spinner-dark"></ion-spinner></div>'+texto
   			});
		},
		hideLoading: function(){
			$ionicLoading.hide();
		},
		alert:function(titulo,texto,funcion){
			if(alertPopUp)alertPopUp.close();
			alertPopUp = $ionicPopup.alert({
     			title: titulo,
     			template: texto,
				okText: this.dictionary.general[2]
   			});
   			alertPopUp.then(function(res) {
     			funcion();
   			});
		},
		showOptions:function(title,buttons,funcion){
			var hideSheet = $ionicActionSheet.show({
     			buttons: buttons,
     			titleText: title,
     			destructiveText: 'Cancel',
     			cancel: function() {
          			// add cancel code..
        		},
     			buttonClicked: function(index) {
					funcion(index)
      				return true;
     			},
				destructiveButtonClicked:function(){
					return true;
				}
   			});
		},
		input:function(title,subtitle,type,placeholder,funcion,valor){
			valor= valor || "";
			if(inputPopUp)inputPopUp.close();
			inputPopUp = $ionicPopup.show({
     			 template: '<input class="input-prompt" type="'+type+'" placeholder="'+placeholder+'" value="'+valor+'">',
    			title: title,
    			subTitle: subtitle,
				inputType: type,
				buttons: [{ 
    				text: this.dictionary.general[5],
    				type: 'button-stable',
    				onTap: function(){
					  return 0;
					}
  				}, {
    				text: this.dictionary.general[2],
    				type: 'button-positive',
    				onTap: function(){
					return 1;
					}
  				}]
  			});
   			inputPopUp.then(function(res) {
     			 if(res){
					 $ionicLoading.show({template: '<div style="width:100%"><ion-spinner icon="ripple" class="spinner-dark"></ion-spinner></div>'});
		 			var val =$(".input-prompt").val();
		  			inputPopUp.close(); 
		  			$timeout(function(){
			 			funcion(val);
		  			},200);
	
	  			}else{
		 			inputPopUp.close(); 
		 			funcion(false);
	  			}
   			});
		}
	}

})
.factory('Friends', function($http,$rootScope) {
  // Might use a resource here that returns a JSON array
//biblioteca,Gimnacio,Aulas1, Aulas 2, Aulas 3,
  // Some fake testing data
  var Friends = [];
  return {
	refresh: function(){
		return $http.post("https://www.virtual-guardian.com/campus/friends/"+$rootScope.Usuario.IdUsuario+"?key=bJzepWm4sxNNRvB6RD5P")
		
	},
	set:function(friends){
		Friends=friends
	},
    all: function() {
      return Friends;
    },
    get: function(userId) {
      for (var i = 0; i < Friends.length; i++) {
        if (Friends[i].IdUsuario === parseInt(userId)) {
          return Friends[i];
        }
      }
      return null;
    }
  };
})
.factory('Places', function($http) {
  // Might use a resource here that returns a JSON array
//biblioteca,Gimnacio,Aulas1, Aulas 2, Aulas 3,
  // Some fake testing data
  var Lugares = [];
  return {
	refresh: function(){
		return $http.post("https://www.virtual-guardian.com/campus/lugares?key=bJzepWm4sxNNRvB6RD5P")
		
	},
	set:function(lugares){
		Lugares=lugares
	},
    all: function() {
      return Lugares;
    },
    get: function(placeId) {
      for (var i = 0; i < Lugares.length; i++) {
        if (Lugares[i].IdLugar === parseInt(placeId)) {
          return Lugares[i];
        }
      }
      return null;
    }
  };
})
.factory('MarkerSpecial', function(uiGmapGoogleMapApi) {
	var marker=null;
	return {
		set: function(map,latitud,longitud,img,icon) {
			if(marker!=null)marker.setMap(null);
			marker = new RichMarker({
				position: new google.maps.LatLng(latitud,longitud),
     			map: map,
	  			shadow: 'none',
				data:1,
      			content: '<div class="placeMarker"  style="background:url('+img+'); background-size:cover;background-position:center;"><button class="contIconMarker"><i class="icon '+icon+' iconMarker"></i></button></div>'
			});
			//markers.push(marker);
			var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitud,longitud),
        map: map,
       	zIndex: 2,
		data:"hola"
    });
			return marker
		},
		setUserM: function(map,latitud,longitud,img,icon) {
			console.log(icon)
			if(marker!=null)marker.setMap(null);
			var marker = new RichMarker({
				position: new google.maps.LatLng(latitud,longitud),
     			map: map,
	  			shadow: 'none',
				data:1,
      			content: '<div class="placeMarker"  style="background:url('+img+'); background-size:cover;background-position:center;"><button class="contIconMarker"><img class="iconMarker" src="https://www.virtual-guardian.com/campus/perfil/'+icon+'.jpg"<></button></div>'
			});
			//markers.push(marker);
			var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitud,longitud),
        map: map,
       	zIndex: 2,
		data:"hola"
    });
			return marker
		},
		remove:function (id){
			for(var i=0;i<markers.length;i++){
				//if(markers[i].data==id)markers.
			}
		}
	}
})
