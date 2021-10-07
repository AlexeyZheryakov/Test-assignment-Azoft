import React from 'react';
import Api from '../../Api';
import { observer } from 'mobx-react-lite';
import repos from '../../store';
import './styles.scss';
import RepositoryItem from './RepositoryItem';
import SearchForm from './SearchForm';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useParams, Link } from 'react-router-dom';
import routes from '../../routes';
import Typography from '@mui/material/Typography';

export interface IParams {
  category?: string,
  page?: string
}

const Main: React.FC = observer(() => {
  const pageLimit = 10
  const paginationCount = Math.ceil(repos.totalCount / pageLimit)
  const { category, page = 1 } = useParams<IParams>();
  // const lang = Api.getLanguages('https://api.github.com/repos/fabrice126/BeerMarket/languages').then((res) => res)
  React.useEffect(() => {
    if(category) {
      Api.getRepositories(category, +page)
        .then((res) => {
          repos.addRepositories(res.data.items)
          repos.addTotalCount(res.data.total_count)
        }).catch((e) => repos.addError(e.response.data.message) );
    }
  }, [category, page]);
  return (
    <>
      <div className = 'container'>
          <SearchForm/>
          {repos.error && (
            <Typography className = 'error' component="div" variant="h5">
              Error: {repos.error}
            </Typography>
          )}
          {repos.repositories.map((item) => (
            <RepositoryItem key = {item.id} repository = {item}/>
          ))}
          {repos.totalCount > pageLimit && (
            <Pagination
              renderItem={(item) => (
                <Link className = 'repo-item-link' to={routes.mainWithCategory(category, String(item.page))}>
                  <PaginationItem{...item}/>
                </Link>
              )}
              page = {+page}
              count = {paginationCount}
              shape="rounded"
            />
          )}
      </div>
    </>
  );
})

export default Main;
