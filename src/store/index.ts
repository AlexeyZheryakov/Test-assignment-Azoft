import { makeAutoObservable } from 'mobx';
import { IRepository } from '../Api/types';

export const initialRepository: IRepository = {
  id: 0,
  name: '',
  stargazers_count: 0,
  html_url: '',
  owner: { avatar_url: '', login: '', html_url: '' },
  description: '',
  contributors_url: '',
  updated_at: '',
  languages_url: '',
};

class Repos {
  repositories: Array<IRepository> = [];

  repository: IRepository = initialRepository;

  totalCount: number = 0;

  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  addRepositories(repos: Array<IRepository>) {
    this.repositories = repos;
    this.error = '';
  }

  addRepository(repos: IRepository) {
    this.repository = repos;
    this.error = '';
  }

  addTotalCount(count: number) {
    this.totalCount = count;
  }

  addError(error: string) {
    this.error = error;
  }
}

export default new Repos();
