import InfoCard from "src/components/ui/InfoCard"
import PersonIcon from '@material-ui/icons/Person';
import StarIcon from '@material-ui/icons/Star';
import BookIcon from '@material-ui/icons/Book';
import { Grid, makeStyles, Theme, Typography } from "@material-ui/core"
import { IMostStarredData } from "src/models/IRepository"

export interface IGreetings {
    repoStarredData: IMostStarredData
}

const Greetings: React.FC<IGreetings> = ({repoStarredData}) => {
    const classes = useStyles()
    return (
        <>
            <Grid item md={6} xs={12} className={classes.textGrid}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Users repositores
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    Welcome to the users repositories example page, here you can search users 
                    repositories and get table with all repositories and graph displaying languages
                </Typography>
            </Grid>
            <Typography variant="h4" color="textSecondary" className={classes.mostStarredText}>
                Most Starred repository
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                    <InfoCard subtitle={"Name"} title={repoStarredData.firstRepoName}/>
                </Grid> 
                <Grid item xs={6} md={3}>
                    <InfoCard Icon={StarIcon} subtitle={"Stars"} title={repoStarredData.firstStarCount}/>
                </Grid> 
                <Grid item xs={6} md={3}>   
                    <InfoCard Icon={BookIcon} subtitle={"Language"} title={repoStarredData.firstRepoLanguage}/>
                </Grid>
                <Grid item xs={6} md={3}>
                    <InfoCard Icon={PersonIcon} subtitle={"Watchers"} title={repoStarredData.firstRepoWatchers}/>
                </Grid>
            </Grid>
        </>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    textGrid: {
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: theme.spacing(3)
    },
    mostStarredText: {
        marginBottom: theme.spacing(3)
    }
}))

export default Greetings