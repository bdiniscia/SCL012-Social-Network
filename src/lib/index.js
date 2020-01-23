// aqui exportaras las funciones que necesites

const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};

// Función que cierra sesión
const closeSession = () => {
  firebase.auth().signOut()
    .then(() => {
      console.log('Saliendo');
      contentPage.innerHTML = '';
    })
    .catch((error) => {
      console.log(error);
    });
};

// Función que envía el mail de verificación
const emailVerification = () => {
  const user = firebase.auth().currentUser;

  user.sendEmailVerification()
    .then(() => {
      // Email sent.
      console.log('Enviando correo...');
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};

const signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    // ...
    });
};

const singUpNewUser = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      emailVerification();
    })
    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(errorCode);
      console.log(errorMessage);
    // ...
    });
};

const signUpGoogle = () => {
  let provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {
    // // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = result.credential.accessToken;
    // // The signed-in user info.
    // var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
};

export {
  myFunction, closeSession, signInUser, singUpNewUser, signUpGoogle
};
