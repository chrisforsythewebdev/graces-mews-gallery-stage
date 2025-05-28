import { NavLink, useLocation } from 'react-router-dom';

export default function Nav({ color = '#000000' }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isAbout = pathname === '/about';

  const links = isAbout
    ? [
    ]
    : [
        {
          to: '/about',
          label: 'ABOUT',
          external: false,
          hideOnHome: false, // adjust if needed
        },
        // You can add more links here with similar structure
      ];

  return (
    <nav
      className="space-x-4 md:space-x-8 text-2xl font-bold md:mb-8 font-gracesmews"
      style={{ color }}
    >
      {links.map(({ to, label, external, hideOnHome }) => {
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
              `transition-transform duration-300 md:hover:scale-110 inline-block ${
                isActive ? 'underline' : ''
              }`
            }
          >
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
}
