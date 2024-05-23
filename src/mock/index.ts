// mock/index.ts
import type { MockMethod } from "vite-plugin-mock"; // ！！！看这里，这个MockMethod 是个类型，不是方法，导入的时候要type。要么就直接不导入，直接在文件中到处一个数组即可
import { main } from "./youshow";
import { mainLayout } from "./layout1";

export default [...main,...mainLayout] as MockMethod[];
