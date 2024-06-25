import { ElMessage } from "element-plus";
import { between8And16, haveLetters, havenumber, validateEmail, validatePhone, validateSpace } from "./RegExpHelper";

// #region 表单校验
interface rules {
    rule: boolean; // 不满足条件时返回false
    msg: string;
}
interface RulesFormResult {
    valid: boolean; // 不满足条件时返回false
    msg: string;
}
export function rulesForm(rules: Array<rules>): RulesFormResult {
    for (let i = 0; i < rules.length; i++) {
        if (!rules[i].rule) {
            return { valid: false, msg: rules[i].msg };
        }
    }
    return { valid: true, msg: '' };
}

export function checkInputs(inputs: Array<RulesFormResult>): boolean {
    let res = true;
    inputs.forEach(input => {
        if (!input.valid) {
            res = false;
            ElMessage.error(input.msg);
        }
    });
    return res;
}


//#endregion

//#region 几种校验的input类型方法

export const checkInputMail = (mail: string): RulesFormResult => { // 校验邮箱框
    const rules = [
        { rule: mail != '', msg: '邮箱不能为空' },
        { rule: validateEmail(mail), msg: '邮箱格式有误' },
    ];
    return rulesForm(rules)
};
export const checkInputPhone = (telephone: string): RulesFormResult => { // 校验电话框
    const rules = [
        { rule: telephone != '', msg: '手机号码不能为空' },
        { rule: validatePhone(telephone), msg: '手机号码格式有误' },
    ];
    return rulesForm(rules)
};
export const checkInputCode = (verificationCode: string): RulesFormResult => { // 校验电话验证码框
    const rules = [
        { rule: verificationCode != '', msg: '验证码不能为空' },
        { rule: verificationCode.length == 6, msg: '验证码格式有误' },
        { rule: !haveLetters(verificationCode), msg: '验证码格式不能包含字母' },
    ];
    return rulesForm(rules)
};
export const checkInputPassword = (password: string): RulesFormResult => { // 校验密码框
    const rules = [
        { rule: password != '', msg: '密码不能为空' },
        { rule: validateSpace(password), msg: '密码不能包括空格' },
        { rule: between8And16(password), msg: '密码长度为8-16个字符' },
        { rule: havenumber(password), msg: '密码必须包含数字' },
        { rule: haveLetters(password), msg: '密码必须包含字母' },
    ]
    return rulesForm(rules)
};

//#endregion


