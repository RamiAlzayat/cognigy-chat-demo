const incomingMessage = '/incomingMessage.mp3';
const audioObj = new Audio(incomingMessage);

export const playAudio = () => {
  audioObj.play();
};
