import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Input, IconButton } from '@material-ui/core';

import { useAppDispatch } from '../../store/hooks';
import { sendMessage } from '../../store/slices/chatSlice';

import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
  formControl: {
    width: '320px',
  },
  submitButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  input: {
    height: 32,
    paddingTop: 8,
    paddingRight: 40,
    paddingBottom: 8,
    paddingLeft: 8,
    fontSize: 17,
    borderTop: '2px solid #F5F4F5',
  },
});

const ChatInput = React.forwardRef((_props, ref) => {
  const [value, setValue] = useState('');
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    dispatch(sendMessage(value));
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} id="cy-form">
      <FormControl className={classes.formControl}>
        <Input
          disableUnderline={true}
          inputRef={ref}
          value={value}
          autoFocus={true}
          onChange={handleOnChange}
          inputProps={{
            className: classes.input,
          }}
          placeholder="Send a message..."
          id="cy-chat-input"
          aria-describedby="chat-input"
        />
        <IconButton
          className={classes.submitButton}
          aria-label="send message"
          disabled={!value}
          type="submit"
          id="cy-submit"
        >
          <SendIcon />
        </IconButton>
      </FormControl>
    </form>
  );
});

export default ChatInput;
