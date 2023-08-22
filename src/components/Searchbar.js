import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// styles
import './Searchbar.css'

export default function Searchbar() {

  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?q=${term}`)
  };


  return (
    <div className='searchbar'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id='search'
          onChange={(e) => setTerm(e.target.value)}
          required
          placeholder='search' />
      </form>
    </div>
  )
}
