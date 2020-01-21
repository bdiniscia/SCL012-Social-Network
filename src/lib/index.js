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
    .then((user) => {
      emailVerification();
      afterLogIn(user);
    })
    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    // ...
    });
};


export {
  myFunction, closeSession, signInUser, singUpNewUser,
};
