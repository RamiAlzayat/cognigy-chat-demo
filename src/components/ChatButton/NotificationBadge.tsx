import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  dot: {
    position: 'absolute',
    top: 0,
    width: 14,
    height: 14,
    right: '4px',
    borderRadius: '100%',
    background: '#d4130d',
    color: '#fff',
  },
}));

const NotificationBadge: React.FC = () => {
  const classes = useStyles();

  return <div className={`${classes.dot} animate__animated animate__fadeIn`} />;
};

export default NotificationBadge;
