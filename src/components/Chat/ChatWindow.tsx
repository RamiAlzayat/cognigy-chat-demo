import { useRef, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ChatInput from './ChatInput';
import Message from './Message';
import emptyStateImg from '../../assets/images/empty.png';
import { useAppSelector } from '../../store/hooks';
import { selectChatIsOpen, selectMessages } from '../../store/slices/chatSlice';

const useStyles = makeStyles({
  chatWindow: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: 320,
    height: '80%',
    maxHeight: 500,
    backgroundColor: '#e5e5e5',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
  },
  messagesList: {
    height: '100%',
    overflowY: 'auto',
    width: '100%',
    padding: 0,
    listStyle: 'none',
    margin: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    '&::-webkit-scrollbar': {
      width: 0,
      background: 'transparent',
    },
  },
  emptyState: {
    width: '100%',
    margin: 'auto',
    filter: 'brightness(0.9)',
  },
});

const ChatWindow: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const messagesListRef = useRef<HTMLUListElement>(null);
  const scrollTargetRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatIsOpen = useAppSelector(selectChatIsOpen);
  const messages = useAppSelector(selectMessages);
  const classes = useStyles();

  useEffect(() => {
    if (chatIsOpen || showChat) {
      setShowChat(true);
      inputRef.current?.focus();
    }
    messagesListRef.current?.scrollTo({
      top: messagesListRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, chatIsOpen, showChat]);

  const chatClasses = classNames(`animate__animated animate__faster ${classes.chatWindow}`, {
    animate__zoomIn: chatIsOpen,
    animate__zoomOut: !chatIsOpen,
    hidden: !showChat,
  });

  const renderMessages = messages.map((item, index) => {
    const sentByBot = item.sender === 'bot';
    const lastMessageRef = messages.length - 1 === index ? scrollTargetRef : null;
    return (
      <Message
        key={index}
        index={index}
        ref={lastMessageRef}
        sentByBot={sentByBot}
        message={item.text}
        timeStamp={item.timestamp}
        imageUrl={item.imageUrl}
      />
    );
  });

  const renderEmptyState = () => {
    return <img className={classes.emptyState} src={emptyStateImg} id="cy-empty-chat" />;
  };

  return (
    <div className={chatClasses} onClick={() => inputRef.current?.focus()} id="cy-chat-window">
      {messages.length ? (
        <ul ref={messagesListRef} className={classes.messagesList} id="cy-chat-messages-list">
          {renderMessages}
        </ul>
      ) : (
        renderEmptyState()
      )}

      <ChatInput ref={inputRef} />
    </div>
  );
};

export default ChatWindow;
