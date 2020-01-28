// Este es el punto de entrada de tu aplicacion
import {
  myFunction, closeSession, signInUser, singUpNewUser, signUpGoogle, forgotPassword,
} from './lib/index.js';

const database = firebase.firestore();
// let db = firebase.database();

myFunction();

const authSection = document.getElementById('authSection'); // Sección de registro
const contentPage = document.getElementById('contentPage'); // Sección de parte de arriba del home
const contentPost = document.getElementById('contentPost'); // Sección de los posts


// <------Función que carga el Sign In------>
const loadSignIn = () => {
  window.location.hash = '/SignIn'; // Le asigno el Hash a la página
  // Botón de entrar
  const sbSingIn = document.createElement('button');
  sbSingIn.innerText = 'Entrar';
  sbSingIn.addEventListener('click', () => {
    sendButtonLogIn();
  });
  // Botón de ya tengo cuenta
  const toggleToSignUp = document.createElement('button');
  toggleToSignUp.innerHTML = 'No tengo cuenta';
  toggleToSignUp.addEventListener('click', () => {
    loadSignUp();
  });
  // Botón de entrar con Google
  const buttonGoogle = document.createElement('button');
  buttonGoogle.innerHTML = 'Ingresa con Google';
  buttonGoogle.addEventListener('click', () => {
    signUpGoogle();
  });
  // Link de olvidé contraseña
  const linkToForgot = document.createElement('span');
  linkToForgot.innerHTML = 'Olvidé mi contraseña';
  linkToForgot.addEventListener('click', () => {
    generateForgot();
  });
  authSection.innerHTML = `
    <h1>Log in</h1>
    <input type="email" id="emailLogIn" placeholder="Email">
    <input type="password" id="passwordLogIn" placeholder="Contraseña">
  `;
  authSection.appendChild(sbSingIn);
  authSection.appendChild(linkToForgot);
  authSection.appendChild(buttonGoogle);
  authSection.appendChild(toggleToSignUp);
  contentPage.innerHTML = '';
  contentPost.innerHTML = '';
};

// <-----Función de Olvidé mi Contraseña----->
const generateForgot = () => {
  window.location.hash = '/forgot';
  const inputEmail = document.createElement('input');
  inputEmail.placeholder = 'Tu email';
  const buttonForgot = document.createElement('button');
  buttonForgot.innerHTML = 'Recuperar contraseña';
  buttonForgot.addEventListener('click', () => {
    forgotPassword(inputEmail.value);
  });
  contentPage.innerHTML = '';
  contentPost.innerHTML = '';
  authSection.innerHTML = '';
  authSection.appendChild(inputEmail);
  authSection.appendChild(buttonForgot);
};

// <------Función que carga el Sign Up------>
const loadSignUp = () => {
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
  const buttonGoogle = document.createElement('button');
  buttonGoogle.innerHTML = 'Ingresa con Google';
  buttonGoogle.addEventListener('click', () => {
    signUpGoogle();
  });

  authSection.innerHTML = `
      <h1>Sign up</h1>
      <input type="text" id="name" placeholder="Nombre">
      <input type="email" id="email" placeholder="Email">
      <input type="password" id="password" placeholder="Contraseña">
  `;
  authSection.appendChild(sb);
  authSection.appendChild(buttonGoogle);
  authSection.appendChild(toggleToSignIn);
  contentPage.innerHTML = '';
  contentPost.innerHTML = '';
  contentMessage.innerHTML = '';
};

// <------Crear y Registrar usuario con Firebase------>
const sendButton = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;

  singUpNewUser(email, password, name);
};


// <------Loggear usuario con Firebase------>

const sendButtonLogIn = () => {
  const email = document.getElementById('emailLogIn').value;
  const password = document.getElementById('passwordLogIn').value;

  signInUser(email, password);
};

// <-----Observador que te dice si hay usuario logueado o no----->
const observerAuth = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('Existe usuario activo');
      afterLogIn(user);
      // User is signed in.
      const displayName = user.displayName;
      //  console.log(user);
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
};
observerAuth();


