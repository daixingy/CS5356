// import logo from './logo.png';
import './App.css';
// import sample from './memes/image.jpeg'
// import sample1 from './memes/450_450__1554909083_gymmeme16.jpg'

// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore"

// or using ES6 imports:
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
 
// Configure Firebase.

var config = {
  apiKey: "AIzaSyBf__Eh5USYsX8AS5xIAJ0L8EDRVLylgmo",
  authDomain: "meme-8f992.firebaseapp.com",
  projectId: "meme-8f992",
  storageBucket: "meme-8f992.appspot.com",
  messagingSenderId: "128434492750",
  appId: "1:128434492750:web:ef048884b03f32e3b5ba1f"
};
firebase.initializeApp(config);
 
class SignInScreen extends React.Component {
 
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };
 
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };
 
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
 
  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>MEMES</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    );
  }
}

// // Initialize Firebase
// // firebase.initializeApp(firebaseConfig);
// if (!firebase.apps.length) {
//   firebase.initializeApp({firebaseConfig});
// }else {
//   firebase.app(); // if already initialized, use that one
// }

// function App(props) {
//   const subject = "Have fun browsing memes!!";
//   console.log(props)
//   return (
//     <div className="App">
//       <header className="App-header">
       
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           You've reached the funniest community.
//         </p>

//         <p>

//           <button type="button" className="btn btn-primary btn-lg" >Login</button>
             
//         </p>
//         <p>
//           {subject}
//         </p>
        
//         <img src={sample} className="memes" alt="meme1" />
//         <img src={sample1} className="memes" alt="meme2" />

       
        
//       </header>

//       {/* <body>

//           <!-- The core Firebase JS SDK is always required and must be listed first -->
//           <script src="/__/firebase/8.3.3/firebase-app.js"></script>

//           <!-- TODO: Add SDKs for Firebase products that you want to use
//               https://firebase.google.com/docs/web/setup#available-libraries -->

//           <!-- Initialize Firebase -->
//           <script src="/__/firebase/init.js"></script>

//           function SingnedInComponent(){
//             return (
//               <section className="section">
//                 <div className="container has-text-centered">
//                   Hello username!
//                   you're now signed in
//                 </div>
//               </section>
//             )

//             }
//       </body> */}

//     </div>
//   );
// }

export default SignInScreen;
