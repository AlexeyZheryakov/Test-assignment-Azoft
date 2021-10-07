import { makeAutoObservable } from "mobx"
import { IRepository } from "../Api/types"

class Repos {
    repositories:Array<IRepository> = []
    totalCount: number = 0
    error: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    addRepositories(repos: Array<IRepository>) {
        this.repositories = repos
    }

    addTotalCount(count: number) {
        this.totalCount = count
    }

    addError(error: string) {
        this.error = error
    }
}

export default new Repos()
