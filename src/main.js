// Este es el punto de entrada de tu aplicacion
import { myFunction, closeSession, signInUser, singUpNewUser } from './lib/index.js';
let database = firebase.firestore();

myFunction();

const authSection = document.getElementById('authSection'); // Sección de registro
const contentPage = document.getElementById('contentPage');

// Función que carga el Sign In
function loadSignIn() {
  location.hash = '/SignIn';
  const sbSingIn = document.createElement('button');
  sbSingIn.innerText = 'Entrar';
  sbSingIn.addEventListener('click', () => {
    sendButtonLogIn();
  });
  const toggleToSignUp = document.createElement('button');
  toggleToSignUp.innerHTML = 'No tengo cuenta';
  toggleToSignUp.addEventListener('click', () => {
    loadSignUp();
  });
  authSection.innerHTML = `
    <h1>Log in</h1>
    <input type="email" id="emailLogIn" placeholder="Email">
    <input type="password" id="passwordLogIn" placeholder="Contraseña">
  `;
  authSection.appendChild(sbSingIn);
  authSection.appendChild(toggleToSignUp);
  contentPage.innerHTML = '';
}

// Función que carga el Sign Up
function loadSignUp() {
  window.location.hash = '/SignUp';
  const sb = document.createElement('button');
  sb.innerText = 'Registrarme';
  sb.addEventListener('click', () => {
    sendButton();
  });
  const toggleToSignIn = document.createElement('button');
  toggleToSignIn.innerHTML = 'Ya tengo cuenta';
  toggleToSignIn.addEventListener('click', () => {
    loadSignIn();
  });

  authSection.innerHTML = `
      <h1>Sign up</h1>
      <input type="email" id="email" placeholder="Email">
      <input type="password" id="password" placeholder="Contraseña">
  `;
  authSection.appendChild(sb);
  authSection.appendChild(toggleToSignIn);
  contentPage.innerHTML = '';
}

// Crear y Registrar usuario con Firebase
const sendButton = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  singUpNewUser(email, password);
};


// Loggear usuario con Firebase
const sendButtonLogIn = () => {
  const email = document.getElementById('emailLogIn').value;
  const password = document.getElementById('passwordLogIn').value;

  signInUser(email, password);
};

// Observador que te dice si hay usuario logueado o no
function observerAuth() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('Existe usuario activo');
      afterLogIn(user);
      // User is signed in.
      const displayName = user.displayName;
      console.log(user);
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
      // ...
    } else {
      loadSignUp();
      // User is signed out.
      console.log('No existe usuario activo');
      // ...
    }
  });
}

observerAuth();

// Función para generar el contenido luego del Log in.
function afterLogIn(user) {
  if (user.emailVerified) {
    window.location.hash = '/home';
    const buttonClose = document.createElement('button');
    buttonClose.innerHTML = 'Cerrar Sesión';
    buttonClose.addEventListener('click', () => {
      closeSession();
    });
    contentPage.innerHTML = '<h3>Bienvenido</h3>';
    contentPage.appendChild(buttonClose);
    authSection.innerHTML = '';
    createPost();
  } else {
    window.location.hash = '/NeedVerification';
    console.log('No está verificado');
    const buttonClose = document.createElement('button');
    buttonClose.innerHTML = 'Cerrar Sesión';
    buttonClose.addEventListener('click', () => {
      closeSession();
    });
    contentPage.innerHTML = '<p>Verifica tu mail para poder entrar a la aplicación</p>';
    contentPage.appendChild(buttonClose);
    authSection.innerHTML = '';
  }
}

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#/SignIn') {
    loadSignIn();
  } else if (window.location.hash === '#/SignUp') {
    loadSignUp();
  } else if (window.location.hash === '#/home' || window.location.hash === '#/NeedVerification') {
    observerAuth();
  }
});


// Logica Post

const contentPost = document.getElementById('contentPost');

function createPost(){
  //aquí agregamos el componente de tipo input
  const input = document.createElement("INPUT");
  //aquí indicamos que es un input de tipo text
  input.type = 'text';
  //y por ultimo agreamos el componente creado al padre
  contentPost.appendChild(input);
  // creamos botton de envio de post
  const saveButton = document.createElement('button');

  saveButton.innerHTML = 'Save Post'
  saveButton.addEventListener('click', () => {
    savePost();
  })
  const loadButton = document.createElement('button');
  loadButton.innerHTML = 'Load Post'
  loadButton.addEventListener('click', () =>{
    sendPost();
  })
  contentPost.appendChild(saveButton);
  contentPost.appendChild(loadButton);
}

// //  const docRef = firestore.collection("post").doc("postUser");
// //  const outputHeader = document.querySelector('postOutPut');
// //  const inputTexField = document.querySelector('post');
// //  const saveButton = document.querySelector('saveButtond');

const savePost = () => {
  //const texToSave = inputTexField.value;
  //console.log("I am going to save" + texToSave + " to Firestore");
  database.collection("post").add({
    first: "SEGUNDOOO",
    last: "POST",
    born: "WOOOOHOOO"
  })
  .then(docRef => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(error => {
    console.error("Error adding document: ", error);
  });
};


const sendPost = () => {

database.collection("post").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}


//   docRef.set({
//     userStatus: texToSave

//   }).then(function(){
//     console.log("status saved!");

//   }).catch(function (error){
//     console.log("Got an error", error);
//   });
// })