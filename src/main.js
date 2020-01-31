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
const mainContent = document.getElementById('mainContent'); // Sección que contiene ContentPost y ContentMessage


// <------Función que carga el Sign In------>
const loadSignIn = () => {
  window.location.hash = '/SignIn'; // Le asigno el Hash a la página
  // Botón de entrar
  const sbSingIn = document.createElement('button');
  sbSingIn.innerText = 'Entrar';
  sbSingIn.classList.add("buttonLog");
  sbSingIn.addEventListener('click', () => {
    sendButtonLogIn();
  });
  // Botón de ya tengo cuenta
  const toggleToSignUp = document.createElement('button');
  toggleToSignUp.innerHTML = 'No tengo cuenta';
  toggleToSignUp.classList.add("buttonLog");
  toggleToSignUp.setAttribute("id", "buttonCreateAccount");
  toggleToSignUp.addEventListener('click', () => {
    loadSignUp();
  });
  // Botón de entrar con Google
  const buttonGoogle = document.createElement('button');
  buttonGoogle.innerHTML = 'Ingresa con Google';
  buttonGoogle.classList.add("buttonLog");
  buttonGoogle.addEventListener('click', () => {
    signUpGoogle();
  });
  // Link de olvidé contraseña
  const linkToForgot = document.createElement('span');
  linkToForgot.innerHTML = 'Olvidé mi contraseña';
  linkToForgot.setAttribute("id", "linkForgot");
  linkToForgot.addEventListener('click', () => {
    generateForgot();
  });
  authSection.innerHTML = `
  <img id="imgLogo" src="./images/Logo2-white.png" alt="imagen no encontrada" height="100">
    <form class="formLog"> 
      <h2>Inicia Sesión</h2>
      <input class="inputLog" type="email" id="emailLogIn" placeholder="Email">
      <input class="inputLog" type="password" id="passwordLogIn" placeholder="Contraseña">
    </form>  
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
  inputEmail.classList.add("inputLog");
  const buttonForgot = document.createElement('button');
  buttonForgot.innerHTML = 'Recuperar contraseña';
  buttonForgot.classList.add("buttonLog");
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
  sb.classList.add('buttonLog');
  sb.innerText = 'Registrarme';
  sb.addEventListener('click', () => {
    sendButton();
  });
  const toggleToSignIn = document.createElement('button');
  toggleToSignIn.innerHTML = 'Ya tengo cuenta';
  toggleToSignIn.setAttribute("id", "buttonSignIn");
  toggleToSignIn.classList.add('buttonLog');
  toggleToSignIn.addEventListener('click', () => {
    loadSignIn();
  });
  const buttonGoogle = document.createElement('button');
  buttonGoogle.innerHTML = 'Ingresa con Google';
  buttonGoogle.setAttribute("id", "buttonGoogle");
  buttonGoogle.classList.add('buttonLog');
  buttonGoogle.addEventListener('click', () => {
    signUpGoogle();
  });

  authSection.innerHTML = `
    <img id="imgLogo" src="./images/Logo2-white.png" alt="imagen no encontrada" height="100">
       <form class="formLog"> 
          <h2>Crea tu cuenta</h2>
          <input class="inputLog" type="name" id="name" placeholder="Nombre">
          <input class="inputLog" type="email" id="email" placeholder="Email">
          <input class="inputLog" type="password" id="password" placeholder="Contraseña">
       </form>
    
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
      document.body.style.backgroundColor = 'rgb(82, 115, 211)';
    });
    createPost();
    sendPost();
  } else {
    console.log('No está verificado');
    const divVerificaction = document.createElement('div');
    divVerificaction.id = 'divVerification';
    contentPage.appendChild(divVerificaction);
    const buttonClose = document.createElement('button');
    buttonClose.innerHTML = 'Cerrar Sesión';
    buttonClose.classList.add('buttonVerification');
    buttonClose.addEventListener('click', () => {
      closeSession();
      document.body.style.backgroundColor = 'rgb(82, 115, 211)';
    });
    divVerificaction.innerHTML = '<h3 id="verificationText">Verifica tu mail para poder entrar a la aplicación. Revisa en tu buzón de entrada o en el de spam. </h3>';
    divVerificaction.appendChild(buttonClose);
    authSection.innerHTML = '';
    mainContent.innerHTML = '';
  }
}; 


