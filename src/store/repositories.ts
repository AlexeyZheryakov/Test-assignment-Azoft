import { makeAutoObservable } from "mobx"

interface Repositories {
    
}

class Repositories {
    repositories = []

    constructor() {
        makeAutoObservable(this)
    }

    addRepositories(repos:any) {
        this.repositories.push()
    }
}

export default new Repositories()
