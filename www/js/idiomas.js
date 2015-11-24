angular.module('starter.controllers')
.controller('Idioma', function($scope,Message) {
  // Might use a resource here that returns a JSON array
	
  // Some fake testing data
  var idiomas = {
  	es:{
		Login:{
			1:"Iniciar Sesión",
			2:"Matrícula",
			3:"Contraseña",
			4:"Entrar",
			5:"Registro",
			6:"¿Olvidaste tu contraseña?",
			7:"La matrícula y la contraseña que ingresaste no coinciden con nuestros registros.\nPor favor, revisa e inténtalo de nuevo.",
			8:"Iniciando sesión...",
			9:"Cerrando sesión...",
			10:"¿Desea cerrar su sesión?"
		},
		general:{
			1:"Cargando...",
			2:"Aceptar",
			3:"Actualizar",
			4:"Continuar",
			5:"Cancelar"
		},
		registro:{
			1:"Correo electrónico    @itesm.mx",
			2:"Nombre",
			3:"Apellido",
			4:"Contraseña",
			5:"Para registrarte es necesario que proporciones la siguiente información.",
			6:"La contraseña debe contener 8 digitos o más.",
			7:"Registro",
			8:"Es necesario llenar todos los campos para proceder con el registro",
			9:"El correo que ingresaste no corresponde a una cuenta de ITESM.",
			10:"Usuario registrado.",
			11:"Error al registrar, intenta de nuevo",
			12:"Registrando usuario..."
		}
	},
	en:{
		Login:{
			1:"Sign In",
			2:"Email",
			3:"Password",
			4:"Sign In",
			5:"Create new account",
			6:"Forgot your password?",
			7:"E-mail or password are incorrect.\nPlease check and try again.",
			8:"Logging...",
			9:"Signing off...",
			10:"Do you want to log out?"
		}
	}
  }
  $scope.idioma=idiomas.es;
  if(navigator.globalization)
	navigator.globalization.getPreferredLanguage(function (language) {
			var l=language.value.split("-")
			//if(l[0]=="EN" || l[0]=="en" || l[0]=="En")$scope.idioma=idiomas.en;
   	})
	Message.setDictionary($scope.idioma);
	
})