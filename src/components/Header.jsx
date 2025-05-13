import { NavLink } from 'react-router-dom';

export default function Header({ color = '#000000' }) {
  return (    
    <NavLink to="/">
      <h1
        className="font-gracesmews text-5xl md:text-7xl tracking-[0.2em] md:tracking-[0.3em] font-bold text-center"
        style={{ color }}
      >
        GRACES MEWS
      </h1>
    </NavLink>
  );
}
