import { Box, Container, Grid } from '@material-ui/core';
import React from 'react';
import { IGetAllDataResponse, getUserRepos, getSearchData, getStatistics } from 'src/api';
import Header from 'src/components/Dashboard/Header';
import Toast, { ISnackbarMessage } from 'src/components/Dashboard/Toast';
import CustomBarChart from '../ui/CustomBarChart';
import CustomPieChart from '../ui/CustomPieChart';
import RepositoryTable, { IRepositoryTableRef } from './RepositoryTable';
import { IRepositoryData, MostStarredData } from 'src/models/IRepository';
import { IData } from 'src/models/common';
import { IRepositoryTableData, IRepositoryTableDataProps, IRepositoryTableOrder } from './RepositoryTable/model';
import PersonIcon from '@material-ui/icons/Person';
import InfoCard from '../ui/InfoCard';
import BookIcon from '@material-ui/icons/Book';
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';

const INITIAL_REPOS_ROWS_PER_PAGE = 10
const INITIAL_REPOS_PAGE = 1
const INITIAL_REPOS_ORDER_PROPERTY = "name"
const INITIAL_REPOS_DIRECTION = "asc"

const Main = () =>  {

  const [userData, setUserData] = React.useState<IGetAllDataResponse>();
  const [userDataError, setUserDataError] = React.useState<ISnackbarMessage>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isRepoDataLoading, setIsRepoDataLoading] = React.useState<boolean>(false)
  const [repositoryData, setRepositoryData] = React.useState<IRepositoryTableDataProps>({rowData: [], headerData: []})
  const [repositoryChart, setRepositoryChart] = React.useState<IData[]>([])
  const [repositoryStarredChart, setRepositoryStarredChart] = React.useState<IData[]>([])
  const usernameRef = React.useRef<string>("")
  const reposTableRef = React.useRef<IRepositoryTableRef>(null)
  
  React.useEffect(() => {
    (async () => {
      try {
        const response = await getStatistics()
        const starredRepos = new MostStarredData(response);
        setRepositoryStarredChart(starredRepos.chartDataByLanguage)
      } catch(e) {
        setUserDataError({ message: e.message, key: new Date().getTime(), severity: e.severity })
      }
    })()
  },[])

  const submitSearch = async (searchText: string) => {
    setIsLoading(true)
    
    try {
      const response = await getSearchData(searchText, {
        page: INITIAL_REPOS_PAGE,
        perPage: INITIAL_REPOS_ROWS_PER_PAGE,
        direction: INITIAL_REPOS_DIRECTION,
        sort: INITIAL_REPOS_ORDER_PROPERTY
      });

      setUserData(response)
      usernameRef.current = searchText

      const repo = new IRepositoryData(response.repos);
      setRepositoryData(repo.tableData);
      setRepositoryChart(repo.chartDataByLanguage)

      if(reposTableRef.current) {
        reposTableRef.current.resetTableData()
      }
      setIsLoading(false)
    }catch(e) {
      setUserDataError({ message: e.message, key: new Date().getTime(), severity: e.severity })
      setIsLoading(false)
    } 
  }

  const handleRepoData = async (page: number, rowsPerPage: number, order: IRepositoryTableOrder, orderBy: keyof IRepositoryTableData) => {
    setIsRepoDataLoading(true)
    try {
    const response = await getUserRepos(usernameRef.current, { 
      page,        
      perPage: rowsPerPage,
      sort: orderBy,
      direction: order,
  });
      const repo = new IRepositoryData(response);
      setRepositoryData(repo.tableData);
      setRepositoryChart(repo.chartDataByLanguage)
      if(reposTableRef.current) {
        reposTableRef.current.tableScrollToTop()
      }
      setIsRepoDataLoading(false)
    }catch(e) {
      setUserDataError({ message: e.message, key: new Date().getTime(), severity: e.severity })
      setIsRepoDataLoading(false)
    } 
  }

  return (
    <>
    <Header onSearchSubmit={submitSearch} isLoading={isLoading} handleLogoClick={() => setUserData(undefined)}/>
    <Box sx={{ py: 2 }}>
    <Container >
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <InfoCard Icon={PersonIcon} subtitle={"Name"} title={userData && userData.user.name ? userData.user.name : "Unknown"}/>
        </Grid> 
        <Grid item xs={6} md={3}>
          <InfoCard Icon={BookIcon} subtitle={"Repositories"} title={userData ? userData.user.public_repos.toString() : ""}/>
        </Grid> 
        <Grid item xs={6} md={3}>   
          <InfoCard Icon={PeopleIcon} subtitle={"Followers"} title={userData ? userData?.user.followers.toString(): ""}/>
        </Grid>
        <Grid item xs={6} md={3}>
          <InfoCard Icon={WorkIcon} subtitle={"Organizations"} title={userData ? userData?.orgs.length.toString(): ""}/>
        </Grid>
        { userData ?
        <>
          <Grid item lg={8} md={6} xs={12}>
            <RepositoryTable
              isLoading={isRepoDataLoading}
              ref={reposTableRef}
              data={repositoryData}
              dataCount={userData ? userData?.user.public_repos: 0}
              initialPage={INITIAL_REPOS_PAGE}
              initialRowsPerPage={INITIAL_REPOS_ROWS_PER_PAGE}
              initialOrderDirection={INITIAL_REPOS_DIRECTION}
              initialOrderProperty={INITIAL_REPOS_ORDER_PROPERTY}
              handleTableAction={handleRepoData}
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
              <CustomBarChart data={repositoryChart} dataName="Number of repositories" title="Users repositories"/>
              <CustomPieChart data={repositoryStarredChart} dataName="Number of repositories" title="Top starred languages"/>
          </Grid>
        </>
        :
        <div>Insert text</div>
        }
      </Grid>
        
    </Container>
  </Box>
  <Toast message={userDataError} severity="error"/>
  </>
  )
}

export default Main;