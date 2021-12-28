import React, { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { initCognigyAi, addMessageHandler } from './store/slices/chatSlice';
import { makeStyles } from '@material-ui/core/styles';

import ChatButton from './components/ChatButton/ChatButton';
import ChatWindow from './components/Chat/ChatWindow';

import { handleOnResize } from './helpers/helpers';

import logo from './assets/images/logo.svg';
import 'animate.css';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
});

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    initChat();
    window.addEventListener('resize', handleOnResize);
    return function cleanup() {
      window.removeEventListener('resize', handleOnResize);
    };
  }, []);

  const initChat = () => {
    dispatch(addMessageHandler());
    dispatch(initCognigyAi());
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className={classes.container}>
        <ChatWindow />
        <ChatButton />
      </div>
    </div>
  );
};

export default App;
