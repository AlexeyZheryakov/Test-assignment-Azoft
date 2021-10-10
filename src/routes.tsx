const routes = {
  main: () => `/`,
  mainWithCategory: (category = ':category', page = ':page') => 
    `/${category}/page/${page}`,
  details: (owner = ':owner', repo = ':repo', category = ':category', page = ':page') => 
    `/${category}/page/${page}/details/${owner}/${repo}`,
};

export default routes;
