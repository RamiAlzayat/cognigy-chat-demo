import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '..';
import { getCurrentTimeStamp } from '../../helpers/helpers';
import { SocketClient } from '@cognigy/socket-client';
const token = process.env.REACT_APP_COGNIGY_SOCKET_TOKEN || '';
const client = new SocketClient('https://endpoint-trial.cognigy.ai', token, {
  forceWebsockets: true,
});
interface MessageObject {
  text: string;
  sender: string;
  timestamp: string;
  imageUrl?: string;
}

type MessageArray = Array<MessageObject>;
interface ChatState {
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

interface outputData {
  _cognigy: {
    _default: {
      _image: {
        imageUrl: string;
      };
    };
  };
}

export const addMessageHandler = (): AppThunk => async (dispatch) => {
  client.on('output', (output: { text: string; data: outputData }) => {
    const imageUrl = output.data?._cognigy?._default?._image.imageUrl;

    if (output.text || imageUrl) {
      dispatch(responseMessage({ text: output.text, imageUrl: imageUrl }));
    }
  });
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.chatIsOpen = !state.chatIsOpen;
      state.hasNewMessage = false;
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
    responseMessage: (state, action: { payload: { text: string; imageUrl: string } }) => {
      state.messages.push({
        sender: 'bot',
        text: action.payload.text,
        timestamp: getCurrentTimeStamp(),
        imageUrl: action.payload.imageUrl,
      });

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
