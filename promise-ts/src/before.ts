/**
 * 高阶函数： 1：函数的参数是一个函数 2：函数的返回值是一个参数
 * 
 */
type CallBackFn = () => void;
type ReturnFn = (...args: any[]) => void;

// 文件内有export导出，则需要把Function接口定义到global下，否则会认为该Function是当前页面定义的一个Function,而不是全局的Function
declare global{
    interface Function{
        before(fn: CallBackFn):ReturnFn
    }
}

Function.prototype.before = function(fn) {
    return (...args: any[]) => {
        fn();
        this(...args);
    }
}

function test(...args:any[]){
    console.log(...args)
}

const fn = test.before(()=> {
    console.log('test before');
})

fn(1,2,3);

export {}