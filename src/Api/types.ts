export interface IData {
    incomplete_results: boolean;
    items: Array<IRepository>;
    total_count: number;
}

export interface IRepository {
    id: number;
    name: string;
    stargazers_count: number;
    html_url: string;
    owner: IOwner;
    description: string | null;
    contributors_url: string;
    updated_at: string;
    languages_url: string;
}

interface IOwner {
    avatar_url: string;
    login: string;
    html_url: string;
}

export interface IContributor {
    login: string;
    id: number;
}

export type Languages = Record<string, string>
