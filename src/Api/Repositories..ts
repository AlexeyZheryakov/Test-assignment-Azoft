import axios from 'axios';
import { IData, Languages, IRepository, IContributor } from "./types";

const RepositoriesApi = {
    getRepositories: (search: string, page: number) => axios.get<IData>(
        `${process.env.REACT_APP_GITHUB_API_URL}/search/repositories?per_page=10&page=${page}&sort=stars&q=${search}`
    ),
    getLanguages: (url: string) => axios.get<Languages>(url),
    getContributors: (url: string) => axios.get<Array<IContributor>>(url),
    getRepository: (owner: string, repo: string) => axios.get<IRepository>(
        `${process.env.REACT_APP_GITHUB_API_URL}/repos/${owner}/${repo}`
    )
};
  
export default RepositoriesApi;
