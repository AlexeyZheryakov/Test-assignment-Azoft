import React from 'react';
import { useParams } from 'react-router';
import Api from '../../Api';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import './styles.scss';
import repos from '../../store';
import CardMedia from '@mui/material/CardMedia';
import { observer } from 'mobx-react-lite';
import { initialRepository } from '../../store';

interface IParams {
  owner: string;
  repo: string;
}

const Details: React.FC = observer(() => {
  const { owner, repo } = useParams<IParams>()
  React.useEffect(() => {
    repos.changeIsLoading(true)
    Api.getRepository(owner, repo).then((res) => {repos.addRepository(res.data); repos.changeIsLoading(false)})
    console.log(owner, repo);
    return () => {
      repos.addRepository(initialRepository)
    }
    
  }, [owner, repo])
  
  return (
    <>
      {!repos.isLoading && repos.repository.name && (<div className='container'>
        <Card sx={{ m: 1, p: 1 }}>
          <Typography component="div" variant="h6">
            {repos.repository.name}
          </Typography>
          <Typography>
            Repository link: {repos.repository.description} 
          </Typography>
          <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={repos.repository.owner.avatar_url}
          alt="Live from space album cover"
        />
        </Card>
      </div>)}
    </>
  );
})

export default Details;
