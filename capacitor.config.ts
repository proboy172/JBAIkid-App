import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'vn.jbai.kidstar',
  appName: 'JBAIkid',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    hostname: 'localhost',
    allowNavigation: ['www.youtube.com', 'youtube.com', 's.ytimg.com', 'i.ytimg.com'],
  }
};

export default config;
