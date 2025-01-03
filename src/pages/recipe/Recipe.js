import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useFetch } from "../../hooks/useFetch";
import { projectFirestore } from "../../firebase/config";

// styles
import "./Recipe.css";
import { useTheme } from "../../hooks/useTheme";

const Recipe = () => {
  const { id } = useParams();
  // const url = `http://localhost:3000/recipes/${id}`;
  // const { data: recipe, isPending, error } = useFetch(url);
  const { color, mode } = useTheme();

  // database
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        }
      })
      .catch((err) => {
        console.log();
        setIsPending(false);
        setError(err.message);
      });
  }, [id]);

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h1 className="page-title" style={{ color: color }}>
            {recipe.title}
          </h1>
          <p>Takes {recipe.cookingTime} to cook</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
};

export default Recipe;
