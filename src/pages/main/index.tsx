import React from 'react';
import Api from '../../Api';
import { observer } from 'mobx-react-lite';
import repos from '../../store';
import './styles.scss';
import RepositoryItem from './RepositoryItem';
import SearchForm from './SearchForm';
import Pagination from '@mui/material/Pagination';
import { Redirect, useParams } from 'react-router-dom';
import routes from '../../routes';


const Main: React.FC = observer(() => {
  const pageLimit = 10
  const paginationCount = Math.ceil(repos.totalCount / pageLimit)
  const { category, page } = useParams<{ category: string, page: string }>();
  const lang = Api.getLanguages('https://api.github.com/repos/fabrice126/BeerMarket/languages').then((res) => res)
  React.useEffect(() => {
    if(category) {
      Api.getRepositories(category, +page)
        .then((res) => {
          repos.addRepositories(res.data.items)
          repos.addTotalCount(res.data.total_count)
          console.log(res);
          
        }).catch((e) => console.log(e));
      repos.changePageNumber(+page)
    }
  }, [category, page]);
  return (
    <>
      <div className = 'container'>
          <SearchForm/>
          {repos.repositories.map((item) => (
            <RepositoryItem key = {item.id} repository = {item}/>
          ))}
          {repos.totalCount > pageLimit && <Pagination
            onChange = {(e, page) => repos.changePageNumber(page)}
            page = {repos.pageNumber}
            count = {paginationCount}
            shape="rounded"
          />}
      </div>
    </>
  );
})

export default Main;
