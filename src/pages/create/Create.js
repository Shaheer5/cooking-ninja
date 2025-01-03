import React, { useRef, useState } from "react";
// styles
import "./Create.css";
// import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";
import { toast } from "react-toastify";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState([]);
  const ingredientInput = useRef(null);
  const { color } = useTheme();

  // const { postData } = useFetch("http://localhost:3000/recipes", "POST");

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    };

    try {
      await projectFirestore.collection("recipes").add(doc);
      history.push("/");
      toast.success("Added new recipe", { autoClose: 2000 });
    } catch (err) {
      toast.error("Couldn't add new recipe", { autoClose: 2000 });
      console.log(err);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prev) => [...prev, ing]);
    }

    setNewIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <div className="create">
      <h1 className="page-title">Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title</span>
          <input type="text" required onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn" style={{ background: color }}>
              add
            </button>
          </div>
        </label>
        <p>
          Current Ingredients:
          {ingredients.map((ing) => (
            <em key={ing}>{ing}, </em>
          ))}
        </p>

        <label>
          <span>Recipe Method</span>
          <textarea required onChange={(e) => setMethod(e.target.value)} value={method} />
        </label>
        <label>
          <span>Cooking Time (minutes):</span>
          <input type="number" required onChange={(e) => setCookingTime(e.target.value)} value={cookingTime} />
        </label>
        <button className="btn" style={{ background: color }}>
          submit
        </button>
      </form>
    </div>
  );
};

export default Create;
