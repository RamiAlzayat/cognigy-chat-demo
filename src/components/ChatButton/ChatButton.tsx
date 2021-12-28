import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleChat, selectChatIsOpen, selectHasNewMessage } from '../../store/slices/chatSlice';
import classNames from 'classnames';

import NotificationBadge from './NotificationBadge';
import { IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: '#9C0',
  },
  icon: {
    fontSize: '2rem',
    color: '#fff',
  },
}));

const ChatButton: React.FC = () => {
  const chatIsOpen = useAppSelector(selectChatIsOpen);
  const hasNewMessage = useAppSelector(selectHasNewMessage);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const buttonClasses = classNames(`chat-button animate__animated ${classes.button}`, {
    animate__heartBeat: hasNewMessage,
  });

  return (
    <div>
      <IconButton
        className={buttonClasses}
        onClick={() => dispatch(toggleChat())}
        aria-label="toggle chat"
        id="cy-chat-button"
      >
        {hasNewMessage && <NotificationBadge />}
        {chatIsOpen ? (
          <CloseIcon className={classes.icon} id="cy-close-chat" />
        ) : (
          <ChatIcon className={classes.icon} id="cy-open-chat" />
        )}
      </IconButton>
    </div>
  );
};

export default ChatButton;
