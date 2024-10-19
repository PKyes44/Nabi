import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
if (!KEY) throw new Error("KEY가 없습니다");
if (!URL) throw new Error("URL이 없습니다");

export const createFetch =
  (options: Pick<RequestInit, "next" | "cache">) =>
  (url: RequestInfo | URL, init?: RequestInit) => {
    return fetch(url, {
      ...init,
      ...options,
    });
  };

export const supabase = createClient(URL, KEY, {
  global: {
    fetch: createFetch({
      cache: "no-store",
    }),
  },
});
