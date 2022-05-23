import { CapacitorConfig } from '@capacitor/cli';
import { hostname } from 'os';

const config: CapacitorConfig = {
  appId: 'com.sigreyd.app',
  appName: 'SIGREYD',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    hostname:'localhost:8100',
  }

};

export default config;
