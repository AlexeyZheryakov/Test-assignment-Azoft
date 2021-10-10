import React from 'react';
import { useParams } from 'react-router-dom';
import RepositoriesApi from '../../Api/Repositories.';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import './styles.scss';
import repos, { initialRepository } from '../../store';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';
import { IContributor } from '../../Api/types'
import routes from '../../routes'

export interface IParams {
  owner: string;
  repo: string;
  category: string;
  page: string;
}

const Details: React.FC = observer(() => {
  const [languages, setLanguages] = React.useState<Array<string>>([])
  const [contributors, setContributors] = React.useState<Array<IContributor>>([])
  const { owner, repo, category, page } = useParams<IParams>()
  const formatedDate = (date: string) => format(new Date(date), 'dd-MM-yyyy');
  React.useEffect(() => {
      RepositoriesApi.getRepository(owner, repo).then((repositoryResponse) => {
        const { data: repositoryData } = repositoryResponse;
        repos.addRepository(repositoryResponse.data);

        RepositoriesApi.getLanguages(repositoryData.languages_url)
          .then((langResponse) => setLanguages(Object.keys(langResponse.data)))

        RepositoriesApi.getContributors(repositoryData.contributors_url).then((contributorsResponse) => {
          if(contributorsResponse.data) {
            const tenFirstContributors = contributorsResponse.data.splice(0, 10)
          console.log('contrebutors', tenFirstContributors);
          setContributors(tenFirstContributors)
          } else {
            setContributors([])
          }
        })
      })
    
    return () => {
      repos.addRepository(initialRepository)
    }
    
  }, [owner, repo])
  
  return (
    <>
      {repos.repository.name && (<div className='container'>
        <Card sx={{ m: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1}}>
            <Breadcrumbs>
              <Link underline="hover" color="inherit" href={routes.mainWithCategory(category, page)}>
                List of repositories
              </Link>
              <Typography color="text.primary">{repos.repository.name}</Typography>
            </Breadcrumbs>
            <Typography component="div" variant="h5">
              Stars: {repos.repository.stargazers_count}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', height: '150px', pb: 3 }}>
            <Box sx={{ flex: '0 0 150px', mr: 2}}>
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
              {contributors.length ? contributors.map((contributor: IContributor, index: number) => {
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
