import React from 'react';
import { useParams } from 'react-router';
import Api from '../../Api';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import './styles.scss';
import repos from '../../store';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { initialRepository } from '../../store';

interface IParams {
  owner: string;
  repo: string;
}

const Details: React.FC = observer(() => {
  const [languages, setLanguages] = React.useState<Array<string>>([])
  const { owner, repo } = useParams<IParams>()
  React.useEffect(() => {
    repos.changeIsLoading(true)
    Api.getRepository(owner, repo).then((res) => {repos.addRepository(res.data); repos.changeIsLoading(false); console.log(res)})
    Api.getLanguages('https://api.github.com/repos/fabrice126/BeerMarket/languages').then((res) => setLanguages(Object.keys(res.data)))
    return () => {
      repos.addRepository(initialRepository)
    }
    
  }, [owner, repo])
  
  return (
    <>
      {repos.repository.name && (<div className='container'>
        <Card sx={{ m: 1, p: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1}}>
            <Typography component="div" variant="h5">
              {repos.repository.name}
            </Typography>
            <Typography component="div" variant="h5">
              Stars: {repos.repository.stargazers_count}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', height: '150px' }}>
            <Box sx={{ flex: '0 0 150px', mr: 1}}>
              <CardMedia
                component="img"
                sx={{ width: '100%', height: '100%' }}
                image={repos.repository.owner.avatar_url}
                alt="Live from space album cover"
              />
            </Box>
            <Typography sx={{ width: '100%', overflowY: 'auto', overflowX: 'hidden'  }}  component="div" variant="h6">
              {repos.repository.description ?? 'No description'}
            </Typography>
          </Box>
          <Box>
            {languages.map((language, i) => (
              <div key={repos.repository.id + i}>{language}</div>
            ))}
          </Box>
        </Card>
      </div>)}
    </>
  );
})

export default Details;
