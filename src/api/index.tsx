import axios from 'axios';
import { IRepositoryTableData, IRepositoryTableOrder } from 'src/components/Dashboard/RepositoryTable/model';
import { IOrganization } from 'src/models/IOrganization';
import { IMostStarred, IRepository }  from "src/models/IRepository";
import { IUser } from "src/models/IUser";
import { Color } from '@material-ui/lab/Alert';
import CustomError from 'src/models/error';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json'
  },
});

API.interceptors.response.use(
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
  return Promise.reject<{message: string, severity: Color}>({message})
  }
);

export interface IGetAllDataResponse2 {
  user: IUser
  orgs: IOrganization[]
}

export interface IGetAllDataResponse {
  user: IUser
  repos: IRepository[]
  orgs: IOrganization[]
}

export interface IRepoParams {
  sort?: keyof IRepositoryTableData
  direction?: IRepositoryTableOrder
  perPage?: number
  page?: number
}

const noUserNameError = (username: string ) => {
  if(username === "") {
    throw new CustomError("Please enter a username", "warning");
  }
}

export const getUserRepos = async (username: string, params: IRepoParams): Promise<IRepository[]> => {
  noUserNameError(username)
  const user = await API.get<IRepository[]>(`users/${username}/repos`, {
    params: {
      per_page: params.perPage,
      page: params.page,
      sort: params.sort,
      direction: params.direction
    }
  })
  return user.data;
}

export const getUserData = async (username: string): Promise<IGetAllDataResponse2> => { 
  noUserNameError(username)
  const user = await API.get<IUser>(`users/${username}`);
  const orgs = await API.get<IOrganization[]>(`users/${username}/orgs`)
      
    return ({
        user: user.data,
        orgs: orgs.data
    });
}


export const getStatistics = async (): Promise<IMostStarred> => {
  const mostStarred = await API.get<IMostStarred>("search/repositories?q=stars:>1&sort=stars")
  return mostStarred.data
}

export const getSearchData = async (username: string, repoParams: IRepoParams): Promise<IGetAllDataResponse> => { 
  noUserNameError(username)
  const user = await API.get<IUser>(`users/${username}`);
      const [repos, orgs] = await Promise
        .all([
          API.get<IRepository[]>(`users/${username}/repos`, {
            params: {
              per_page: repoParams.perPage,
              page: repoParams.page,
              sort: repoParams.sort,
              direction: repoParams.direction
            }
          }),
          API.get<IOrganization[]>(`users/${username}/orgs`),
          
        ]);
    return ({
        user: user.data,
        repos: repos.data,
        orgs: orgs.data,
    });
}
