import React from 'react';
import './styles.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import routes from '../../routes';

const SearchForm: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const pageNumber = '1';
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  return (
    <div className="search-form">
      <TextField
        sx={{ width: '50ch', mr: 1 }}
        id="input-search-form"
        variant="outlined"
        label="Enter the name of the repository"
        onChange={handleChange}
      />
      <Link className="repo-item-link" to={routes.mainWithCategory(search, pageNumber)}>
        <Button size="large" variant="text">
          search
        </Button>
      </Link>
    </div>
  );
};

export default SearchForm;
