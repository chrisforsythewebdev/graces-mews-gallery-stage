import { NavLink, useLocation } from 'react-router-dom';

const LINKS = [
  { to: '/exhibitions', label: 'EXHIBITIONS', external: false, hideOnHome: false },
  // { to: '/news',        label: 'NEWS',        external: false, hideOnHome: false },
  { to: '/about',       label: 'ABOUT',       external: false, hideOnHome: false },
];

export default function Nav({ color = '#000000' }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <nav
      className="space-x-4 md:space-x-8 text-2xl font-bold md:mb-2 font-gracesmews"
      style={{ color }}
    >
      {LINKS.map(({ to, label, external, hideOnHome }) => {
        if (isHome && hideOnHome) return null;

        return external ? (
          <a
            key={to}
            href={to}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 md:hover:scale-110 inline-block"
          >
            {label}
          </a>
        ) : (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `transition-transform duration-300 md:hover:scale-110 inline-block ${isActive ? 'underline' : ''}`
            }
            end={to === '/'}
          >
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
}
