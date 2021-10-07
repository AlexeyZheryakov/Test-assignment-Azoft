const routes = {
  main: () => `/`,
  mainWithCategory: (category = ':category', page = '1') => `/${category}/page=${page}`,
  details: (id = ':id') => `/details/${id}`,
};

export default routes;
