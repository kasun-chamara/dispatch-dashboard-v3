import * as Ably from 'ably';

const ably = new Ably.Realtime('9WkYZw.d4bidg:PnuB78zqhK0lTnnBmMU89u9aPX7xPdLkTqTmNRA-bNc');

export const getChannel = (channelName) => {
  return ably.channels.get(channelName);
};
