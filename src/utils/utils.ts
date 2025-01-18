// 获取浏览器信息
export function getBaseConfig(): object {
  const browser = window.navigator.userAgent;
  const url = window.location.href;
  const screenWidth = document.body.clientWidth;
  const screenHeight = document.body.clientHeight;
  const referer = document.referrer;
  const pageTitle = document.title;
  const clientScreen = `${window.screen.width}*${window.screen.height}`;

  // 判断所用浏览器
  const browserTypeFc = (): string => {
    const agent = window.navigator.userAgent.toLowerCase();
    let browserInfo = '';
    if (agent.indexOf('trident') > 0) {
      // IE
      browserInfo = 'IE';
    } else if (agent.indexOf('msie') > 0) {
      // OLD_IE
      browserInfo = 'IE';
    } else if (agent.indexOf('edge') > 0) {
      // Edge
      browserInfo = 'Edge';
    } else if (agent.indexOf('firefox') > 0) {
      // firefox
      browserInfo = 'Firefox';
    } else if (agent.indexOf('opr') > 0) {
      // Opera
      browserInfo = 'Opera';
    } else if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
      // Safari
      browserInfo = 'Safari';
    } else if (agent.indexOf('chrome') > 0) {
      // Chrome
      browserInfo = 'Chrome';
    } else {
      browserInfo = 'other';
    }
    return browserInfo;
  };

  // 获取操作系统信息
  const OSTypeFc = (): string => {
    const sUserAgent = window.navigator.userAgent.toLowerCase();

    const isWin =
      window.navigator.platform === 'Win32' || window.navigator.platform === 'Win64' || window.navigator.platform === 'wow64';
    if (isWin) {
      const isWin7 = sUserAgent.indexOf('Windows nt 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1;
      if (isWin7) return 'Win7';
      const isWin8 = sUserAgent.indexOf('windows nt 6.2') > -1 || sUserAgent.indexOf('Windows 8') > -1;
      if (isWin8) return 'Win8';
      const isWin10 = sUserAgent.indexOf('windows nt 10.0') > -1 || sUserAgent.indexOf('Windows 10') > -1;
      if (isWin10) return 'Win10';
      const isWin11 = sUserAgent.indexOf('windows nt 11.0') > -1 || sUserAgent.indexOf('Windows 11') > -1;
      if (isWin11) return 'Win11';
    }

    const isMac =
      window.navigator.platform === 'Mac68K' ||
      window.navigator.platform === 'MacPPC' ||
      window.navigator.platform === 'Macintosh' ||
      window.navigator.platform === 'MacIntel';
    if (isMac) return 'Mac';

    const isUnix = window.navigator.platform === 'X11' && !isWin && !isMac;
    if (isUnix) return 'Unix';

    const isLinux = String(window.navigator.platform).indexOf('Linux') > -1;
    const bIsAndroid = sUserAgent.toLowerCase().indexOf('android') > -1;
    if (isLinux) {
      if (bIsAndroid) return 'Android';
      return 'Linux';
    }
    return 'other';
  };
  const OSType = OSTypeFc();
  const browserType = browserTypeFc();
  return { browser, url, screenWidth, screenHeight, pageTitle, clientScreen, referer, browserType, OSType };
}