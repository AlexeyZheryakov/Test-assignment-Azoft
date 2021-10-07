import React from 'react';
import Api from '../../Api';
import { observer } from 'mobx-react-lite';
import repos from '../../store';
import './styles.scss';
import RepositoryItem from './RepositoryItem';
import SearchForm from './SearchForm';
import Pagination from '@mui/material/Pagination';


const Main: React.FC = observer(() => {
  const pageLimit = 10
  const paginationCount = Math.ceil(repos.totalCount / pageLimit)
  const lang = Api.getLanguages('https://api.github.com/repos/fabrice126/BeerMarket/languages').then((res) => res)
  React.useEffect(() => {
    console.log(repos.pageNumber)
  }, [repos.pageNumber])
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
