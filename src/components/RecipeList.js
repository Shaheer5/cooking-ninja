import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import trashcan from '../assets/trashcan.svg';
import { projectFirestore } from '../firebase/config';


// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {

  const { mode } = useTheme();

  const handleDelete = (id) => {
   projectFirestore.collection('recipes').doc(id).delete();

    // way to refresh page if not using real-time db with async-ing the parent funtion
    // window.location.reload();
  };

  if (recipes.length === 0) {
    return <div className='error'>No Recipes to load</div>
  }
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <p>{recipe.method.substring(0, 100)}...</p>
          <Link className='cook-this' to={`./recipes/${recipe.id}`}>Cook This</Link>
          <img
            className='deleteIcon'
            src={trashcan}
            onClick={() => handleDelete(recipe.id)}
            alt="delete button"
          />
        </div>
      ))}
    </div>
  )
}
