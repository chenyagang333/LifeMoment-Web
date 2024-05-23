import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'

// 自定义内边距和宽高
const paddingWidth = 20;                      // PDF内边距
const paddingHeight = 15;                      // PDF内边距
const A4Width = 595.28 + paddingWidth * 2;    // 定义 A4 纸的宽度（单位为像素）
const A4Height = 841.89 + paddingHeight * 2;   // 定义 A4 纸的高度（单位为像素）

/**
 * 返回保存的PDF文件
 * @param htmlIds DOM元素的多个Id或单个Id，例：'domid' 或 ['domid1','domid2']
 * @param title PDF文件的名字
 * @param bgColor 内容的背景颜色
 */
export const htmlToPDF = async (htmlIds: string[] | string, title: string, bgColor?: string) => {
    const PDF = new jsPDF("p", 'pt', [A4Width, A4Height], true);  // 创建一个新的 jsPDF 实例，指定纸张方向为纵向（"p"），单位为像素（"pt"），纸张尺寸为 A4，第四个参数为压缩PDF文件大小
    // 判断是多个还是单个Id
    if (Array.isArray(htmlIds)) {
        for (let i = 0; i < htmlIds.length; i++) {
            const canvas = await documentToCanvas(htmlIds[i]);
            await canvasToImage(PDF, canvas, A4Width, A4Height) // 转换 canvas 实例为图片并添加到 PDF 对象中
            if (i < htmlIds.length - 1) { // 如果还没循环到最后一项，则为PDF实例添加一页，用来接受下一项的DOM图片
                PDF.addPage();
            }
        }
    } else {
        const canvas = await documentToCanvas(htmlIds);
        await canvasToImage(PDF, canvas, A4Width, A4Height) // 转换 canvas 实例为图片并添加到 PDF 对象中
    }
    PDF.save(title + ".pdf");
}

/**
 * 返回保存的PDF文件，所有的内容用一页展示
 * @param htmlId DOM元素的Id
 * @param title PDF文件的名字
 * @param bgColor 内容的背景颜色
 */
export const htmlToPDFOnlyPiece = async (htmlId: string, title: string, bgColor?: string) => {
    const canvas = await documentToCanvas(htmlId);
    let canvasHeight = ((A4Width - paddingWidth * 2) / canvas.width) * canvas.height  + paddingHeight * 2;
    if (canvasHeight < A4Height) { // 如果内容高度小于一页的高度，则按照一页的高度展示
        canvasHeight = A4Height;
    }
    const PDF = new jsPDF("p", 'pt', [A4Width, canvasHeight], true);
    await canvasToImage(PDF, canvas, A4Width, A4Height, true) // 转换 canvas 实例为图片并添加到 PDF 对象中
    PDF.save(title + ".pdf");
}




// 转换document对象为canvas
const documentToCanvas = async (htmlId: string, bgColor?: string) => {
    const pdfDom: HTMLElement | null = document.getElementById(htmlId) as HTMLElement  // 获取页面中指定 id 的元素，并将其类型声明为 HTMLElement，如果找不到相应的元素，则返回 null
    pdfDom.style.padding = '0 10px !important'             // 设置页面元素的内边距样式为 "0 10px !important"
    const canvas = await html2canvas(pdfDom, {              // 使用 html2canvas 库将页面元素转换为画布元素
        scale: 2,                                           // 设置画布的缩放比例为 2
        useCORS: true,                                      // 启用画布元素的 CORS（跨域资源共享）支持
        backgroundColor: bgColor,                           // 设置画布的背景颜色 
    });
    return canvas;
}

// 转换 canvas 实例为图片并添加到 PDF 对象中
const canvasToImage = async (PDF: jsPDF, canvas: HTMLCanvasElement, A4Width: number, A4Height: number, onlyPiece?: boolean) => {
    const pageHeight = (canvas.width / A4Width) * A4Height; // 计算画布元素的高度，影响生成的 PDF 文档的页面数量和分页效果
    let leftHeight = canvas.height;                         // 定义剩余的画布元素高度，用于处理多页的情况
    let position = paddingHeight;                                       // 定义页面的垂直定位，用于处理多页的情况
    const imgWidth = A4Width - paddingWidth * 2;                               // 定义图片的宽度，与 A4 纸的宽度一致   
    // const imgHeight = ((A4Width / canvas.width) * canvas.height) - paddingHeight * 2; // 定义图片的高度，根据canvas的宽高比例进行计算
    const imgHeight = ((imgWidth / canvas.width) * canvas.height); // 定义图片的高度，根据canvas的宽高比例进行计算
    fillTextOfCanvas(canvas); // 为 canvas 实例添加水印
    const pageData = canvas.toDataURL("image/jpg", 1.0);          // 将画布元素转换为包含图像数据的 Base64 编码的 URL，格式为 JPEG，图片质量为 1.0
    if (onlyPiece) {
        PDF.addImage(pageData, "JPG", paddingWidth, position, imgWidth, imgHeight);  // 将画布的图像数据作为 JPEG 格式添加到 PDF 文档中的当前页面，位置为（0，position）
    } else {
        while (leftHeight > 0) {
            PDF.addImage(pageData, "JPG", paddingWidth, position, imgWidth, imgHeight);  // 将画布的图像数据作为 JPEG 格式添加到 PDF 文档中的当前页面，位置为（0，position）
            leftHeight -= pageHeight;
            position -= A4Height;
            if (leftHeight > 0) {
                position -= paddingHeight * 2;
                PDF.addPage();
            }
        }
    }
}

// 为 canvas 实例添加水印
const fillTextOfCanvas = (canvas: HTMLCanvasElement) => {
    /*
      根据自身业务需求  是否在此处键入下方水印代码
     */
    const ctx: any = canvas.getContext('2d');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.rotate((20 * Math.PI) / 180);
    ctx.font = '20px Microsoft Yahei';
    ctx.fillStyle = 'rgba(184, 184, 184, 0.4)';
    for (let j = 0; j < canvas.width; j += 260) {
        for (let k = 0; k < canvas.height; k += 260) {
            ctx.fillText('BocaTrip.com', j, k);  // 填充文字，坐标 x ，坐标 y 
        }
    }
    ctx.rotate(-(20 * Math.PI / 180)); // 恢复画布的旋转状态
}








