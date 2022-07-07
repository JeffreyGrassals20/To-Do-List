import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: 5,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    textArea:{
        textAlign: 'center',
        width: 275,
    },
    checkBox:{
       position: 'inherit',
       marginLeft: 50
    }
  }));