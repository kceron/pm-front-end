import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './Components/Header'
import Recipes from './Components/Recipes'
import FavRecipesList from './Components/FavRecipesList'
import Home from './Home'

class App extends React.Component {
  // state = {

  // }

  //  FETCH TO API: dont need birthdate, we arent passing specifics
  fetchContents = () => {
    let allEvents = [];
    fetch("edamame/com")
      .then(r => r.json())
      // .then(recipeArr => {
      //   recipeArr.map(recipe => {
      //     const allRecipes = []
      //     if (parseInt(evt.conceptionDate) === parseInt(birthdate)) {
      //       allRecipes.push(recipe)
        //   }
        // })
        // this.setState({   we dont have to setstate but we can 
        //   eventsfromBACKEND: allEvents
        // }, () => console.log(this.state.eventsfromBACKEND))
      // })
  }
// END OF FETCH

  render() {
    return (
      <div className="App">
        <Header />
        <h1> This is APP </h1>
        <Home />
        <Recipes />
        <FavRecipesList />


      </div>
    );
  }
  }


export default App;
