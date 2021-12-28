import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Avatar } from '@material-ui/core';
import botAvatar from '../../assets/images/bot.svg';
import userAvatar from '../../assets/images/user.svg';

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
    fontWeight: 600,
  },
  userMessage: {
    backgroundColor: '#9d7e7a',
    color: '#fff',
    marginLeft: 16,
    textAlign: 'left',
    float: 'left',
    borderTopLeftRadius: 0,
  },
  botMessage: {
    backgroundColor: '#9fa2b1',
    color: '#fff',
    marginRight: 16,
    textAlign: 'left',
    float: 'right',
    borderTopRightRadius: 0,
  },
  timeStamp: {
    fontSize: 10,
    float: 'right',
    fontStyle: 'italic',
  },
  avatar: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 22,
    height: 22,
    fontSize: 14,
    '& img': {
      width: '60%',
      height: '60%',
    },
  },
  botMessageAvatar: {
    left: -11,
    backgroundColor: '#9fa2b1',
  },
  userMessageAvatar: {
    right: -11,
    backgroundColor: '#9d7e7a',
  },
});

interface MessageProps {
  message: string;
  index: number;
  sentByBot: boolean;
  ref: React.Ref<HTMLLIElement> | null;
  timeStamp: string;
  imageUrl: string | undefined;
}

const Message = React.forwardRef((props: MessageProps, ref: MessageProps['ref']) => {
  const classes = useStyles();
  const { message, index, sentByBot, timeStamp, imageUrl } = props;

  const messageClasses = classNames(classes.message, {
    [classes.botMessage]: sentByBot,
    [classes.userMessage]: !sentByBot,
  });

  const avatarClasses = classNames(classes.avatar, {
    [classes.botMessageAvatar]: sentByBot,
    [classes.userMessageAvatar]: !sentByBot,
  });

  return (
    <li
      key={`message-` + index}
      className="animate__animated animate__fadeIn"
      ref={ref}
      id={sentByBot ? 'cy-bot-message' : 'cy-user-message'}
    >
      <div className={messageClasses}>
        {message && (
          <>
            <span>{message}</span>
            <br />
          </>
        )}
        {imageUrl && <img src={imageUrl} width="100%" alt="" />}
        <span className={classes.timeStamp}>{timeStamp}</span>
        <Avatar className={avatarClasses} alt="" src={sentByBot ? botAvatar : userAvatar} />
      </div>
    </li>
  );
});

export default Message;
