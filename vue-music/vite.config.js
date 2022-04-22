import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//自动按需引入ElementPlus ，需要安装   npm i unplugin-vue-components unplugin-auto-import -D。然后执行5步
import AutoImport from 'unplugin-auto-import/vite'         //  1 步
import Components from 'unplugin-vue-components/vite'                      //2步
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'      //3步


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  AutoImport({                         //4步
    resolvers: [ElementPlusResolver()],
  }),
  Components({                           //5步
    resolvers: [ElementPlusResolver()],
  }),


  ],
  
// proxyTable: {
//   '/api':{
//     target: 'http://music.cyrilstudio.top/',
//     changeOrigin: true,
//     pathRewrite: {
//       '^/api': ''
//     }
//   }
//   },


  base:'./', // 添加这个属性
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // http://iwenwiki.com:3000
        // http://121.4.92.135:3000
        // http://music.cyrilstudio.top/
        target: 'http://101.35.235.36:3000/',   //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },

    },

    

  },

// location /api {
//       rewrite ^/api/(.*)$ /$1 break;
//       proxy_pass http://xxx.com;
//       }
//       location /socket.io {
//       rewrite ^/api/(.*)$ /$1 break;
//       proxy_pass http://xxx.com;
//       }
  
// location ^~ /api/ {
// 	proxy_pass http://xx.xx.xx.x1:8090/api/;  # 转发地址
// }
		
// location ^~ /web/ {
// 	proxy_pass http://xx.xx.xx.x2:8090/web/;  # 转发地址

})
