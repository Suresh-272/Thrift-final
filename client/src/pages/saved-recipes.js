import { useEffect, useState } from "react";
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserId";


export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();

    useEffect(() => {

        const fetchSavedRecipe = async () => {
            try{
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch(err) {
                console.error(err);
            }
        };

        fetchSavedRecipe();
    }, []);

    return(
        <div>
            <h1 className="home-title"> Cart</h1>
            <div className="home-container">
                <div className="home-box">
                     {savedRecipes.map((recipe) => (
                        <p key={recipe._id}>
                        
                        
                        <div className="boxs">
                            <img  src={recipe.imageUrl}  alt={recipe.name}/>
                            <div className="content-title">
                                <h2>{recipe.name}</h2>
                            </div>
                            <div className="instructions">
                                <p>{recipe.caption}</p>
                            </div>
                            <div className="instructions">
                                <p>{recipe.price}</p>
                            </div>
                            {/* <p className="content-title"> Cooking Time: {recipe.cookingTime} (minutes)</p> */}
                        </div>
                        
                        
                        </p> 
                    ))}

                </div>
            </div>
            
        </div>
    )
    
};