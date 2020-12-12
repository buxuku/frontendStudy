
/** 判断数据类型 */
// function isType(value:unknown, type:string):boolean{
//     return Object.prototype.toString.call(value) === `[object ${type}]`
// }

// console.log(isType('abc', 'Number'))

// ------------------------

// function isType(type: string){
//     return (value: unknown) => Object.prototype.toString.call(value) === `[object ${type}]`
// }

// type TypeFunction = (value: unknown) => boolean
// type Types = 'isString' | 'isNumber' | 'isBoolean'

// /**判断数据类型 */
// const utils:Record<Types,TypeFunction > = {} as any;

// ['isString', 'isNumber', 'isBoolean'].forEach(type => {
//     utils[type] = isType(type)
// })

// console.log(utils.isString(232))

// ------------------------

function sum(a:number, b:number, c:number, d:number){
    return a + b + c + d
}

function curry(fn){
    const exec = (...subArgs) => {
        return subArgs.length >= fn.length ? fn(...subArgs) : (...args) => exec(...subArgs, ...args)
    }
    return exec
}

const sumFn = curry(sum)
console.log(sumFn(1)(2,3,4))

function isType(type: string){
    return (value: unknown) => Object.prototype.toString.call(value) === `[object ${type}]`
}

const isString = curry(isType)('String');

console.log(isString(111))