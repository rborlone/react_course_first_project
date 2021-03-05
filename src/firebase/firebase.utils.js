  import firebase from 'firebase/app';
  import 'firebase/auth';
  import 'firebase/firestore';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAs-ryIXZ29FeYCtZPIuOgs3qWCPOg56k4",
    authDomain: "proyecto-1-reactjs-5fbcf.firebaseapp.com",
    projectId: "proyecto-1-reactjs-5fbcf",
    storageBucket: "proyecto-1-reactjs-5fbcf.appspot.com",
    messagingSenderId: "52245840344",
    appId: "1:52245840344:web:a4e446bd6237657bc632ad"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return ;

    const userRef = firestore.doc(`users/${userAuth.uid}`); //define el path de la collection con el identficador de usuarios con el uid

    const snapshot = await userRef.get(); //obtiene la referencia y queda a la espera como promesa.

    if(!snapshot.exists) {
        const { displayName, email } = userAuth; //destructuración de datos JSON
        const createAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData //con los 3 puntos engloba las demas propiedades. spreadoperator
            });
        } catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
  };

  export const auth = firebase.auth();
  export const firestore = firebase.firestore(); // firestores: todo lo que es apuntar a collectiones y a documentos

  //Configuracion del provider
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt : 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;