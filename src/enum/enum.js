export const InputTypeEnum = {
    /** 简单时间选择 */
    TIME:15,
    SWITCH:1,
    DATE:2,
    /** 定义单行的输入字段，用户可在其中输入文本。默认宽度为 20 个字符。 */
    TEXT:3,
    DATE_TIME:4,
    PERCENTAGE_SLIDER:5,
    SELECT:6,
    // button	定义可点击按钮（多数情况下，用于通过 JavaScript 启动脚本）。
    /** 定义复选框。 */
    CHECKBOX:7,
    /** 定义输入字段和 "浏览"按钮，供文件上传。 */	
    FILE:8,
    /** 定义图像形式的提交按钮。 */
    IMAGE:9,
    /** 定义密码字段。该字段中的字符被掩码。 */	
    PASSWORD:10,
    /** 定义单选按钮。 */
    RADIO:11,
    /** 定义重置按钮。重置按钮会清除表单中的所有数据。 */	
    RESET:12,	
    /** 定义提交按钮。提交按钮会把表单数据发送到服务器。 */
    SUBMIT:13,
    NUMBER:14
}

// enum ModalWidth.xs sm m l xl