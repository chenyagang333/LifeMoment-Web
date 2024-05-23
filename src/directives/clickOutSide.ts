// import { on } from "events"
// // DOM 元素与其事件监听函数组成的 Map，key 是 DOM 元素，value 是对应的处理函数数组
// const nodeList: any = new Map()
// // 鼠标操作分为两个阶段
// // 1. mousedown 按下鼠标
// // 2. mouseup 松开鼠标
// // 完成以上两步，才算完成一次完整的 click 事件触发
// // startClick 是 mousedown 事件处理函数的 Event 参数
// let startClick: MouseEvent
// if (isClient) {
//     // 监听 mousedown 事件，设置 startClick 对象
//     on(document, 'mousedown', (e: MouseEvent) => (startClick = e))
//     // 监听 mouseup 事件，循环执行事件处理函数，但是至于是否真正执行，要满足 createDocumentHandler 中的执行条件才行。
//     on(document, 'mouseup', (e: MouseEvent) => {
//         for (const handlers of nodeList.values()) {
//             for (const { documentHandler } of handlers) {
//                 documentHandler(e as MouseEvent, startClick)
//             }
//         }
//     })
// }

// // 生成事件处理函数，供 mouseup 事件调用
// function createDocumentHandler(el: HTMLElement, binding: DirectiveBinding): DocumentHandler {
//     // ClickOutside 允许通过参数设置例外的 target，点击该参数对应的 DOM 不会触发处理函数
//     let excludes: HTMLElement[] = []
//     // 正常情况，参数是数组形式，直接将该参数数组设置为例外 DOM
//     if (Array.isArray(binding.arg)) {
//         excludes = binding.arg
//     } else if ((binding.arg as unknown) instanceof HTMLElement) {
//         // 容错处理，如果参数是 HTMLElement，将其 push 到 excludes 中
//         excludes.push(binding.arg as unknown as HTMLElement)
//     }
//     // 返回一个函数，参数是 mouseup 和 mousedown 事件处理函数的 Event 参数
//     return function (mouseup, mousedown) {
//         // popper（若存在的话，如下拉框等）
//         const popperRef = (binding.instance as ComponentPublicInstance<{popperRef: Nullable<HTMLElement>}>).popperRef   
//         // mouseup 事件触发的 target
//         const mouseUpTarget = mouseup.target as Node
//         // mousedown 事件触发的 target
//         const mouseDownTarget = mousedown?.target as Node
//         // 校验情况1：ClickOutside 是否绑定了处理函数
//         const isBound = !binding || !binding.instance
//         // 校验情况2：是否存在事件触发的 target
//         const isTargetExists = !mouseUpTarget || !mouseDownTarget
//         // 校验情况3：事件触发的 target 是否在 el 内
//         const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget)
//         // 校验情况4：事件触发的 target 是否为 el
//         const isSelf = el === mouseUpTarget
//         // 校验情况5：事件触发的 target 是否在例外 DOM 数组内
//         const isTargetExcluded = (excludes.length && excludes.some((item) => item?.contains(mouseUpTarget))) || (excludes.length && excludes.includes(mouseDownTarget as HTMLElement))
//         // 校验情况6：若存在 popper，事件触发的 target 是否在 popper 内
//         const isContainedByPopper = popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget))
//         // 若满足以上 6 中校验情况的任意一种，直接跳出，否则执行 ClickOutside 指令绑定的处理函数
//         if (
//             isBound ||
//             isTargetExists ||
//             isContainedByEl ||
//             isSelf ||
//             isTargetExcluded ||
//             isContainedByPopper
//         ) {
//             return
//         }
//         binding.value(mouseup, mousedown)
//     }
// }

// // clickOutside 实现代码
// const ClickOutside: ObjectDirective = {
//     beforeMount(el: HTMLElement, binding: DirectiveBinding) {
//         // 当前的 DOM 元素可能存在多个处理好函数
//         // 1.确定监听的 DOM 元素中是否存在当前 el，若不存在，初始化为空数组[]
//         if (!nodeList.has(el)) {
//             nodeList.set(el, [])
//         }
//         // 将事件处理函数添加到 el 对应的处理函数列表中
//         nodeList.get(el).push({
//             // 调用 createDocumentHandler 方法返回处理函数，内部会对是否校验各种边界情况，判断是否需要执行 binding.value 绑定的处理函数
//             documentHandler: createDocumentHandler(el, binding),
//             bindingFn: binding.value,
//         })
//     },

//     updated(el: HTMLElement, binding: DirectiveBinding) {
//         if (!nodeList.has(el)) {
//             nodeList.set(el, [])
//         }
//         // 获取当前 el 绑定的所有处理函数
//         const handlers = nodeList.get(el)
//         // 获取更新前的处理函数索引
//         const oldHandlerIndex = handlers.findIndex(
//             (item) => item.bindingFn === binding.oldValue
//         )
//         // 设置新的处理函数，用于替换旧的处理函数
//         const newHandler = {
//             documentHandler: createDocumentHandler(el, binding),
//             bindingFn: binding.value,
//         }
//         // 若原先存在处理函数，替换；若不存在，添加；
//         if (oldHandlerIndex >= 0) {
//             // replace the old handler to the new handler
//             handlers.splice(oldHandlerIndex, 1, newHandler)
//         } else {
//             handlers.push(newHandler)
//         }
//     },
//     unmounted(el: HTMLElement) {
//         // 移除 el 绑定的所有监听事件处理函数
//         nodeList.delete(el)
//     },
// }