// <-----El Routing----->
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#/SignIn') {
    loadSignIn();
  } else if (window.location.hash === '#/SignUp') {
    loadSignUp();
  } else if (window.location.hash === '#/home') {
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
<<<<<<< HEAD
  input.placeholder = 'Escribe tu post aquí'
=======
  input.placeholder = 'Escribe tu post aquí';
>>>>>>> 13f02854e186c502b15f88bc75853d7bbfbd6ad2
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
    sendPost(textToSave)
    input.value = '';
  });

    //creamos boton de imagen
    // const imageButton = document.createElement('input');
    // imageButton.innerHTML = 'imagen';
    // imageButton.id = 'imageButton';
    // contentPost.appendChild(imageButton);
  


  divCatergorieAndSent.innerHTML += `
  <div class="card">
  <div class="rating-container">
    <div class="rating-text">
      <p>Categoría: </p>
    </div>
    <div class="rating">
      <form class="rating-form">
        <label for="super-happy">
			    <input type="radio" name="rating" class="super-happy" id="super-happy" value="jobs" />
			    <img class="svg" src="img/work.svg">
			  </label>

        <label for="happy">
			    <input type="radio" name="rating" class="happy" id="happy" value="visa" checked />
			    <img class="svg" src="img/passport.svg">
			  </label>

        <label for="neutral">
			    <input type="radio" name="rating" class="neutral" id="neutral" value="rent" />
			    <img class="svg" src="img/rent.svg">
			  </label>

        <label for="sad">
			    <input type="radio" name="rating" class="sad" id="sad" value="others" />
			    <img class="svg" src="img/more.svg">
        </label>
      </form>
      
      
   
    </div>
  </div>
</div>
  `;
  divCatergorieAndSent.appendChild(saveButton);
};

{/* <button id="fileButton" type="file" name="file" value=""></button> */}
   // <form>
      //  <label for="image">
      //   <input type="file" name="file" value="" id="uploadFile">
      //  </label> 
      // </form>

