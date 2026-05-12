import { createClient } from "@base44/sdk";
import { appParams } from "@/lib/app-params";

export const base44 = createClient({
  appId: appParams.appId || import.meta.env.VITE_BASE44_APP_ID || "",
  token: appParams.token || undefined,
  appBaseUrl: appParams.appBaseUrl || undefined,
  functionsVersion: appParams.functionsVersion || undefined,
});
