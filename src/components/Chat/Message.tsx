import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles({
  message: {
    position: 'relative',
    width: '70%',
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    marginBottom: 8,
    marginTop: 8,
    paddingBottom: 4,
  },
  userMessage: {
    backgroundColor: '#a3746f',
    color: '#fff',
    marginLeft: 16,
    textAlign: 'left',
    float: 'left',
  },
  botMessage: {
    backgroundColor: '#9fa2b1',
    color: '#fff',
    marginRight: 16,
    textAlign: 'left',
    float: 'right',
  },
  messageArrow: {
    position: 'absolute',
    bottom: '-11px',
    width: 0,
    height: 0,
    borderLeft: '1vh solid transparent',
    borderRight: '1vh solid transparent',
    zIndex: -1,
  },
  botMessageArrow: {
    borderTop: '24px solid #9fa2b1',
    right: '2%',
    transform: 'rotate(-50deg)',
  },
  userMessageArrow: {
    borderTop: '24px solid #a3746f',
    left: '2%',
    transform: 'rotate(50deg)',
  },
  timeStamp: {
    fontSize: 10,
    float: 'right',
    fontStyle: 'italic',
  },
});

interface MessageProps {
  message: string;
  index: number;
  sentByBot: boolean;
  ref: React.Ref<HTMLLIElement> | null;
  timeStamp: string;
}

const Message = React.forwardRef((props: MessageProps, ref: MessageProps['ref']) => {
  const classes = useStyles();
  const { message, index, sentByBot, timeStamp } = props;

  const messageClasses = classNames(classes.message, {
    [classes.botMessage]: sentByBot,
    [classes.userMessage]: !sentByBot,
  });

  const messageArrowClasses = classNames(classes.messageArrow, {
    [classes.botMessageArrow]: sentByBot,
    [classes.userMessageArrow]: !sentByBot,
  });

  return (
    <li
      key={`message-` + index}
      className="animate__animated animate__fadeIn"
      ref={ref}
      id={sentByBot ? 'cy-bot-message' : 'cy-user-message'}
    >
      <p className={messageClasses}>
        {message}
        <br />
        <span className={classes.timeStamp}>{timeStamp}</span>
        <span className={messageArrowClasses} />
      </p>
    </li>
  );
});

export default Message;
