import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: "AIzaSyBK7znj9GS61MAvsL36qvRT9axvlMdOi4Y",
  authDomain: "redsocialfirebase-88194.firebaseapp.com"
});
class App extends Component {
  state = { sesion: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(usuario => {
      this.setState({ sesion: !!usuario });
      console.log("usuario", usuario);
    });
  };
  render() {
    return (
      <div className="App">
        {this.state.sesion ? (
          <span>
            <div className="card">
              <h1>
                Bienvenido usuario {firebase.auth().currentUser.displayName}
              </h1>
              <img src={firebase.auth().currentUser.photoURL} />
              <button onClick={() => firebase.auth().signOut()}>
                Cerrar Sesión
              </button>
            </div>
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

export default App;
