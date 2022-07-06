import { makeStyles } from "@material-ui/core/styles";

export const useStyles= makeStyles((theme) => ({
    modal:{
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: theme.shadows[5],
        padding: '16px 32px 24px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
    },
    textField:{
        width: '100%',
        
    }
}))