import axios from 'axios';
import { Color } from '@material-ui/lab/Alert';
import { IRepositoryTableData, IRepositoryTableOrder } from 'src/models/IRepositoryTable';
import { IOrganization, IOrganizationData } from 'src/models/IOrganization';
import { IMostStarred, IRepository, IRepositoryData, IMostStarredData }  from "src/models/IRepository";
import { IUser, IUserData } from "src/models/IUser";
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
  user: IUserData
  repos: IRepositoryData
  orgs: IOrganizationData
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

export const getUserRepos = async (username: string, params: IRepoParams): Promise<IRepositoryData> => {
  noUserNameError(username)
  const response = await API.get<IRepository[]>(`users/${username}/repos`, {
    params: {
      per_page: params.perPage,
      page: params.page,
      sort: params.sort,
      direction: params.direction
    }
  })
  return new IRepositoryData(response.data);
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


export const getStatistics = async (): Promise<IMostStarredData> => {
  const mostStarred = await API.get<IMostStarred>("search/repositories?q=stars:>1&sort=stars")
  return new IMostStarredData(mostStarred.data)
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
        user: new IUserData(user.data),
        repos: new IRepositoryData(repos.data),
        orgs: new IOrganizationData(orgs.data),
    });
}
