import React from "react";
import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";
import { useTheme } from "../../hooks/useTheme";

const Search = () => {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");
  const { color } = useTheme();

  const url = "http://localhost:3000/recipes?q=" + query;
  console.log(url);

  const { error, isPending, data } = useFetch(url);

  return (
    <div className="page-title">
      <h1 style={{ color: color }}>Recipes including "{query}"</h1>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Search;
