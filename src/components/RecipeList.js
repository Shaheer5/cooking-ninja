import React from "react";
import { Link } from "react-router-dom";
import Trashcan from "../assets/trashcan.svg";
import { useHistory } from "react-router-dom";

// styles
import "./RecipeList.css";
import { useTheme } from "../hooks/useTheme";
import { projectFirestore } from "../firebase/config";

const RecipeList = ({ recipes }) => {
  const history = useHistory();
  const handleDelete = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };
  const { color, mode } = useTheme();
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`} style={{ color: color }}>
          <h2>{recipe.title}</h2>
          <p>{recipe.cookingTime}</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img src={Trashcan} alt="delete item" className="delete" onClick={() => handleDelete(recipe.id)} />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
