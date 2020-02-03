// aqui exportaras las funciones que necesites

const database = firebase.firestore();

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
      alert(errorMessage);
    // ...
    });
};

const singUpNewUser = (email, password, name) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(result => result.user.updateProfile({
      displayName: name,
    }))
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
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    // ...
  });
};

const forgotPassword = (emailAddress) => {
  firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
    // Email sent.
  }).catch((error) => {
    // An error happened.
  });
};

// Eliminar Post
const deletePost = (id) => {
  database.collection('post').doc(id).delete().then(() => {
    console.log('Document successfully deleted!');
  })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

// Guardar Post en Firebase
// Guardar Post en Firebase
const savePost = (textPost, rate) => {
  console.log(`I am going to save ${textPost} to Firestore`);

  const user = firebase.auth().currentUser;

  let categorySelect;

  for (let i = 0; i < rate.length; i++) {
    if (rate[i].checked) {
      console.log(`Es el elemento ${  i}`);
      categorySelect = i;
    }
  }

  // - Se setean en falso todos los valores
  let check_jobs = false;
  let check_visa = false;
  let check_rent = false;
  let check_other = false;

  // - Se verifica cuál categoría está activa
  if (categorySelect == 0) {
    check_jobs = true;
  }
  if (categorySelect == 1) {
    check_visa = true;
  }
  if (categorySelect == 2) {
    check_rent = true;
  }
  if (categorySelect == 3) {
    check_other = true;
  }

  database.collection('post').add({
    POST: textPost,
    like: [],
    name: user.displayName,
    userID: user.uid,
    postTime: new Date().toUTCString(),
    categories: {
      jobs: check_jobs,
      visa: check_visa,
      rent: check_rent,
      other: check_other,
    },
  })
    .then((docRef) => {
      console.log('Status Saved!');
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

// //Editar Post
const editPost = (id, textToSave) => {
  const postRef = database.collection('post').doc(id);
  console.log('Está editando');
  return postRef.update({
    POST: textToSave,
    postTime: new Date().toUTCString(),
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

const postLike = (id) => {
  const user = firebase.auth().currentUser;
  console.log('Está entrando el postlike');

  // de la collection post traeme el documento con el ID, "id"
  database.collection('post').doc(id).get().then((query) => {
    const post = query.data();

    if (post.like == null || post.like == '') {
      post.like = [];
      console.log('ento al like vacio');
    }

    if (post.like.includes(user.uid)) {
      for (let i = 0; i < post.like.length; i++) {
        if (post.like[i] === user.uid) { // verifica si ya el usuario está en el array
          post.like.splice(i, 1); // sentencia para eliminar un elemento de un array

          database.collection('post').doc(id).update({ // para actualizar el array
            like: post.like,
          });
        }
      }
    } else {
      post.like.push(user.uid); // entoncesincluyeme este usuario en este array
      database.collection('post').doc(id).update({
        like: post.like,
      });
    }
  })
    .catch((error) => {
      console.log(error);
    });
};

export {
  closeSession, signInUser, singUpNewUser, signUpGoogle, forgotPassword, deletePost, savePost, editPost, postLike,
};
