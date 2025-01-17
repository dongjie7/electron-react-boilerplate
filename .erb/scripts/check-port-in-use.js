import chalk from 'chalk';
import detectPort from 'detect-port';

/**
 * detect-port 是一个简单的 Node.js 模块，用于检测指定端口是否被占用，并自动寻找可用的替代端口。
 * 这对于在开发环境中自动化服务监听非常有用
 * typeScript class:
 * class Car {
    //字段 
    engine:string; 
    //构造函数 
    constructor(engine:string) { 
      this.engine = engine 
    }
    //方法 
    disp():void { 
      console.log("发动机为 :   "+this.engine) 
    }
}
*/
const port = process.env.PORT || '1212';

detectPort(port, (_err, availablePort) => {
  if (port !== String(availablePort)) {
    throw new Error(
      chalk.whiteBright.bgRed.bold(
        `Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=4343 npm start`,
      ),
    );
  } else {
    process.exit(0);
  }
});
