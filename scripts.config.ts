import type { DenonConfig } from "https://deno.land/x/denon/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run startBreak.ts",
      desc: "run my startBreak.ts file",
      allow: ["net"],
      unstable: true,
    },
  },
};

export default config;
