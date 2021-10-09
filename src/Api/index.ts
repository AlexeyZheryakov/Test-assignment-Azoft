import axios from 'axios';
import { IData, Languages, IRepository, IContributor } from "./types";


const Api = {
    getRepositories: (search: string, page: number) => axios.get<IData>(
        `https://api.github.com/search/repositories?per_page=10&page=${page}&sort=stars&q=${search}`
    ),
    getLanguages: (url: string) => axios.get<Languages>(url),
    getContributors: (url: string) => axios.get<Array<IContributor>>(url),
    getRepository: (owner: string, repo: string) => axios.get<IRepository>(`https://api.github.com/repos/${owner}/${repo}`)
};
  
export default Api;
