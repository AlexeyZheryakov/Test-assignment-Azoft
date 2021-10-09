import React from 'react';
import './styles.scss';
import { IRepository } from '../../Api/types';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import routes from '../../routes'

interface IRepositoryItem {
    repository: IRepository;
}

const RepositoryItem: React.FC<IRepositoryItem> = ({repository}) => {
  const formatedDate = format(new Date(repository.updated_at), 'dd-MM-yyyy');
  return (
    <Card sx={{ m: 1, p: 1 }}>
      <Link className = 'repo-item-link' to={routes.details(repository.owner.login, repository.name)}>
        <Typography component="div" variant="h6">
          {repository.name}
        </Typography>
      </Link>
      <Typography component = "a" href = { repository.html_url }>
        Repository link: {repository.name}
      </Typography>
      <Typography>
        Stargazers count: {repository.stargazers_count}
      </Typography>
      <Typography>
        Last commit: {formatedDate}
      </Typography>
    </Card>
  );
}

export default RepositoryItem;
