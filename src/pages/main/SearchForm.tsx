import React from 'react';
import './styles.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import routes from '../../routes';
import { IParams } from '.';


const SearchForm: React.FC = () => {
    const apiPageLimit = 100;
    const [search, setSearch] = React.useState('');
    const { page = '1' } = useParams<IParams>();
  return (
    <div className = 'search-form'>
        <TextField
            sx = {{ width: '50ch', mr: 1 }}
            id = "input-search-form"
            variant = "outlined"
            label = "Enter the name of the repository"
            onChange = {((e) => setSearch(e.target.value))}
        />
        <Link
          className = 'repo-item-link'
          to={+page > apiPageLimit ? routes.mainWithCategory(search, '1') : routes.mainWithCategory(search, page)}
        >
          <Button size="large" variant="text">search</Button>
        </Link>
    </div>
  );
}

export default SearchForm;
