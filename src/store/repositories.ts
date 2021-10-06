import { makeAutoObservable } from "mobx"
import { IRepository } from "../Api/types"

class Repositories {
    repositories:Array<IRepository> = []

    constructor() {
        makeAutoObservable(this)
    }

    addRepositories(repos:Array<IRepository>) {
        this.repositories = repos
    }
}

export default new Repositories()
