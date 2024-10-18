export type ToastType = {
  id?: string;
  title: string;
  content: string;
  status: "start" | "running" | "end" | "over";
};
