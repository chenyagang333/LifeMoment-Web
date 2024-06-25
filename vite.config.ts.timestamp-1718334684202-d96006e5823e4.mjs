// vite.config.ts
import { defineConfig } from "file:///D:/AAA/MySundry/MyFullStack/Front-end%20Development/MyChat/node_modules/.pnpm/vite@5.0.10_@types+node@20.10.6_less@4.2.0_sass@1.69.7/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/AAA/MySundry/MyFullStack/Front-end%20Development/MyChat/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@5.0.10_vue@3.4.3/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import VueI18nPlugin from "file:///D:/AAA/MySundry/MyFullStack/Front-end%20Development/MyChat/node_modules/.pnpm/@intlify+unplugin-vue-i18n@2.0.0_vue-i18n@9.9.0/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import { viteMockServe } from "file:///D:/AAA/MySundry/MyFullStack/Front-end%20Development/MyChat/node_modules/.pnpm/vite-plugin-mock@3.0.1_esbuild@0.19.11_mockjs@1.1.0_vite@5.0.10/node_modules/vite-plugin-mock/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/AAA/MySundry/MyFullStack/Front-end%20Development/MyChat/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    VueI18nPlugin({
      /* options */
      // locale messages resource pre-compile option
      include: resolve(
        dirname(fileURLToPath(__vite_injected_original_import_meta_url)),
        "@/language/*.json"
      )
    }),
    viteMockServe({
      //   mockPath?: string;
      // configPath?: string;
      // ignore?: RegExp | ((fileName: string) => boolean);
      // watchFiles?: boolean;
      // enable?: boolean;
      // logger?: boolean;
      mockPath: "src/mock",
      //设置mock文件存储目录
      // localEnabled: true,//设置是否启用本地mock文件
      // prodEnabled: true,//设置打包是否启用 mock 功能
      watchFiles: true,
      //设置是否监视mockPath对应的文件夹内文件中的更改
      logger: true
      //是否在控制台显示请求日志
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src")
      // 相对路径配置别名，使用@替代src
    }
  },
  // scss全局变量的一个配置
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";'
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBQUFcXFxcTXlTdW5kcnlcXFxcTXlGdWxsU3RhY2tcXFxcRnJvbnQtZW5kIERldmVsb3BtZW50XFxcXE15Q2hhdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcQUFBXFxcXE15U3VuZHJ5XFxcXE15RnVsbFN0YWNrXFxcXEZyb250LWVuZCBEZXZlbG9wbWVudFxcXFxNeUNoYXRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0FBQS9NeVN1bmRyeS9NeUZ1bGxTdGFjay9Gcm9udC1lbmQlMjBEZXZlbG9wbWVudC9NeUNoYXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgcmVzb2x2ZSwgZGlybmFtZSB9IGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwibm9kZTp1cmxcIjtcbmltcG9ydCBWdWVJMThuUGx1Z2luIGZyb20gXCJAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4bi92aXRlXCI7XG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSBcInZpdGUtcGx1Z2luLW1vY2tcIjsgLy8gXHU0RUNFXHU2M0QyXHU0RUY2XHU0RTJEXHU1QkZDXHU1MTY1dml0ZU1vY2tTZXJ2ZVxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSh7XG4gICAgICBzY3JpcHQ6IHtcbiAgICAgICAgZGVmaW5lTW9kZWw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pLFxuICAgIFZ1ZUkxOG5QbHVnaW4oe1xuICAgICAgLyogb3B0aW9ucyAqL1xuICAgICAgLy8gbG9jYWxlIG1lc3NhZ2VzIHJlc291cmNlIHByZS1jb21waWxlIG9wdGlvblxuICAgICAgaW5jbHVkZTogcmVzb2x2ZShcbiAgICAgICAgZGlybmFtZShmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICBcIkAvbGFuZ3VhZ2UvKi5qc29uXCJcbiAgICAgICksXG4gICAgfSksXG4gICAgdml0ZU1vY2tTZXJ2ZSh7XG4gICAgLy8gICBtb2NrUGF0aD86IHN0cmluZztcbiAgICAvLyBjb25maWdQYXRoPzogc3RyaW5nO1xuICAgIC8vIGlnbm9yZT86IFJlZ0V4cCB8ICgoZmlsZU5hbWU6IHN0cmluZykgPT4gYm9vbGVhbik7XG4gICAgLy8gd2F0Y2hGaWxlcz86IGJvb2xlYW47XG4gICAgLy8gZW5hYmxlPzogYm9vbGVhbjtcbiAgICAvLyBsb2dnZXI/OiBib29sZWFuO1xuXG4gICAgICBtb2NrUGF0aDogXCJzcmMvbW9ja1wiLC8vXHU4QkJFXHU3RjZFbW9ja1x1NjU4N1x1NEVGNlx1NUI1OFx1NTBBOFx1NzZFRVx1NUY1NVxuICAgICAgLy8gbG9jYWxFbmFibGVkOiB0cnVlLC8vXHU4QkJFXHU3RjZFXHU2NjJGXHU1NDI2XHU1NDJGXHU3NTI4XHU2NzJDXHU1NzMwbW9ja1x1NjU4N1x1NEVGNlxuICAgICAgLy8gcHJvZEVuYWJsZWQ6IHRydWUsLy9cdThCQkVcdTdGNkVcdTYyNTNcdTUzMDVcdTY2MkZcdTU0MjZcdTU0MkZcdTc1MjggbW9jayBcdTUyOUZcdTgwRkRcbiAgICAgIHdhdGNoRmlsZXM6IHRydWUsLy9cdThCQkVcdTdGNkVcdTY2MkZcdTU0MjZcdTc2RDFcdTg5QzZtb2NrUGF0aFx1NUJGOVx1NUU5NFx1NzY4NFx1NjU4N1x1NEVGNlx1NTkzOVx1NTE4NVx1NjU4N1x1NEVGNlx1NEUyRFx1NzY4NFx1NjZGNFx1NjUzOVxuICAgICAgbG9nZ2VyOiB0cnVlLC8vXHU2NjJGXHU1NDI2XHU1NzI4XHU2M0E3XHU1MjM2XHU1M0YwXHU2NjNFXHU3OTNBXHU4QkY3XHU2QzQyXHU2NUU1XHU1RkQ3XG4gICAgfSlcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKFwiLi9zcmNcIiksIC8vIFx1NzZGOFx1NUJGOVx1OERFRlx1NUY4NFx1OTE0RFx1N0Y2RVx1NTIyQlx1NTQwRFx1RkYwQ1x1NEY3Rlx1NzUyOEBcdTY2RkZcdTRFRTNzcmNcbiAgICB9LFxuICB9LFxuICAvLyBzY3NzXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXHU3Njg0XHU0RTAwXHU0RTJBXHU5MTREXHU3RjZFXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIi4vc3JjL3N0eWxlcy92YXJpYWJsZS5zY3NzXCI7JyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3VyxTQUFTLG9CQUFvQjtBQUNyWSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsU0FBUyxlQUFlO0FBQ2pDLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMscUJBQXFCO0FBTnFNLElBQU0sMkNBQTJDO0FBU3BSLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLFFBQVE7QUFBQSxRQUNOLGFBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUE7QUFBQTtBQUFBLE1BR1osU0FBUztBQUFBLFFBQ1AsUUFBUSxjQUFjLHdDQUFlLENBQUM7QUFBQSxRQUN0QztBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVFaLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUdWLFlBQVk7QUFBQTtBQUFBLE1BQ1osUUFBUTtBQUFBO0FBQUEsSUFDVixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsT0FBTztBQUFBO0FBQUEsSUFDM0I7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLG1CQUFtQjtBQUFBLFFBQ25CLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
