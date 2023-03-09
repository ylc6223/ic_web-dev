/*
 * @Author: liutong
 * @Date: 2023-01-04 13:23:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-04 20:27:31
 * @Descripttion: 
 * @FilePath: \ic_web\src\utils\validate.js
 */

/**
 * 判断是否为空
 */
 export function validatenull(val) {
    if (typeof val == 'boolean') {
        return false;
    }
    if (typeof val == 'number') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length == 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
        return false;
    }
    return false;
}

