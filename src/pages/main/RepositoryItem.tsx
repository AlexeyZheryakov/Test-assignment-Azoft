import React from 'react';
import './styles.scss';
import { useParams } from 'react-router-dom';
import { IRepository } from '../../Api/types';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import { IParams } from '../details';

interface IRepositoryItem {
  repository: IRepository;
}

const RepositoryItem: React.FC<IRepositoryItem> = ({ repository }) => {
  const { category, page } = useParams<IParams>();
  const formatedDate = format(new Date(repository.updated_at), 'dd-MM-yyyy');
  return (
    <Card sx={{ m: 1, p: 1 }}>
      <Link className="repo-item-link" to={routes.details(repository.owner.login, repository.name, category, page)}>
        <Typography component="div" variant="h6">
          {repository.name}
        </Typography>
        <Typography>Stargazers count: {repository.stargazers_count}</Typography>
        <Typography>Last commit: {formatedDate}</Typography>
      </Link>
      <Typography component="a" href={repository.html_url}>
        Repository link: {repository.name}
      </Typography>
    </Card>
  );
};

export default RepositoryItem;
