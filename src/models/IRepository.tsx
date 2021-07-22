import _ from "lodash"
import { IData } from "./common";
import { IRepositoryTableData, IRepositoryTableDataProps, IRepositoryTableHeaderData } from "src/models/IRepositoryTable";

export interface ILicense {
    key: string
    name: string
    spdx_id: string
    url: string
    node_id: string
}

export interface IOwner {
    avatar_url: string
    events_url: string
    followers_url: string
    following_url: string
    gists_url: string
    gravatar_id: string
    html_url: string
    id: number
    login: string
    node_id: string
    organizations_url: string
    received_events_url: string
    repos_url: string
    site_admin: false
    starred_url: string
    subscriptions_url: string
    type: string
    url: string
}

export interface IRepository {
    archive_url: string
    archived: boolean
    assignees_url: string
    blobs_url: string
    branches_url: string
    clone_url: string
    collaborators_url: string
    comments_url: string
    commits_url: string
    compare_url: string
    contents_url: string
    contributors_url: string
    created_at: string
    default_branch: string
    deployments_url: string
    description: string
    disabled: boolean
    downloads_url: string
    events_url: string
    fork: boolean
    forks: number
    forks_count: number
    forks_url: string
    full_name: string
    git_commits_url: string
    git_refs_url: string
    git_tags_url: string
    git_url: string
    has_downloads: boolean
    has_issues: boolean
    has_pages: boolean
    has_projects: boolean
    has_wiki: boolean
    homepage: string
    hooks_url: string
    html_url: string
    id: number
    issue_comment_url: string
    issue_events_url: string
    issues_url: string
    keys_url: string
    labels_url: string
    language: string | null
    languages_url: string
    license: ILicense
    merges_url: string
    milestones_url: string
    mirror_url: string | null
    name: string
    node_id: string
    notifications_url: string
    open_issues: number
    open_issues_count: number
    owner: IOwner
    private: boolean
    pulls_url: string
    pushed_at: string
    releases_url: string
    size: number
    ssh_url: string
    stargazers_count: number
    stargazers_url: string
    statuses_url: string
    subscribers_url: string
    subscription_url: string
    svn_url: string
    tags_url: string
    teams_url: string
    trees_url: string
    updated_at: string
    url: string
    watchers: number
    watchers_count: number
}

export interface IMostStarred{
    incomplete_results: boolean
    items: IRepository[]
    total_count: number
}




export class IRepositoryData {
    private _items: IRepository[] = [];

    constructor(data: IRepository[]) {
        if(data) {
            this._items = data;
        }
    }

    private get _tableHeader(): IRepositoryTableHeaderData[] {
        return [
            {id: "name", label: "Name"}, 
            {id: "language", label: "Language", hideSort: true},
            {id: "created_at", label: "Created"},
            {id: "updated_at", label: "Updated", hideSort: true},
        ]
    }

    private _tableData(): IRepositoryTableData[] {
        return this.items.map(item => {
            const picked = _.pick(item, _.map(this._tableHeader, "id"))
            const dateCreated = new Date(item.created_at).toLocaleDateString();
            const dateUpdated = new Date(item.updated_at).toLocaleDateString();
            const language = (picked.language !== null) ? picked.language : this.languageDefaultValue
            return { name: picked.name, language, created_at: dateCreated, updated_at: dateUpdated }
        })
    }

    get items(): IRepository[] {
        return this._items;
    }

    get languageDefaultValue(): string {
        return "Uncategorized"
    }

    chartDataByLanguage(): IData[] {
       return  _(this.items).countBy("language").map((value, key) => {
            return {name: (key !== "null") ? key : this.languageDefaultValue, value}
       }).value();
    }
    
    get tableData(): IRepositoryTableDataProps {
        return {
            rowData: this._tableData(),
            headerData: this._tableHeader
        }
    }
}

export class IMostStarredData {
    private _items: IRepository[] = [];

    constructor(data?: IMostStarred) {
        if(!data) {
            return
        }
        this._items = data.items
    }

    get languageDefaultValue(): string {
        return "Uncategorized"
    }

    chartDataByLanguage(): IData[] {
        return  _(this._items).countBy("language").map((value, key) => {
             return {name: (key !== "null") ? key : this.languageDefaultValue, value}
        }).value();
    }

    private get _first(): IRepository | null {
        return this._items && this._items[0] ? this._items[0] : null
    }

    get firstRepoName(): string {
        return this._first ? this._first.name : "Unknown"
    }

    get firstStarCount(): string {
        return this._first ? _.toString(this._first.stargazers_count) : "0"
    }

    get firstRepoLanguage(): string {
        return this._first && this._first.language ? this._first.language : "Unknown"
    }

    get firstRepoWatchers() {
        return this._first ? _.toString(this._first.watchers) : "0"
    }
}
