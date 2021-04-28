
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

  // The component's Local state.


  // Configure FirebaseUI.

  // Listen to the Firebase Auth state and set the local state.

  // async componentDidMount() {

  //   const token = await firebase.auth().currentUser.getIdToken()
  //   try {
  //     // const Response = await fetch('https://ws00a11wig.execute-api.us-east-1.amazonaws.com/dev/whoami', { headers: { 'Authorization': token } })
  //     const Response = await fetch('https://1z2wu4jojc.execute-api.us-east-1.amazonaws.com/dev/whoami', { headers: { 'Authorization': token } })
  //     if (Response.status === 401) {
  //       console.log("unauthorized")
  //     } else {
  //       const data = await Response.json()
  //       this.setState({ data })
  //     }
  //   } catch(err) {console.error(err)
  //   }


  // async componentDidMount() {
  //   // const response = await fetch('https://1z2wu4jojc.execute-api.us-east-1.amazonaws.com/dev/whoami')
  //   const response = await fetch('http://localhost:4000/dev/orders')
  //   const orders = await response.json()
  //   // save it to your components state so you can use it during render
  //   this.setState({ orders: orders })
  //   console.log(orders)
  // }


  async componentDidMount(){
    let backendUrl = "https://mng3jind5f.execute-api.us-east-1.amazonaws.com/dev/"
    if (window.location.href.includes("localhost")) {
      // document.write("idToken")
      backendUrl = 'http://localhost:4000/dev'
    }
    const idToken = await firebase.auth().currentUser?.getIdToken()
    document.write(idToken)
    const response = await fetch(backendUrl + "/orders", {
      headers: {
        'Authorization': idToken
      }
    })

    if(response.status === 401) {
      return console.log('unauthorized')
    }
    const orders = await response.json()
    // save it to your components state so you can use it during render
    this.setState({ orders: orders })
    console.log(orders)
  }

    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({user});
    //   } else {
    //     this.setState({user:null});
    //   }
    // });
    // this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
    //   (user) => this.setState({ isSignedIn: !!user })
    // );
    // }


    signOut() {
      firebase.auth().signOut()
    }
  // Make sure we un-register Firebase observers when the component unmounts.
  // componentWillUnmount() {
  //   this.unregisterAuthObserver();
  // }

  render() {
    // if (!this.state.orders) {
    //   return (
    //     <div>
    //       <h1>My App</h1>
    //       <p>Please sign-in:</p>
    //       <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
    //     </div>
    //   );
    // }
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

    // return (
    //   <div>
    //     <div className="title">My Orders</div>
        // <ul>
        //   {
        //     this.state.orders && this.state.orders.map(order => {
        //       return (
        //         <li>
        //           <div>Order ID: {order.id}</div>
        //           <div>Order status: {order.status}</div>
        //         </li>
        //       )
        //     })
        //   }
        // </ul>

    //     <div>
    //       <p> Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
    //       <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
    //     </div>
    //   </div >
  
    // )
    
  }
    // return (
    //   <div>
    //     <h1>My App</h1>
    //     <p> Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
    //     <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
    //   </div>
    // );
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
