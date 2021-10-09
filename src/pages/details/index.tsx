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
import { format } from 'date-fns';

interface IParams {
  owner: string;
  repo: string;
}

const Details: React.FC = observer(() => {
  const [languages, setLanguages] = React.useState<Array<string>>([])
  const [contributors, setContributors] = React.useState<any>([])
  const { owner, repo } = useParams<IParams>()
  const formatedDate = (date: string) => format(new Date(date), 'dd-MM-yyyy');
  React.useEffect(() => {
    ( async () => {
      await Api.getRepository(owner, repo).then((res) => {repos.addRepository(res.data); console.log("Response:", res)})
      Api.getLanguages(repos.repository.languages_url).then((res) => setLanguages(Object.keys(res.data)))
      Api.getContributors(repos.repository.contributors_url).then((res) => {
        if(res.data) {
          const tenFirstContributors = res.data.splice(0, 10)
        console.log('contrebutors', tenFirstContributors);
        setContributors(tenFirstContributors)
        } else {
          setContributors([])
        }
      })
    })()
    
    return () => {
      repos.addRepository(initialRepository)
    }
    
  }, [owner, repo])
  
  return (
    <>
      {repos.repository.name && (<div className='container'>
        <Card sx={{ m: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1}}>
            <Typography component="div" variant="h5">
              {repos.repository.name}
            </Typography>
            <Typography component="div" variant="h5">
              Stars: {repos.repository.stargazers_count}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', height: '150px', pb: 3 }}>
            <Box sx={{ flex: '0 0 150px', mr: 1}}>
              <CardMedia
                component="img"
                sx={{ width: '100%', height: '100%' }}
                image={repos.repository.owner.avatar_url}
                alt="Live from space album cover"
              />
            </Box>
            <Typography sx={{ width: '100%', overflowY: 'auto', overflowX: 'hidden'  }}  component="div" variant="h6">
              Description:
              <br/>
              {repos.repository.description ?? 'No description'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <Typography component="div" variant="h6">
              Languages: {languages.join(', ') || 'Information is absent'}
            </Typography>
            <Typography component="div" variant="h6">
              Last commit : {formatedDate(repos.repository.updated_at)}
            </Typography>
          </Box>
          <Box>
            <Typography component="div" variant="h6">
              <span>Contributors: </span>
              {contributors.length ? contributors.map((contributor: any, index: number) => {
                if(index < contributors.length - 1) {
                  return (<span key={contributor.id}>{contributor.login}, </span>)
                } else {
                  return (<span key={contributor.id}>{contributor.login} </span>)
                }
              }) : <span>Information is absent</span>}
            </Typography>
          </Box>
        </Card>
      </div>)}
    </>
  );
})

export default Details;
