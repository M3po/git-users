import _ from "lodash"
import { Deserialize } from "./deserialize"

export interface IOrganization {
    avatar_url: string
    description: string | null
    events_url: string
    hooks_url: string
    id: number
    issues_url: string
    login: string
    members_url: string
    node_id: string
    public_members_url: string
    repos_url: string
    url: string
}

export class IOrganizationData extends Deserialize  {

    items: IOrganization[] = []

    constructor(data: IOrganization[]) {
        super()
        if(!data) {
            return
        }
        this.items = data;
    }

    get count(): string {
        return _.toString(this.items.length)
    }
}

