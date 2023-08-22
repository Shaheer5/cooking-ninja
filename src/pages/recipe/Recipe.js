import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useTheme from '../../hooks/useTheme';
import { projectFirestore } from '../../firebase/config';

import edit from '../../assets/edit.svg'

// styles
import './Recipe.css'

export default function Recipe() {

  const { id } = useParams()
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
      if (doc.exists) {
        setIsPending(false)
        setRecipe(doc.data());
      } else {
        setError("Couldn't find the recipe");
        setIsPending(false)
      }
    })

    return () => unsub();
  }, [id]);

  const { mode } = useTheme();

  const handleEdit = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Something completely different'
    })
  }

  return (
    <div className={`recipe ${mode}`}>
      {error && <h2>{error}</h2>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Take {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className='method'>{recipe.method}</p>
          <img
            className="edit"
            onClick={() => handleEdit(id)}
            src={edit}
            alt="edit button"
          />
          <p><i>full edit functionality is not implemented yet</i></p>
        </>
      )}
    </div>
  )
}