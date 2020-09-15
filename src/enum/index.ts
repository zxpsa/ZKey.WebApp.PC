// export enum InputTypeEnum {
//     /** 简单时间选择 */
//     TIME,
//     SWITCH,
//     DATE,
//     /** 定义单行的输入字段，用户可在其中输入文本。默认宽度为 20 个字符。 */
//     TEXT,
//     DATE_TIME,
//     PERCENTAGE_SLIDER,
//     SELECT,
//     // button	定义可点击按钮（多数情况下，用于通过 JavaScript 启动脚本）。
//     /** 定义复选框。 */
//     CHECKBOX,
//     /** 定义输入字段和 "浏览"按钮，供文件上传。 */
//     FILE,
//     /** 定义图像形式的提交按钮。 */
//     IMAGE,
//     /** 定义密码字段。该字段中的字符被掩码。 */
//     PASSWORD,
//     /** 定义单选按钮。 */
//     RADIO,
//     /** 定义重置按钮。重置按钮会清除表单中的所有数据。 */
//     RESET,
//     /** 定义提交按钮。提交按钮会把表单数据发送到服务器。 */
//     SUBMIT,
//     NUMBER
// }

interface  testApi{
    testName:String;
    testFunc:(params:number) => Promise<string>;
}


export class testClass implements testApi {
    testName: 'asdasd';
    testFunc(params: number) {
        console.log(123123123);

        return Promise.resolve('value');
    }
}