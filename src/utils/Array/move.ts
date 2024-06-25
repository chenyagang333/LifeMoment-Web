//Move(目标数组, 需要移动的元素的位置, 元素移动后的位置)
export function Move(arr:any, a:number, b:number) {
    let arr_temp = [].concat(arr);  //创建一个新的临时数组，用以操作后不变更原数组
    arr_temp.splice(b, 0, arr_temp.splice(a, 1)[0]);  //在b位置插入从a位置截取的元素
    return arr_temp;
}