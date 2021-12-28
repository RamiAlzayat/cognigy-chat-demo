import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '..';
import { getCurrentTimeStamp } from '../../helpers/helpers';
import { SocketClient } from '@cognigy/socket-client';
const client = new SocketClient(
  'https://endpoint-trial.cognigy.ai',
  '32a17140dc19d19b5c0b6e08f94def9ade56eba3a40fe3dfc64a061368fa5a9e',
  {
    forceWebsockets: true,
  },
);
interface MessageObject {
  text: string;
  sender: string;
  timestamp: string;
}

type MessageArray = Array<MessageObject>;
export interface ChatState {
  status: 'idle' | 'loading' | 'failed' | 'loaded';
  chatIsOpen: boolean;
  messages: MessageArray;
  hasNewMessage: boolean;
}

const initialState: ChatState = {
  status: 'idle',
  chatIsOpen: false,
  messages: [],
  hasNewMessage: false,
};

export const initCognigyAi = createAsyncThunk('chat/initApi', async () => {
  const response = await client.connect();
  return response.data;
});

export const addMessageHandler = (): AppThunk => async (dispatch) => {
  client.on('output', (output: { text: string }) => {
    output.text && dispatch(responseMessage(output.text));
  });
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.chatIsOpen = !state.chatIsOpen;
      if (state.chatIsOpen) {
        state.hasNewMessage = false;
      }
    },
    sendMessage: (state, action: PayloadAction<string>) => {
      state.hasNewMessage = false;
      state.messages.push({
        sender: 'user',
        text: action.payload,
        timestamp: getCurrentTimeStamp(),
      });
      client.sendMessage(action.payload);
    },
    responseMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        sender: 'bot',
        text: action.payload,
        timestamp: getCurrentTimeStamp(),
      });
      // if (!state.chatIsOpen) {
      // state.hasNewMessage = true;
      // }
      state.hasNewMessage = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initCognigyAi.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initCognigyAi.fulfilled, (state) => {
        state.status = 'loaded';
      });
  },
});

export const { toggleChat, sendMessage, responseMessage } = chatSlice.actions;

export const selectChatIsOpen = (state: RootState) => state.chat.chatIsOpen;
export const selectMessages = (state: RootState) => state.chat.messages;
export const selectHasNewMessage = (state: RootState) => state.chat.hasNewMessage;

export default chatSlice.reducer;
