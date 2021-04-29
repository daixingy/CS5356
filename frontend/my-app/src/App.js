
import React from 'react';
import './App.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import firebase from 'firebase';

import firebase from "firebase/app"
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf__Eh5USYsX8AS5xIAJ0L8EDRVLylgmo",
  authDomain: "meme-8f992.firebaseapp.com",
  projectId: "meme-8f992",
  storageBucket: "meme-8f992.appspot.com",
  messagingSenderId: "128434492750",
  appId: "1:128434492750:web:ef048884b03f32e3b5ba1f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class SignInScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // isSignedIn: false, // Local signed-in state.
      orders: null
    };
  }
  async componentDidMount(){
    let backendUrl = "https://mng3jind5f.execute-api.us-east-1.amazonaws.com/dev/"
    if (window.location.href.includes("localhost")) {
      // document.write("idToken")
      backendUrl = 'http://localhost:4000/dev'
    }
    const idToken = await firebase.auth().currentUser?.getIdToken()
    // document.write(idToken)
    const response = await fetch(backendUrl + "/orders", {
      headers: {
        'Authorization': idToken
      }
    })

    if(response.status === 401) {
      document.write("error")
      return console.log('unauthorized')
    }
    const orders = await response.json()
    // document.write(orders)
    // save it to your components state so you can use it during render
    this.setState({ orders: orders })
    console.log(orders)
  }
    signOut() {
      firebase.auth().signOut()
    }

  render() {
    const userName = firebase.auth().currentUser?.email;
    return (
      <section className="section">
        <div className="container has-text-centered">
          Hello {userName}! You're now signed in
          <div className="title">My Orders</div>
          
          <ul>
            {
              this.state.orders && this.state.orders.map(order => {
                return (
                  <li>
                    <div>Order ID: {order.id}</div>
                    <div>Order status: {order.status}</div>
                  </li>
                )
              })
            }
          </ul>
          <button onClick={() => this.signOut()}>Sign out</button>
        </div>
      </section>
    );
    
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user:null,
    };
  }

  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({ isSignedIn: !!user})
    );
  }

  componentDidUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (this.state.isSignedIn) {
      return <SignInScreen />;
    }

    return (
      <section className="section">
        <div className="container has-text-centered">
          <h1 className="title">Restaurant Orders</h1>
          <div className="subtitle">make orders</div>

          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </section>
    );


  }
}
export default App;
