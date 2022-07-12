import { CapacitorConfig } from '@capacitor/cli';
import { hostname } from 'os';

const config: CapacitorConfig = {
  appId: 'com.sigreyd.app',
  appName: 'SIGREYD',
  bundledWebRuntime: false,
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: '#ffffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: true,
    },
  },
  server: {
    hostname:'localhost:8100',
  }
};

export default config;
