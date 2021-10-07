import axios from 'axios';
import { IData, Languages } from "./types";


const Api = {
    getRepositories: (search: string, page: number) => axios.get<IData>(
        `https://api.github.com/search/repositories?per_page=10&page=${page}&sort=stars&q=${search}`
    ),
    getLanguages: (url: string) => axios.get<Languages>(url),
};
  
export default Api;