// Guardar Post en Firebase
const savePost = (textPost) => {
<<<<<<< HEAD
  const texToSave = textPost;
  console.log("I am going to save " + texToSave + " to Firestore");
  database.collection("post").add({
    POST: texToSave,
    like:[],
    postTime: new Date()
  })
    .then(docRef => {
      console.log("Status Saved!");
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(error => {
      console.error("Error adding document: ", error);
=======
  console.log(`I am going to save ${textPost} to Firestore`);
  database.collection('post').add({
    POST: textPost,
    postTime: new Date(),
  })
    .then((docRef) => {
      console.log('Status Saved!');
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
>>>>>>> 13f02854e186c502b15f88bc75853d7bbfbd6ad2
    });
};


// Traer Post
const contentMessage = document.getElementById('contentMessage');

const sendPost = (textPost) => {
<<<<<<< HEAD
  const texToSave = textPost;
  console.log("I am going to save " + texToSave + " to Firestore");

  const colletionOfPost = database.collection("post")
  const postsOrdered = colletionOfPost.orderBy("postTime", "desc")
=======
  console.log(`I am going to save ${textPost} to Firestore`);

  const colletionOfPost = database.collection('post');
  const postsOrdered = colletionOfPost.orderBy('postTime', 'desc');
>>>>>>> 13f02854e186c502b15f88bc75853d7bbfbd6ad2


  postsOrdered.onSnapshot((querySnapshot) => {
    contentMessage.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const divPost = document.createElement('div');
<<<<<<< HEAD
      divPost.id = `divPost-${doc.id}`
      contentMessage.appendChild(divPost);
      console.log(doc.id, " => ", doc.data());
      divPost.innerHTML +=
        `
            <p class="message" id='messagePosted'> ${doc.data().POST}</p>
            `

      const likeButton = document.createElement('button');
      likeButton.innerHTML = 'Like';
      likeButton.classList.add('likeButton');
      likeButton.addEventListener('click', () => {
        postLike(doc.id);
        console.log(doc.data().like.length)
      });

      const numberLikes = document.createElement('span');
      numberLikes.id = `numberLikes-${doc.id}`;
      numberLikes.classList.add('numberLikes');
      numberLikes.innerHTML = doc.data().like.length;


      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'Eliminar';
      deleteButton.addEventListener('click', () => {
        deletePost(doc.id);
      })

      const editButton = document.createElement('button');
      editButton.innerHTML = 'Editar';

      editButton.id = 'Edit'
      editButton.addEventListener('click', () => {
        document.getElementById(`divPost-${doc.id}`).innerHTML = `<textarea id='editTextArea'></textarea>`
        document.getElementById('editTextArea').value = doc.data().POST;
        const confirmButton = document.createElement('button');
        confirmButton.innerHTML = 'confirmar'
        confirmButton.addEventListener('click', () => {
          editPost(doc.id, document.getElementById('editTextArea').value);
          console.log('Está saliendo de editar')
        });

        document.getElementById(`divPost-${doc.id}`).appendChild(confirmButton);
      })
      divPost.appendChild(numberLikes);
      divPost.appendChild(likeButton);
      divPost.appendChild(deleteButton);
      divPost.appendChild(editButton);
    });
  })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

//Eliminar Post
function deletePost(id) {
  database.collection("post").doc(id).delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}

////Editar Post
const editPost = (id, textToSave) => {

  const postRef = database.collection("post").doc(id);
  console.log('Está editando')
  return postRef.update({
    POST: textToSave,
    postTime: new Date()
  }).then(function () {
    console.log("Document successfully updated!");
  }).catch(function (error) {
    console.error("Error updating document: ", error);
  })
}


// <-------------Función editar post-------------->
//  let editPost = (id, textToSave) => {
//   console.log('Está entrando a editar')

//       database.collection('post').doc(id).set({
//         POST: textToSave,
//         postTime: new Date()
//       }).then(function () {
//         console.log('document successfully updated!!');
//       })
//         .catch(function () {
//           console.log('Error update document: ', error)
//         });
//     }

const postLike = (id) =>{
  let user = firebase.auth().currentUser;	
  console.log('Está entrando el postlike')
	
	// de la collection post traeme el documento con el ID, "id"
	database.collection('post').doc(id).get().then((query) => {

		let post = query.data();

		if (post.like == null || post.like == '') {
			post.like = [];
			console.log("ento al like vacio");
		}

		if (post.like.includes(user.uid)) {

			for (let i = 0; i < post.like.length; i++) {

				if (post.like[i] === user.uid) { //verifica si ya el usuario está en el array

					post.like.splice(i, 1); // sentencia para eliminar un elemento de un array
					
					database.collection('post').doc(id).update({ // para actualizar el array
						like: post.like
          }); 
          
				}
			}
		} else {

			post.like.push(user.uid); //entoncesincluyeme este usuario en este array
			database.collection('post').doc(id).update({ 
				like: post.like
			});
			
		}

		// document.getElementById(`numberLikes-${doc.id}`).innerHTML = post.like.length;
	})
		.catch(function (error) {

		});	

}


=======
      divPost.classList.add('divPost');
      divPost.id = `divPost-${doc.id}`;
      contentMessage.appendChild(divPost);
      console.log(doc.id, ' => ', doc.data());

      divPost.innerHTML += `
            <p class="message" id='messagePosted'> ${doc.data().POST}</p>
            `;

      const divIcons = document.createElement('div');
      divIcons.classList.add('divIcons');
      divPost.appendChild(divIcons);

      const deleteButton = document.createElement('img');
      deleteButton.classList.add('iconsDivPost');
      deleteButton.src = 'img/close.svg';
      deleteButton.addEventListener('click', () => {
        deletePost(doc.id);
      });

      const editButton = document.createElement('img');
      editButton.src = 'img/edit.svg';
      editButton.classList.add('iconsDivPost');
      editButton.id = 'Edit';

      editButton.addEventListener('click', () => {
        document.getElementById(`divPost-${doc.id}`).innerHTML = 
        `<textarea id="editTextArea" class="editTextArea"></textarea>`;
        document.getElementById('editTextArea').value = doc.data().POST;
        const confirmButton = document.createElement('img');
        confirmButton.src = 'img/tick.svg';
        confirmButton.classList.add('confirmButton');

        confirmButton.addEventListener('click', () => {
          editPost(doc.id, document.getElementById('editTextArea').value);
          console.log('Está saliendo de editar');
        });

        document.getElementById(`divPost-${doc.id}`).appendChild(confirmButton);
      });
      divIcons.appendChild(deleteButton);
      divIcons.appendChild(editButton);
    })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  });
};

// Eliminar Post
function deletePost(id) {
  database.collection('post').doc(id).delete().then(() => {
    console.log('Document successfully deleted!');
  })
    .catch((error) => {
      console.error('Error getting documents: ', error);
    });
}


// //Editar Post
const editPost = (id, textToSave) => {
  const postRef = database.collection('post').doc(id);
  console.log('Está editando');
  return postRef.update({
    POST: textToSave,
    postTime: new Date(),
  }).then(() => {
    console.log('Document successfully updated!');
  }).catch((error) => {
    console.error('Error updating document: ', error);
  });
};


// <-------------Función editar post-------------->
//  let editPost = (id, textToSave) => {
//   console.log('Está entrando a editar')

//       database.collection('post').doc(id).set({
//         POST: textToSave,
//         postTime: new Date()
//       }).then(function () {
//         console.log('document successfully updated!!');
//       })
//         .catch(function () {
//           console.log('Error update document: ', error)
//         });
//     }
>>>>>>> 13f02854e186c502b15f88bc75853d7bbfbd6ad2
