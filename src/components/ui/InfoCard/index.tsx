import { Avatar, Box, Card, CardContent, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { IInfoCard } from './model';
  
  const InfoCard:React.FC<IInfoCard> = ({title, subtitle, Icon}) => {
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
            <Typography
              variant="h3"
            >
              {title}
            </Typography>
          </Grid>
          <Grid className={classes.iconContainer} item xs>
            <Box display="flex" justifyContent="flex-end">
            <Avatar
            >
              <Icon />
            </Avatar>
            </Box>
          </Grid>
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
  }),
);
  
  export default InfoCard;