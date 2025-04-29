import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: '99z7dpqz', 
    dataset: 'production',
    apiVersion: '2025-04-29', 
    useCdn: true,
  
})