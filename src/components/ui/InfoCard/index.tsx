import { Avatar, Box, Card, CardContent, createStyles, Grid, LinearProgress, makeStyles, Theme, Typography } from '@material-ui/core';
import { SvgIconComponent } from '@material-ui/icons';
  
export interface IInfoCard {
  title: string;
  subtitle: string;
  Icon?: SvgIconComponent
  isLoading?: boolean
}

  const InfoCard:React.FC<IInfoCard> = ({title, subtitle, Icon, isLoading}) => {
    const classes = useStyles();

    return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid item>
            <Typography
              gutterBottom
              variant="h6"
            >
              {subtitle}
            </Typography>
            { !isLoading ?
              <Typography
                variant="h3"
              >
                {title}
              </Typography>
            :
              <LinearProgress className={classes.progress}/> }
          </Grid>
          { Icon !== undefined &&
            <Grid className={classes.iconContainer} item xs>
              <Box display="flex" justifyContent="flex-end">
              <Avatar
              >
                <Icon />
              </Avatar>
              </Box>
            </Grid>
          }
        </Grid>
      </CardContent>
    </Card>
  )};

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconContainer: {
      display: "none",
      [theme.breakpoints.up('sm')]: {
        display: "block"
      },
    },
    progress: {
      marginBottom: theme.spacing(1.3),
      marginTop: theme.spacing(2.2),
      width: theme.spacing(15)
    }
  }),
);
  
  export default InfoCard;