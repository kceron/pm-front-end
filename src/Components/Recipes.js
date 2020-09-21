import React from 'react'
import RecipeCard from './RecipeCard'

class Recipes extends React.Component {
    state = {
        selectedVegetarian: "",
        favorite: false
    }

    // RENDER INDIVIDUAL RECIPES 
    recipeItems() {
        return this.props.recipes.map(recipe =>
            <RecipeCard 
            key={recipe.id} 
            title={recipe.title}
            cooktime={recipe.cooktime}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            picture={recipe.picture}
            vegetarian={recipe.vegetarian}
            favorite={recipe.favorite}
            />
            )
    }

    render() {
        // console.log("FROM RECIPES", this.props.recipes)

        return (
            <div>
                <ul>
                    {this.recipeItems()}
                </ul>
            </div>
        )
    }
    }

export default Recipes