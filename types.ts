import ky from 'https://cdn.skypack.dev/ky?dts';

export type Ky = typeof ky;

export type Conversations = {
  ok: boolean;
  channels: [
    {
      id: string;
      name: string;
      // deno-lint-ignore no-explicit-any
      [key: string]: any;
    }
  ]
  // deno-lint-ignore no-explicit-any camelcase
  response_metadata: any;
}

export type UserIdentity = {
  ok: boolean;
  user: {
    name: string;
    id: string;
  },
  team: {
    id: string;
  }
}

export type History = {
  ok: boolean;
  messages: [{
    user: string;
    text: string;
    ts: string;
    // deno-lint-ignore no-explicit-any
    [key: string]: any;
  }];
  // deno-lint-ignore no-explicit-any
  [key: string]: any;
}
