export interface IResponse {
    data: IData;
}
  
interface IData {
incomplete_results: boolean;
items: Array<IRepository>;
total_count: number;
}

export interface IRepository {
id: number;
name: string;
stargazers_count: number;
url: string;
owner: IOwner;
description: string | null;
contributors_url: string;
}

interface IOwner {
avatar_url: string;
login: string;
html_url: string;
}

export type Languages = Record<string, string>
