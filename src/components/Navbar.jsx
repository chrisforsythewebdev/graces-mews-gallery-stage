import { NavLink, useLocation } from 'react-router-dom';

export default function Nav({ color = '#000000' }) {
  const { pathname } = useLocation();
  const activeStyle = 'underline';

  const isHome = pathname === '/';

  const links = [
    {
      to: '/info',
      label: 'INFO',
      external: false,
    },
  ];

  return (
    <nav
      className="space-x-4 md:space-x-8 text-2xl font-bold md:mb-8"
      style={{ color }}
    >
      {links.map(({ to, label, match, hideOnHome, external }) => {
        if (isHome && hideOnHome) return null;

        if (external) {
          return (
            <a
              key={to}
              href={to}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 md:hover:scale-110 inline-block"
            >
              {label}
            </a>
          );
        }

        return (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              (isActive || (match && match(pathname)) ? activeStyle : '') +
              ' transition-transform duration-300 inline-block'
            }
            style={{ color }}
          >
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
}
