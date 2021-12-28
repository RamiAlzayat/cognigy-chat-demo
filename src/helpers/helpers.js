export const getCurrentTimeStamp = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const timeStamp = `${hour}:${minute}`;
  return timeStamp;
};

const incomingMessage = '/incomingMessage.mp3';
const audioObj = new Audio(incomingMessage);
export const playAudio = () => {
  audioObj.play();
};
