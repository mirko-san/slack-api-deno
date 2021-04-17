import { Ky } from '../types.ts';

export async function getConversations(api: Ky) {
  const url = 'https://slack.com/api/conversations.list';
  return await api.get(url).json();
}

export async function getUsers(api: Ky) {
  const url = 'https://slack.com/api/users.list';
  return await api.get(url).json();
}

export async function getUserIdentity(api: Ky) {
  const url = 'https://slack.com/api/users.identity';
  return await api.get(url).json();
}

export async function getHistory(api: Ky, channel: string) {
  const url = 'https://slack.com/api/conversations.history';
  const options = {
    // TODO: Unix Time で当日の 5:00 以降を取れるようにしたい
    oldest: "1618618654.000100",
    channel,
  }
  const params = new URLSearchParams(options).toString();
  return await api.get(`${url}?=${params}`).json();
}

export async function postProfileSet(api: Ky) {
  const url = 'https://slack.com/api/users.profile.set';
  const options = {
    profile: {
      status_text: "休憩中",
      status_emoji: ":zzz:"
    }
  };
  return await api.post(url, { json: options }).json();
}

export async function postMessage(api: Ky, channel: string, thread_ts: string) {
  const url = 'https://slack.com/api/chat.postMessage';
  const options = {
    channel,
    text: '休憩',
    thread_ts,
  };
  return await api.post(url, { json: options }).json();
}
