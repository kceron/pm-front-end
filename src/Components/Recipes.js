import React from 'react'
import RecipeCard from './RecipeCard'

class Recipes extends React.Component {
    state = {
        currentIndex: 0
    }


    // renderRecipes() {
    //     return this.props.recipes
    //     // .slice(this.state.currentIndex, this.state.currentIndex + 8 )//slice to get paginated results
    //     .map(recipe => 
    //         <RecipeCard 
    //             key={recipe.title}
    //             recipe={recipe}
    //         />
    //         )
    //     }

    render() {
        console.log(this.props.recipes)
        // const recipesArray = this.renderRecipes()

        return (
            <div>
                {/* <RecipeCard events={this.props}/> */}
            </div>
        )
    }

    }

export default Recipes