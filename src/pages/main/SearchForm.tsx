import React from 'react';
import './styles.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Api from '../../Api';
import repos from '../../store';
import { Link, useParams } from 'react-router-dom';
import routes from '../../routes'


const SearchForm: React.FC = () => {
    const [search, setSearch] = React.useState('');
    const { category } = useParams<{ category: string }>();
    React.useEffect(() => {
      if(category) {
        Api.getRepositories(category, repos.pageNumber)
          .then((res) => {
            repos.addRepositories(res.data.items)
            repos.addTotalCount(res.data.total_count)
          }).catch((e) => console.log(e));
      }
    }, [category, repos.pageNumber]);
  return (
    <div className = 'search-form'>
        <TextField
            sx = {{ width: '50ch', mr: 1 }}
            id = "input-search-form"
            variant = "outlined"
            label = "Enter the name of the repository"
            onChange = {((e) => setSearch(e.target.value))}
        />
        <Link className = 'repo-item-link' to={routes.mainWithCategory(search)}>
          <Button size="large" variant="text">search</Button>
        </Link>
    </div>
  );
}

export default SearchForm;
