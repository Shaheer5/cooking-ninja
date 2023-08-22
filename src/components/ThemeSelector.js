import { useState } from 'react';
import useTheme from '../hooks/useTheme';
import toggleImage from '../assets/mode-icon.svg'

import './ThemeSelector.css';


export default function ThemeSelector() {
  

  // changing color

  const { changeColor, changeMode, mode } = useTheme();

  const themeColors = ['#58249c', '#249c6b', '#b70233'];

  
  
  // rotating the image
  
  const toggleMode = () => {
    changeMode(mode === 'light' ? 'dark' : 'light' )
  }

  const [isRotated, setIsRotated] = useState(false);

  const rotate = () => {
    setIsRotated(!isRotated)
  }

  const handleClick = () => {
    toggleMode();
    rotate();
  }

  console.log(mode);


  return (
    <div className="theme-selector">

      <div className='toggle-mode'>
        <img
        src={toggleImage}
        onClick={handleClick}
        className={`rotatable-image ${isRotated ? 'rotated' : ''}`}
        id='rotate-image'
        alt="dark/light mode changer" />
      </div>

      <div className="theme-buttons">
        {themeColors.map((color, index) => (
          <div
            key={index}
            onClick={() => changeColor(color)}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

    </div>
  )
}
