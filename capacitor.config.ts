import { CapacitorConfig } from '@capacitor/cli';
import { hostname } from 'os';

const config: CapacitorConfig = {
  appId: 'com.sigreyd.app',
  appName: 'SICREYD',
  bundledWebRuntime: false,
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: false,
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
     PushNotifications: {
      presentationOptions: ['alert', 'sound'],
    },
  },
  server: {
    hostname:'localhost:8100',
  }
};

export default config;
