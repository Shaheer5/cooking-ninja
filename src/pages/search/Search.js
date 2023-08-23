import { useLocation } from 'react-router-dom';

// import { useFetch } from '../../hooks/useFetch';

import RecipeList from '../../components/RecipeList';
import { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';

// styles
import './Search.css';

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q')
  
  // const url = 'http://localhost:3000/recipes?q=' + query;
  // const { error, isPending, data } = useFetch(url);
  
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore.collection("recipes").onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setError("There are no such recipes");
          setIsPending(false);
        } else {
          let searchResults = [];
          snapshot.docs.forEach((doc) => {
            if (doc.data().title.toLowerCase().includes(query.toLowerCase())) {
              searchResults.push({ id: doc.id, ...doc.data() });
            }
          });
          setRecipes(searchResults);
          setIsPending(false);
        }
      });
    return () => unsub();
  }, [query]);

  return (
    <div>
      <h2 className='page-title'>Recipe including "{query}"</h2>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipes && <RecipeList recipes={recipes}/>}
    </div>
  )
}
