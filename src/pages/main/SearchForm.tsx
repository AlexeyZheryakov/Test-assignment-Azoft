import React from 'react';
import '../styles.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IParams } from '../types';
import routes from '../../routes';
import { useParams } from 'react-router-dom';

const SearchForm: React.FC = () => {
  const { category } = useParams<IParams>();
  const [search, setSearch] = React.useState(category);
  const pageNumber = '1';
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  return (
    <div className="search-form">
      <TextField
        value={search}
        sx={{ width: '50ch', mr: 1 }}
        id="input-search-form"
        variant="outlined"
        label="Enter the name of the repository"
        onChange={handleChange}
      />
      <Button component="a" size="large" variant="text" href={routes.mainWithCategory(search, pageNumber)}>
        search
      </Button>
    </div>
  );
};

export default React.memo(SearchForm);
