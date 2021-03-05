import React from "react";
import { Switch, Route } from 'react-router-dom';

import './App.css';

// Pages
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

//Component
import Header from './components/header/header.component';

//Firebase
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();
  
    this.state = {
      currentUser: null
    };
  }

  unsuscribeFromAuth = null;

  //Ciclos de Vida
  //montado
  componentDidMount(){
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth){

        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser : {
              id: snapshot.id,
              ...snapshot.data()
            }
          });

          console.log(this.state);
        });
      }
      
      this.setState({ currentUser : userAuth });
    });
  }

  //Ciclo de vida
  //desmontado
  componentWillUnmount(){
    this.unsuscribeFromAuth();
  }

  //Render de la clase.
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
