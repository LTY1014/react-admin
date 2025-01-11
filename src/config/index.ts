/**
 * 全局配置
 */
interface Config {
  apiUrl: string;
  uploadUrl: string;
  appTitle: string;
  appLogo: string;
}

const config: Config = {
  apiUrl: process.env.NODE_ENV === 'development' ? '/api' : 'http://your-production-api.com',
  uploadUrl: process.env.NODE_ENV === 'development' ? '/api/upload' : 'http://your-production-api.com/upload',
  appTitle: 'React Admin',
  appLogo: 'RA',
};

export default config; 