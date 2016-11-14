angular.module('starter.services', [])
.service('User', function (FactoryUser){

   
   
	 this.CrearUsuario = CrearUsuario;
   this.Login=Login;
   this.TraerDatosUsuario=TraerDatosUsuario;
   this.CrearObjetofireBase=CrearObjetofireBase;

    	function CrearUsuario(email,contrasena,nombre,apellido,telefono)
    	{
              //var promise = defered.promise;
             
          		firebase.auth().createUserWithEmailAndPassword(email,contrasena).then(function(result) {
                
                CrearPerfil(email,nombre,apellido,telefono);
                window.location.href= "#/tab/login";
                }, function(error) {
                 
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode == 'auth/weak-password') {
                          alert('The password is too weak.');
                        } else {
                          if(errorCode=='auth/email-already-in-use')
                          {
                            alert('El usuario ya existe');
                          }
                          else
                          {
                             alert(errorMessage);
                          }
                        }
        
                });
      	}

        function CrearPerfil(email,nombre,apellido,telefono)
        {
            var messagesRef = new Firebase(FactoryUser.firebase);

             messagesRef.push({email:email, nombre:nombre,apellido:apellido,telefono:telefono,tipo:"User"});
             alert("Usuario creado");
        }
       
        function Login(email,contrasena)
        {
            firebase.auth().signInWithEmailAndPassword($("#email").val(),$("#contrasena").val()).then(function(result) {
                
                   
                  window.location.href= "#/tab/accidentes";

                }, function(error) {
                        
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode == 'auth/wrong-password') {
                          alert('La contraseña es incorrecta');
                        } else {
                          if(errorCode=='auth/user-not-found')
                          {
                            alert('El usuario no existe');
                          }
                          else
                          {
                             alert(errorMessage);
                          }
                        }
                        console.log(error);
        
                });
        }
          function CrearObjetofireBase()
        {
             var obj = new Firebase(FactoryUser.firebase);
             return obj;
        }
        function TraerDatosUsuario()
        {
            var user = firebase.auth().currentUser;
            console.log("Estoy en traer datos usuario: "+user);
            return user;
        }


})