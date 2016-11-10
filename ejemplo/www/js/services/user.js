angular.module('starter.services', [])
.service('User', function ($timeout){

   
   
	 this.CrearUsuario = CrearUsuario;
   this.Login=Login;
   this.TraerDatosUsuario=TraerDatosUsuario;

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
            var messagesRef = new Firebase('https://autopistas-cad17.firebaseio.com/user');

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
        function TraerDatosUsuario()
        {
            console.log("Estoy en traerdatosusuario");
            var messagesRef = new Firebase('https://autopistas-cad17.firebaseio.com/user')
            var user = firebase.auth().currentUser;
            var email;
            var retornousuario=new Object();
            email = user.email;
             $timeout(function() {
                 messagesRef.on('child_added', function (snapshot) {
                  //GET DATA
                   var data = snapshot.val();
                  if (user != null) {
                 
                        if(data.email==email)
                        {
                          retornousuario.email=data.email;
                          retornousuario.nombre=data.nombre;
                          retornousuario.apellido=data.apellido;
                          retornousuario.apellido=data.telefono;
                          console.log("Estoy dentro del if");
                        }
                    }
                });
           }, 3000);   
         
            return retornousuario; 
       
    // Loadind done here - Show message for 3 more seconds.
          
        }


})