/**
 * 全局配置
 */
interface Config {
  apiUrl: string;
  uploadUrl: string;
  appTitle: string;
  appLogo: string;
  /** 登录成功、首页按钮、关闭全部标签等场景的默认跳转路径，改这一处即可全局生效 */
  homePath: string;
}

const config: Config = {
  apiUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:8100/doc.html' : 'http://your-production-api.com',
  uploadUrl: process.env.NODE_ENV === 'development' ? '/api/upload' : 'http://your-production-api.com/upload',
  appTitle: 'React Admin',
  appLogo: 'RA',
  homePath: '/dashboard',
};

export default config; 