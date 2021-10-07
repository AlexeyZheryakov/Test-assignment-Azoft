import { makeAutoObservable } from "mobx"
import { IRepository } from "../Api/types"

class Repos {
    repositories:Array<IRepository> = []
    totalCount: number = 0
    pageNumber: number = 1

    constructor() {
        makeAutoObservable(this)
    }

    addRepositories(repos: Array<IRepository>) {
        this.repositories = repos
    }

    addTotalCount(count: number) {
        this.totalCount = count
    }

    changePageNumber(pageNumber: number) {
        this.pageNumber = pageNumber
    }
}

export default new Repos()
