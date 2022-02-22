module.exports = {
  projectName: 'xxx-frontend',
  privateKey: '',
  passphrase: '',
  cluster: [],
  dev: {
    name: '内网环境',
    script: 'npm run build',
    host: '192.168.xx.xx',
    port: 22,
    username: 'megaium',
    password: 'Megaium!',
    distPath: 'html',
    webDir: '/opt/hdy/',
    bakDir: '',
    isRemoveRemoteFile: false,
    isRemoveLocalFile: false,
  },
};
