import React, { useEffect, useState } from 'react';

import { LoadingIndicatorPage } from '@strapi/helper-plugin';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const LazyCompo = ({ loadComponent }) => {
  const [Compo, setCompo] = useState(null);

  useEffect(() => {
    const loadCompo = async () => {
      try {
        const loadedCompo = await loadComponent();

        setCompo(() => loadedCompo.default);
      } catch (err) {
        // TODO return the error component
        console.log(err);
      }
    };

    loadCompo();
  }, [loadComponent]);

  if (Compo) {
    return <Compo />;
  }

  return <LoadingIndicatorPage />;
};

LazyCompo.propTypes = {
  loadComponent: PropTypes.func.isRequired,
};

export const createRoute = (Component, to, exact) => {
  return (
    <Route
      render={() => <LazyCompo loadComponent={Component} />}
      key={to}
      path={to}
      exact={exact || false}
    />
  );
};
