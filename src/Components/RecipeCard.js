import React from 'react'

class RecipeCard extends React.Component {

    renderRecipes = () => {
        return this.props.events.recipes.map((recipe) => {
            return (<li key={recipe.title}>{recipe.title}</li>)
        })
    }
    
    render() {
        console.log("FROM R CARD", this.props)
        return (
            <div>
                {/* <ul>{this.renderRecipes()}</ul> */}
            </div>
        )
    }
}

export default RecipeCard
