import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/CorrectLogo_GM.svg';

export default function Header({ color = '#000000' }) {
  return (
    <NavLink to="/" className="inline-flex items-center justify-center">
      <Logo
        className="h-10 md:h-16 w-auto logo-dynamic"
        style={{ color }}               
        aria-label="Graces Mews logo"
      />
      <span className="sr-only">GRACES MEWS</span>
    </NavLink>
  );
}
