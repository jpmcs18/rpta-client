import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { ICON } from '../constant';
import { Routes } from '../routes';
import Dashboard from './dashboard';
import PrintCancellationPage from './print-cancellation-page';

export default function HomePage() {
  const menus: {
    head: string;
    navs: { route: string | undefined; name: string | undefined }[];
  }[] = [
    {
      head: 'Reports',
      navs: [
        {
          route: Routes.PrintCancellation,
          name: 'Print Cancellation',
        },
      ],
    },
  ];

  return (
    <BrowserRouter>
      <header>
        <nav>
          <div className='menu-container'>
            {!!menus?.length && (
              <div className='nav-menu-container'>
                <button className='nav-menu'>
                  <FontAwesomeIcon icon={faBars as IconProp} />
                </button>
                <div className='menus'>
                  {menus
                    .filter((x) => x.navs.length > 0)
                    .map((menu) => (
                      <div className='menu-items' key={menu.head}>
                        <div className='head'>{menu.head}</div>
                        <div className='navs'>
                          {menu.navs.map((nav) => (
                            <div key={nav.route}>
                              <NavLink
                                to={nav.route ?? ''}
                                exact
                                className='nav-menu'>
                                {nav.name}
                              </NavLink>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            <NavLink to={Routes.Home} exact className='nav-icon'>
              {ICON}
            </NavLink>
          </div>
        </nav>
      </header>
      <Switch>
        <Route path={Routes.Home} exact component={Dashboard} />
        <Route
          path={Routes.PrintCancellation}
          exact
          component={PrintCancellationPage}
        />
      </Switch>
    </BrowserRouter>
  );
}
