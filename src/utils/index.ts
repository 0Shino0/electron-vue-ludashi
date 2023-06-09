
// os 模块
// os模块
import os from 'os'


// gpuInfo().then(function (data: any) {
//   console.log("GPUS:", data);
// });

// const os = require('os')
// console.log(os);
// console.log(os.release());
// console.log(os.endianness());
// console.log(os.constants);
// console.log(os.tmpdir());
// console.log(os.getPriority());
// console.log(os.type());


export interface GpuInfoMember {
  label: string
  value: string
}

// 规范硬件接口信息
export interface HardwareMember {
  arch: string
  kernel: string
  pf: string
  release: string
  uptime: string
  hn: string
  hdir: string
  sysMen: {
    totalMem: string
    freeMem: string
  }
  cpuInfo: string
  // gpuInfo: GpuInfoMember[]
}


/** 格式化时间
 * @param seconds 
 * @returns 
 */
export var dealTime = (seconds: number): string => {
  var seconds = seconds | 0;
  var day: number | string = (seconds / (3600 * 24)) | 0;
  var hours: number | string = ((seconds - day * 3600) / 3600) | 0;
  var minutes: number | string = ((seconds - day * 3600 * 24 - hours * 3600) / 60) | 0;
  var second: number | string = seconds % 60;
  (day < 10) && (day = '0' + day);
  (hours < 10) && (hours = '0' + hours);
  (minutes < 10) && (minutes = '0' + minutes);
  (second < 10) && (second = '0' + second);
  return [day, hours, minutes, second].join(':');
};

/** 格式化内存大小
 * @param mem 
 * @returns 
 */
export var dealMem = (mem: number): string => {
  let G: number | string = 0;
  let M: number | string = 0;
  let KB: number | string = 0;
  (mem > (1 << 30)) && (G = (mem / (1 << 30)).toFixed(2));
  (mem > (1 << 20)) && (mem < (1 << 30)) && (M = (mem / (1 << 20)).toFixed(2));
  (mem > (1 << 10)) && (mem > (1 << 20)) && (KB = (mem / (1 << 10)).toFixed(2));
  return G as number > 0 ? G + 'G' : M as number > 0 ? M + 'M' : KB as number > 0 ? KB + 'KB' : mem + 'B';
};


/** 获取硬件信息
 * 
 */
export function getHardwareInfo(): HardwareMember {
  let hardwareObj: HardwareMember = {
    pf: '', // 平台：
    kernel: '', // 操作系统内核：
    arch: '', // cpu架构：
    release: '', // window版本
    uptime: '', // 开机时间：
    hn: '', // 主机名：
    hdir: '', // 主目录：
    sysMen: { // 内存
      totalMem: '',
      freeMem: '',
    },
    cpuInfo: '', // cpu详细信息
    // gpuInfo: [],
  };
  //cpu架构
  hardwareObj.arch = os.arch();
  // console.log("cpu架构：" + hardwareObj.arch);

  //操作系统内核
  hardwareObj.kernel = os.type();
  // console.log("操作系统内核：" + hardwareObj.kernel);

  //操作系统内核
  hardwareObj.release = os.release();

  //操作系统平台
  hardwareObj.pf = os.platform();
  // console.log("平台：" + hardwareObj.pf);

  //系统开机时间
  // hardwareObj.uptime =  os.uptime();
  hardwareObj.uptime = dealTime(os.uptime());
  // console.log("开机时间：" + dealTime(hardwareObj.uptime));

  //主机名
  hardwareObj.hn = os.hostname();
  // console.log("主机名：" + hardwareObj.hn);

  //主目录
  hardwareObj.hdir = os.homedir();
  // console.log("主目录：" + hardwareObj.hdir);


  //内存
  // hardwareObj.sysMen.totalMem = os.totalmem();
  // hardwareObj.sysMen.freeMem = os.freemem();
  hardwareObj.sysMen.totalMem = dealMem(os.totalmem());
  hardwareObj.sysMen.freeMem = dealMem(os.freemem());
  // console.log(1 - (os.freemem() / os.totalmem()));

  // console.log("内存大小：" + dealMem(hardwareObj.sysMen.totalMem) + ' 空闲内存：' + dealMem(hardwareObj.sysMen.freeMem));

  //cpu
  const cpus = os.cpus();
  // console.log('*****cpu信息*******');
  hardwareObj.cpuInfo = cpus[0].model;
  // console.log(cpus);
  // cpus.forEach((cpu, idx, arr) => {
  //   var times = cpu.times;
  //   console.log(`cpu${idx}：`);
  //   console.log(`型号：${cpu.model}`);
  //   console.log(`频率：${cpu.speed}MHz`);
  //   console.log(`使用率：${((1 - times.idle / (times.idle + times.user + times.nice + times.sys + times.irq)) * 100).toFixed(2)}%`);
  // });

  //网卡
  // console.log('*****网卡信息*******');
  // const networksObj = os.networkInterfaces();
  // for (let nw in networksObj) {
  //   let objArr = networksObj[nw];
  //   if (!objArr) return;
  //   console.log(`\r\n${nw}：`);
  //   objArr.forEach((obj: os.NetworkInterfaceInfo, idx, arr) => {
  //     console.log(`地址：${obj.address}`);
  //     console.log(`掩码：${obj.netmask}`);
  //     console.log(`物理地址：${obj.mac}`);
  //     console.log(`协议族：${obj.family}`);
  //   });
  // }

  console.log(hardwareObj);

  return hardwareObj;
}

/** cpu信息
 * 
 */
export function getCpuInfo() {
  const cpus = os.cpus();
  console.log('*****cpu信息*******');
  cpus.forEach((cpu, idx, arr) => {
    var times = cpu.times;
    console.log(`cpu${idx}：`);
    console.log(`型号：${cpu.model}`);
    console.log(`频率：${cpu.speed}MHz`);
    console.log(`使用率：${((1 - times.idle / (times.idle + times.user + times.nice + times.sys + times.irq)) * 100).toFixed(2)}%`);
  });
}