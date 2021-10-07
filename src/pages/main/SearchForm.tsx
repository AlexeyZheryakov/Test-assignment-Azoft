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
  return (
    <div className = 'search-form'>
        <TextField
            sx = {{ width: '50ch', mr: 1 }}
            id = "input-search-form"
            variant = "outlined"
            label = "Enter the name of the repository"
            onChange = {((e) => setSearch(e.target.value))}
        />
        <Link className = 'repo-item-link' to={routes.mainWithCategory(search, String(repos.pageNumber))}>
          <Button size="large" variant="text">search</Button>
        </Link>
    </div>
  );
}

export default SearchForm;
