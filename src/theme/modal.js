import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	close: {
		float: 'right'
	},
}))

export default useStyles;