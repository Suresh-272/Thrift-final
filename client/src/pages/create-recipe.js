import {useState} from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserId";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";


export const CreateRecipe = () => {
    const userID = useGetUserID();
    const navigate = useNavigate();
    const [cookies, _] = useCookies(["access_token"]);

    const [recipe, setRecipe] = useState({
        name: "",
        Director:"",
        Genre: "",
        imageUrl: "",
        Rating: "",
        userOwner: userID,

    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value});
    }

    // const handleIngredientChange = (event, idx) => {
    //     const {value} = event.target;
    //     const ingredients = recipe.ingredients;
    //     ingredients[idx] = value;
    //     setRecipe({...recipe, ingredients});
    // }

    // const addIngredient = () => {
    //     setRecipe({...recipe, ingredients: [...recipe.ingredients, ""] });
    // }

    const onSubmit = async (event) => {
        event.preventDefault();

        try{
            await axios.post("http://localhost:3001/recipes", recipe, {headers : {authorization : cookies.access_token}});
            alert("Recipe Created");
            navigate("/");
            console.log(recipe);
        } catch(err) {
            console.error(err);
        }
    }
    return(
        <div className="container">
         <div className="create-recipe">
            <h2> Add Movie</h2>
            <form onSubmit={onSubmit}>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type = "text" name="name" id="name" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="director">Director</label>
                <input type = "text" name="director" id="director" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input type = "text" name="genre" id="genre" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <input type = "text" name="rating" id="rating" onChange={handleChange}/>
            </div>

            {/* <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredient, idx) => (
                    <input 
                        key={idx}
                        type="text"
                        name="ingredients"
                        value={ingredient}
                        onChange={(event) => handleIngredientChange(event, idx) }
                    />
                ))}
            </div>

                <button onClick={addIngredient} className="btn-ingr" type="button">Add Ingredients</button>

            <div className="form-group">
                <label htmlFor="instructions">Instructions</label>
                <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>  
            </div> */}

            <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input type = "text" id="imageUrl" name="imageUrl" onChange={handleChange}/>
            </div>    
                
            
                {/* <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                <input type = "number" id="cookingTime" name="cookingTime" onChange={handleChange}/> */}
                <button className="btn-create-recipe" type="submit">Create Movie</button>
                
            </form>
        </div>   
        </div>

    )
};