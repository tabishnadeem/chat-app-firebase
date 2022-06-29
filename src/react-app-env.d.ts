/// <reference types="react-scripts" />
declare module "*.mp3" {
  const src: string;
  export default src;
}
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
    }
  }
}
