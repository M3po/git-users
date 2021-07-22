import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import InfoCard from 'src/components/ui/InfoCard';
import BookIcon from '@material-ui/icons/Book';
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
import CustomBarChart from 'src/components/ui/CustomBarChart';
import CustomPieChart from 'src/components/ui/CustomPieChart';
import { getUserRepos, getSearchData, getStatistics } from 'src/api';
import Header from 'src/components/ui/Header';
import Toast, { ISnackbarMessage } from 'src/components/ui/Toast';
import RepositoryTable, { IRepositoryTableRef } from 'src/components/ui/RepositoryTable';
import { IData } from 'src/models/common';
import { IRepositoryTableData, IRepositoryTableDataProps, IRepositoryTableOrder } from 'src/models/IRepositoryTable';
import { IUserData } from 'src/models/IUser';
import Greetings from 'src/components/ui/Greetings';
import { IMostStarredData } from 'src/models/IRepository';

const INITIAL_REPOS_ROWS_PER_PAGE = 10
const INITIAL_REPOS_PAGE = 1
const INITIAL_REPOS_ORDER_PROPERTY = "name"
const INITIAL_REPOS_DIRECTION = "asc"

const Dashboard: React.FC = () =>  {

  const [userData, setUserData] = React.useState<IUserData>();
  const [orgCount, setOrgCount] = React.useState<string>("0");
  const [userDataError, setUserDataError] = React.useState<ISnackbarMessage>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isRepoDataLoading, setIsRepoDataLoading] = React.useState<boolean>(false)
  const [repositoryData, setRepositoryData] = React.useState<IRepositoryTableDataProps>({rowData: [], headerData: []})
  const [repositoryChart, setRepositoryChart] = React.useState<IData[]>([])
  const [repositoryStarredData, setRepositoryStarredData] = React.useState<IMostStarredData>(new IMostStarredData())
  const [repositoryStarredChart, setRepositoryStarredChart] = React.useState<IData[]>([])
  const [isStatisticsLoading, setIsStatisticsLoading] = React.useState<boolean>(false)

  const usernameRef = React.useRef<string>("")
  const reposTableRef = React.useRef<IRepositoryTableRef>(null)
  
  React.useEffect(() => {
    (async () => {
      setIsStatisticsLoading(true)
      try {
        const response = await getStatistics()
        setRepositoryStarredData(response)
        setRepositoryStarredChart(response.chartDataByLanguage())
        setIsStatisticsLoading(false)
      } catch(e) {
        setIsStatisticsLoading(false)
        setUserDataError({ message: e.message, key: new Date().getTime(), severity: e.severity })
      }
    })()
  },[])

  const submitSearch = async (searchText: string) => {
    setIsLoading(true)
    
    try {
      const { user, repos, orgs } = await getSearchData(searchText, {
        page: INITIAL_REPOS_PAGE,
        perPage: INITIAL_REPOS_ROWS_PER_PAGE,
        direction: INITIAL_REPOS_DIRECTION,
        sort: INITIAL_REPOS_ORDER_PROPERTY
      });

      usernameRef.current = searchText

      setUserData(user)

      setRepositoryData(repos.tableData);
      setRepositoryChart(repos.chartDataByLanguage())

      setOrgCount(orgs.count)

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

      setRepositoryData(response.tableData);
      setRepositoryChart(response.chartDataByLanguage())

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
      { userData ?

        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <InfoCard Icon={PersonIcon} subtitle={"Name"} title={userData.displayName}/>
          </Grid>

          <Grid item xs={6} md={3}>
            <InfoCard Icon={BookIcon} subtitle={"Repositories"} title={userData.publicRepos}/>
          </Grid> 

          <Grid item xs={6} md={3}>   
            <InfoCard Icon={PeopleIcon} subtitle={"Followers"} title={userData.displayFollowers}/>
          </Grid>

          <Grid item xs={6} md={3}>
            <InfoCard Icon={WorkIcon} subtitle={"Organizations"} title={orgCount}/>
          </Grid>

          <Grid item lg={8} md={6} xs={12}>
            <RepositoryTable
              isLoading={isRepoDataLoading}
              ref={reposTableRef}
              data={repositoryData}
              dataCount={userData.public_repos}
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
        </Grid>
      :
        <Greetings isDataLoading={isStatisticsLoading} repoStarredData={repositoryStarredData}/>
      }
      </Container>
    </Box>
    <Toast message={userDataError} severity="error"/>
  </>
  )
}

export default Dashboard;