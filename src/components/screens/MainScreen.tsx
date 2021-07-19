import { Box, Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { getUserData, IGetAllDataResponse } from 'src/api';
import Header from 'src/components/common/Header';
import Toast, { ISnackbarMessage } from 'src/components/common/Toast';
import Chart from 'src/components/common/Chart';
import Table from 'src/components/common/Table';
import { IRepositoryChartData } from 'src/models/IRepository';
import { IChartData } from 'src/models/IChart';

const Main = () =>  {

  const [userData, setUserData] = React.useState<IGetAllDataResponse>();
  const [userDataError, setUserDataError] = React.useState<ISnackbarMessage>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [repositoryData, setRepositoryData] = React.useState<IChartData[]>([])

  const submitSearch = async (searchText: string) => {
    setIsLoading(true)
    try {
     const data = await getUserData(searchText);
     console.log(data);
     const repo = new IRepositoryChartData(data.repos);
     setRepositoryData(repo.chartDataByLanguage);
     console.log(repo.chartDataByLanguage)
     setUserDataError(undefined)
     setUserData(data)
     setIsLoading(false)
    } catch(errorMessage) {
      setUserDataError({ message: errorMessage, key: new Date().getTime() })
      setIsLoading(false)
    } 
  }
  
  return (
    <>
      <Header onSearchSubmit={submitSearch} isLoading={isLoading}/>
      <Box sx={{ flexGrow: 1 }}>
        <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
        <Paper elevation={3}>Some summary</Paper>
        </Grid>
        <Grid item xs={12} md={6}>
        <Paper elevation={3}><Chart data={repositoryData} dataName="Number of repositories"/></Paper>
        </Grid>
        <Grid item xs={12} md={6}>
        <Paper elevation={3}><Table /></Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
        <Paper elevation={3}><Chart data={repositoryData} dataName="Count"/></Paper>
        </Grid>
        
      </Grid>
      </Container>
    </Box>
      
      <Toast message={userDataError} severity="error"/>
    </>
  );
}

export default Main;