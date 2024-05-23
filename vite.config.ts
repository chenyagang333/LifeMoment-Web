import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { viteMockServe } from "vite-plugin-mock"; // 从插件中导入viteMockServe

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    VueI18nPlugin({
      /* options */
      // locale messages resource pre-compile option
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "@/language/*.json"
      ),
    }),
    viteMockServe({
    //   mockPath?: string;
    // configPath?: string;
    // ignore?: RegExp | ((fileName: string) => boolean);
    // watchFiles?: boolean;
    // enable?: boolean;
    // logger?: boolean;

      mockPath: "src/mock",//设置mock文件存储目录
      // localEnabled: true,//设置是否启用本地mock文件
      // prodEnabled: true,//设置打包是否启用 mock 功能
      watchFiles: true,//设置是否监视mockPath对应的文件夹内文件中的更改
      logger: true,//是否在控制台显示请求日志
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"), // 相对路径配置别名，使用@替代src
    },
  },
  // scss全局变量的一个配置
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
      },
    },
  },
});
