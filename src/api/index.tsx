import axios from 'axios';
import { IOrganization } from 'src/models/IOrganization';
import { IRepository }  from "src/models/IRepository";
import { IUser } from "src/models/IUser";

const USER_API = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/users`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json'
  },
});

USER_API.interceptors.response.use(
  response => response,
  error => {
    let message
    if (error.response) {
      message = error.response.data.message
  } else if (error.request) {
      message = "There was an error, no response recieved"
  } else {
      message = "There was an error with the request"
  }
  return Promise.reject<string>(message)
  }
);

export interface IGetAllDataResponse {
  user: IUser
  repos: IRepository[]
  orgs: IOrganization[]
}

export interface IRepoParams {
  sort?: "created" | "updated" | "pushed" | "full_name"
  direction?: "asc" | "desc"
  perPage?: number
  page?: number
}

export const getUserRepos = async (username: string, params: IRepoParams): Promise<IRepository[]> => {
  const user = await USER_API.get<IRepository[]>(`${username}/repos`, {
    params: {
      per_page: params.perPage,
      page: params.page,
      sort: params.sort,
      direction: params.direction
    }
  })
  return user.data;
}

export const getUserData = async (username: string, ReposPerPage: number = 100, ReposCurrentPage: number = 1): Promise<IGetAllDataResponse> => { //
  const user = await USER_API.get<IUser>(username);
  let [repos, orgs] = [[] as IRepository[],[] as IOrganization[]];
  if(username) {
      const [reposResponse, orgsResponse] = await Promise
        .all([
          USER_API.get<IRepository[]>(`${username}/repos`, {
            params: {
              per_page: ReposPerPage,
              page: ReposCurrentPage
            }
          }),
          USER_API.get<IOrganization[]>(`${username}/orgs`)
        ]);
      repos = reposResponse.data
      orgs = orgsResponse.data
    }
    return ({
        user: user.data,
        repos: repos,
        orgs: orgs
    });
}