// <------Función para generar el contenido luego del Log in/Sign up------>
const afterLogIn = (user) => {
  if (user.emailVerified) {
    window.location.hash = '/home';
    document.body.style.backgroundColor = 'white';
    contentPage.innerHTML = ` 
    <div class="align">
      <nav class="navigation navigation--inline">
        <img src="img/Logo2-long.png" id="logo"> 
        <ul class="list-icon">
          <li id="top-bar">
            <a class="icons-a" href="#">
              <img class="icon icon--2x icon-white" src="img/home.svg">
              <span class="textIcon">Inicio</span>
            </a>
          </li>
      <li id="top-bar">
        <a class="icons-a" href="#">
          <img class="icon icon--2x icon-white" src="img/work.svg">
          <span class="textIcon">Trabajo</span>
        </a>
      </li>
      <li id="top-bar">
        <a class="icons-a" href="#">
          <img class="icon icon--2x icon-white" src="img/passport.svg">
          <span class="textIcon">Visa</span>
        </a>
      </li>
      <li id="top-bar">
        <a class="icons-a" href="#">
          <img class="icon icon--2x icon-white" src="img/rent.svg">
          <span class="textIcon">Arriendos</span>
        </a>
      </li>
      <li id="top-bar">
        <a class="icons-a" href="#">
          <img class="icon icon--2x icon-white" src="img/more.svg">
          <span class="textIcon">Otros</span>
        </a>
      </li>
      <li class="dropdown">
        <img class="icon icon--2x dropbtn" id="profilePic" src=${user.photoURL}>
          <div class="dropdown-content">
            <a href="#">Ver mi perfil</a>
            <a href="#" id="closeSessionBT">Cerrar Sesión</a>
          </div>
      </li>
    </ul>
  </nav>
  </div>  

  <!-- Barra de abajo para mobile --->
  <div class="align down-bar">
      <nav class="navigation navigation--inline">
        <ul id="classOfList">
          <li>
            <a class="icons-a" href="#">
              <img class="icon icon--2x icon-white" src="img/home.svg">
              <span class="textIcon">Inicio</span>
            </a>
          </li>
         <li>
            <a class="icons-a" href="#">
              <img class="icon icon--2x icon-white" src="img/work.svg">
              <span class="textIcon">Trabajo</span>
            </a>
          </li>
          <li>
           <a class="icons-a" href="#">
              <img class="icon icon--2x icon-white" src="img/passport.svg">
              <span class="textIcon">Visa</span>
           </a>
          </li>
          <li>
            <a class="icons-a" href="#">
              <img class="icon icon--2x icon-white" src="img/rent.svg">
              <span class="textIcon">Arriendos</span>
            </a>
          </li>
          <li>
            <a class="icons-a" href="#">
              <img class="icon icon--2x icon-white" src="img/more.svg">
              <span class="textIcon">Otros</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `;
    authSection.innerHTML = '';
    contentPost.innerHTML = '';
    document.getElementById('closeSessionBT').addEventListener('click', () => {
      closeSession();
    });
    createPost();
    sendPost();
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
};


// <-----El Routing----->
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#/SignIn') {
    loadSignIn();
  } else if (window.location.hash === '#/SignUp') {
    loadSignUp();
  } else if (window.location.hash === '#/home' || window.location.hash === '#/NeedVerification') {
    const actualUser = firebase.auth().currentUser;
    afterLogIn(actualUser);
  } else if (window.location.hash === '#/forgot') {
    generateForgot();
  }
});


// <-----Logica Post------>

const createPost = () => {
  // aquí agregamos el componente de tipo input
  const input = document.createElement('textarea');
  // aquí indicamos que es un input de tipo text
  input.classList.add('createMessage');
  input.placeholder = 'Escribe tu post aquí';
  input.id = 'textToSave';

  // y por ultimo agreamos el componente creado al padre
  contentPost.appendChild(input);

  const divCatergorieAndSent = document.createElement('div');
  divCatergorieAndSent.id = 'CatergorieAndSent';
  contentPost.appendChild(divCatergorieAndSent);

  // creamos botton de envio de post
  const saveButton = document.createElement('img');
  saveButton.src = 'img/paper-plane.png';
  saveButton.id = 'saveButton';

  saveButton.addEventListener('click', () => {
    const textToSave = input.value;
    console.log(textToSave);
    savePost(textToSave);
    sendPost(textToSave);
  });
  divCatergorieAndSent.innerHTML += `
  <div class="card">
  <div class="rating-container">
    <div class="rating-text">
      <p>Categoría: </p>
    </div>
    <div class="rating">
      <form class="rating-form">

        <label for="super-happy">
			<input type="radio" name="rating" class="super-happy" id="super-happy" value="super-happy" />
			<img class="svg" src="img/work.svg">
			</label>

        <label for="happy">
			<input type="radio" name="rating" class="happy" id="happy" value="happy" checked />
			<img class="svg" src="img/passport.svg">
			</label>

        <label for="neutral">
			<input type="radio" name="rating" class="neutral" id="neutral" value="neutral" />
			<img class="svg" src="img/rent.svg">
			</label>

        <label for="sad">
			<input type="radio" name="rating" class="sad" id="sad" value="sad" />
			<img class="svg" src="img/more.svg">
			</label>

      </form>
    </div>
  </div>
</div>
  `;
  divCatergorieAndSent.appendChild(saveButton);
};


// Guardar Post en Firebase
const savePost = (textPost) => {
  const texToSave = textPost;
  console.log(`I am going to save ${  texToSave  } to Firestore`);
  database.collection('post').add({
    POST: texToSave,
  })
    .then((docRef) => {
      console.log('Status Saved!');
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};


// Traer Post
const contentMessage = document.getElementById('contentMessage');

const sendPost = (textPost) => {
  const texToSave = textPost;
  console.log(`I am going to save ${  texToSave  } to Firestore`);
  database.collection('post')
    .onSnapshot((querySnapshot) => {
      contentMessage.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const divPost = document.createElement('div');
        contentMessage.appendChild(divPost);
        console.log(doc.id, ' => ', doc.data());
        divPost.innerHTML
            += `
            <div class="message"> ${doc.data().POST}</div>
            `;
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Eliminar';
        deleteButton.addEventListener('click', () => {
          deletePost(doc.id);
        });

        const editButton = document.createElement('button');
        editButton.innerHTML = 'Editar';

        editButton.id = 'Edit';
        editButton.addEventListener('click', () => {
          editPost(doc.id, doc.data().POST);
        });
        divPost.appendChild(deleteButton);
        divPost.appendChild(editButton);
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
};

// Eliminar Post
function deletePost(id) {
  database.collection('post').doc(id).delete().then(() => {
    console.log('Document successfully deleted!');
  })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
}


// Editar Post
function editPost(id, texToSave) {
  document.getElementById('textToSave').value = texToSave;
  const changeButton = document.getElementById('saveButton');
  changeButton.innerHTML = 'Editar';

  changeButton.addEventListener('click', () => {
    const postRef = database.collection('post').doc(id);

    const textToSave = document.getElementById('textToSave').value;
    console.log('Está editando');
    return postRef.update({
      POST: textToSave,
    })
      .then(() => {
        console.log('Document successfully updated!');
        changeButton.innerHTML = 'Save Post';
        document.getElementById('textToSave').value = '';
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  });
}
