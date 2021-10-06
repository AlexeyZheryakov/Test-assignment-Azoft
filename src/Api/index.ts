import React from "react";
import axios from 'axios';
import { IResponse, Languages } from "./types";


const Api = {
    getRepositories: () => axios.get<IResponse>('https://api.github.com/search/repositories?per_page=10&page=1&q=Beer-market'),
    getLanguages: (url: string) => axios.get<Languages>(url),
};
  
export default Api;
