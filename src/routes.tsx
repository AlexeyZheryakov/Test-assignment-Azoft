const routes = {
  main: () => `/`,
  mainWithCategory: (category = ':category', page = ':page') => 
    `/${category}/page/${page}`,
  details: (id = ':id') => `/details/${id}`,
};

export default routes;
