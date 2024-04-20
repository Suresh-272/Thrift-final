import { useEffect, useState } from "react";
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserId";
import {useCookies} from "react-cookie";


export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    // const [users, setUsers] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);
    const userID = useGetUserID();
    

    useEffect(() => {
        const fetchRecipe = async () => {
            try{
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
            } catch(err) {
                console.error(err);
            }
        };

        // const fetchUser = async () => {
        //     try{
        //         const response = await axios.get("http://localhost:3001/users");
        //         console.log(response.data);
        //     } catch(err) {
        //         console.error(err);
        //     }
        // };

        const fetchSavedRecipe = async () => {
            try{
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch(err) {
                console.error(err);
            }
        };

        fetchRecipe();
        // fetchUser();
        if(cookies.access_token) fetchSavedRecipe();

    }, []);

    const savedRecipe = async (recipeID) => {
        try{
            const response = await axios.put("http://localhost:3001/recipes", {recipeID, userID}, {headers : {authorization : cookies.access_token}});
            setSavedRecipes(response.data.savedRecipes);
        } catch(err) {
            console.error(err);
        }
    }

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return(
        <div>
            <h1 className="home-title">Thrift Collections</h1>
            <div className="home-container">
                {/* <h2 className="subtitle"> </h2> */}

                <div className="home-box">
                    {recipes.map((recipe) => (
                        <p key={recipe._id}>
                        
                        
                        <div className="boxs">
                            <img src={recipe.imageUrl}  alt={recipe.name}/>
                            <div className="content-title">
                                <h2>{recipe.name}</h2>
                            </div>
                            <div className="instructions">
                                <p>{recipe.caption}</p>
                            </div>
                            <div className="instructions">
                                <p>{recipe.price}</p>
                            </div>
                            {/* <p className="content-title"> Rating: {recipe.Rating}</p> */}
                            <button className="btn" onClick={() => savedRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}> 
                                {isRecipeSaved(recipe._id) ? "Added" : "Add to cart"} 
                            </button>
                        </div>

                    </p> 
                  
                    ))}
                    
                </div>
                
            
            </div>
            
        </div>
    )
    
};