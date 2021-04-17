import ky from 'https://cdn.skypack.dev/ky?dts';
import { Ky, Conversations, UserIdentity, History } from './types.ts';
import { getConversations, getUsers, getUserIdentity, getHistory, postProfileSet, postMessage } from './api/index.ts';

import { CONSTANTS } from './constants.ts';

const api: Ky = ky.create({ headers: { Authorization: `Bearer ${CONSTANTS.TOKEN_BOT}` } });
const apiUser: Ky = ky.create({ headers: { Authorization: `Bearer ${CONSTANTS.TOKEN_USER}` }});

async function startBreak() {
  const conversations = await getConversations(api);

  const isConversations = (value: unknown): value is Conversations => {
    return typeof value === 'object' && typeof (value as Conversations).ok === 'boolean';
  }
  if (!isConversations(conversations)) {
    return false;
  }
  // XXX
  // bot-test をベタ書きしているが変数にしたい
  const channelId = conversations.channels.filter(item => item.name === 'bot-test')[0].id;

  // XXX
  // 何故か Slack API のページで User のスコープに identity.basic を追加できず
  // users.identity が権限不足で叩けていないため以降のコードが動かないためコメントアウト
  // const userIdentity = await getUserIdentity(apiUser);
  // const isUserIdentity = (value: unknown): value is UserIdentity => {
  //   return typeof value === 'object' && typeof (value as UserIdentity).user.id === 'string';
  // }
  // if (!isUserIdentity(userIdentity)) {
  //   return false;
  // }
  // const userId = userIdentity.user.id;

  const histories = await getHistory(api, channelId);
  const isHistory = (value: unknown): value is History => {
    return typeof value === 'object' && typeof (value as History).messages[0].ts === 'string';
  }
  if (!isHistory(histories)) {
    return false;
  }
  console.log(histories);
  // XXX
  // userId が引けるようになったら動くハズ
  // const todayMessage = histories.messages.filter(item => item.user === userId)[0];
  // if (!todayMessage) {
  //   return false;
  // }
  // const todayMessageTs = todayMessage.ts;
  // await postMessage(apiUser, channelId, todayMessage.ts);

  await postProfileSet(apiUser);
}

await startBreak();

console.error ("*** 終了 ***")
