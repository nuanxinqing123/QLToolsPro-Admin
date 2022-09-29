/*
 * @Descripttion: Descripttion
 * @Author: LiLei
 * @Date: 2021-05-10 14:09:41
 * @LastEditors: LiLei
 * @LastEditTime: 2021-11-25 16:18:19
 */
module.exports = {
    extends: ["plugin:vue/vue3-essential", "airbnb-base"],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    settings: {
        "import/resolver": {
            webpack: {
                config: "node_modules/@vue/cli-service/webpack.config.js",
            },
        },
    },

    plugins: ["vue"],
    rules: {
        rules: {
            "import/extensions": [
                "error",
                "always",
                {
                    js: "never",
                    vue: "never",
                },
            ],
        },
        // 自己写一些想配置的规则
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境禁用consele
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境禁用debugger
        // 强制执行一致的缩进
        indent: [2, 4],

        "vue/max-attributes-per-line": "off", // 关闭强制 html 标签换行
        "no-param-reassign": ["error", { props: false }], // 允许修改参数中的属性值
        "import/prefer-default-export": "off", // 模块只输出一个变量时，是否需要添加default
        "no-plusplus": "off", // 一元运算符
        // 定义对象的set存取器属性时，强制定义get
        "accessor-pairs": 0,
        // 在数组括号内强制实现一致的间距。
        "array-bracket-newline": 0,
        // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        "array-bracket-spacing": [2, "never"],
        // 强制数组方法的回调函数中有 return 语句
        "array-callback-return": 1,
        // 强制数组元素间出现换行
        "array-element-newline": 0,
        // 要求箭头函数体使用大括号
        "arrow-body-style": 2,
        // 要求箭头函数的参数使用圆括号
        "arrow-parens": 2,
        // 要求箭头函数空格
        "arrow-spacing": [2, { before: true, after: true }],
        // 强制把变量的使用限制在其定义的作用域范围内
        "block-scoped-var": 2,
        // 禁止或强制在单行代码块中使用空格(禁用)
        "block-spacing": 0,
        // 强制使用一致的缩进 第二个参数为 'tab' 时，会使用tab，
        // if while function 后面的{必须与if在同一行，java风格。
        "brace-style": [2, "1tbs", { allowSingleLine: true }],
        // require return statements after
        "callback-return": 0,
        // 双峰驼命名格式
        camelcase: 2,
        // 注释 大写字母开头，不推荐 注释的代码会报错
        "capitalized-comments": 0,
        // 如果一个类方法没有使用this，它有时可以变成一个静态函数。如果将该方法转换为静态函数，那么调用该特定方法的类的实例也必须转换为静态调用
        "class-methods-use-this": 2,
        // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
        // always-multiline：多行模式必须带逗号，单行模式不能带逗号
        "comma-dangle": [2, "never"],
        // 控制逗号前后的空格
        "comma-spacing": [2, { before: false, after: true }],
        // 控制逗号在行尾出现还是在行首出现 (默认行尾)
        // http: //eslint.org/docs/rules/comma-style
        "comma-style": [2, "last"],
        // 限制圈复杂度，也就是类似if else能连续接多少个
        complexity: 0,
        "vue/no-v-model-argument": "off",
        // 'SwitchCase' (默认：0) 强制 switch 语句中的 case 子句的缩进水平
        // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
        "computed-property-spacing": [2, "never"],
        // 要求 return 语句要么总是指定返回的值，要么不指定
        "consistent-return": 2,
        // 用于指统一在回调函数中指向this的变量名，箭头函数中的this已经可以指向外层调用者，应该没卵用了
        // e.g [0,'that'] 指定只能 var that = this. that不能指向其他任何值，this也不能赋值给that以外的其他值
        "consistent-this": [2, "_this"],
        // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
        "constructor-super": 0,
        // 强制所有控制语句使用一致的括号风格
        curly: [2, "all"],
        // switch 语句强制 default 分支，也可添加 // no default 注释取消此次警告
        "default-case": 2,
        // 强制object.key 中 . 的位置，参数:
        // property，'.'号应与属性在同一行
        // object, '.' 号应与对象名在同一行
        "dot-location": [2, "property"],
        // 强制使用.号取属性
        // 参数： allowKeywords：true 使用保留字做属性名时，只能使用.方式取属性
        // false 使用保留字做属性名时, 只能使用[]方式取属性 e.g [2, {'allowKeywords': false}]
        // allowPattern: 当属性名匹配提供的正则表达式时，允许使用[]方式取值,否则只能用.号取值 e.g [2, {'allowPattern': '^[a-z]+(_[a-z]+)+$'}]
        "dot-notation": 0,
        // 文件末尾强制换行
        "eol-last": 0,
        // 使用 === 替代 == allow-null允许null和undefined==
        eqeqeq: [2, "allow-null"],
        // 强制 “for” 循环中更新子句的计数器朝着正确的方向移动
        "for-direction": "error",
        // 要求或禁止函数标识符与其调用之间的间隔
        "func-call-spacing": [0, "always"],
        // 要求函数名称与它们所分配的变量或属性的名称相匹配
        "func-name-matching": 2,
        // 强制使用命名的 function 表达式
        "func-names": 0,
        // 强制一致地使用函数声明或函数表达式，方法定义风格，参数：
        // declaration: 强制使用方法声明的方式，function f(){} e.g [2, 'declaration']
        // expression：强制使用方法表达式的方式，var f = function() {} e.g [2, 'expression']
        // allowArrowFunctions: declaration风格中允许箭头函数。 e.g [2, 'declaration', { 'allowArrowFunctions': true }]
        "func-style": 0,
        // 在函数括号内强制执行一致的换行符
        "function-paren-newline": 0,
        // 强制 generator 函数中 * 号周围使用一致的空格
        "generator-star-spacing": [2, { before: true, after: true }],
        // 强制在 getter 属性中出现一个 return 语句。每个 getter 都期望有返回值。
        "getter-return": 2,
        // 要求 require() 出现在顶层模块作用域中
        "global-require": 1,
        // 要求 for-in 循环中有一个 if 语句
        "guard-for-in": 1,
        // 要求回调函数中有容错处理
        "handle-callback-err": [2, "^(err|error)$"],
        // 禁止使用指定的标识符
        "id-blacklist": 0,
        // 强制标识符的最新和最大长度
        "id-length": 0,
        // 要求标识符匹配一个指定的正则表达式
        "id-match": 0,
        // 强制执行箭头函数体的位置,一个箭头函数体可以包含一个隐式返回，而不是一个块体。对隐式返回的表达式执行一致的位置可能很有用。
        "implicit-arrow-linebreak": 0,
        // 要求或禁止 var 声明中的初始化(初值)
        "init-declarations": 2,
        // 强制在 JSX 属性中一致地使用双引号或单引号
        "jsx-quotes": 2,
        // 强制在对象字面量的属性中键和值之间使用一致的间距
        // 'key-spacing': [2, {'beforeColon': false,'afterColon': true}],
        // 强制在关键字前后使用一致的空格 (前后腰需要)
        // 'keyword-spacing': [2, {'beforeColon': true, 'afterColon': true}],
        // 行注释可以位于代码上方或旁边。该规则有助于团队保持一致的风格。
        "line-comment-position": 0,
        // 强制使用一致的换行风格
        "linebreak-style": 0,
        // 要求在注释周围有空行 ( 要求在块级注释之前有一空行)
        "lines-around-comment": 0,
        // 这条规则要求或禁止围绕指令序言的空白换行符。此规则不强制执行有关各个指令之间空白换行符的任何约定。另外，它不需要在指令序言前留出空行，除非它们之前有评论。如果这是您想强制执行的样式，请使用填充块规则。
        "lines-around-directive": 0,
        // 要求或禁止class成员之间的空行
        "lines-between-class-members": 2,
        // 强制执行嵌套块的最大深度，以降低代码复杂度。"max"（默认为4)
        "max-depth": [2, 6],
        // 强制一行的最大长度
        "max-len": [1, 200, { ignoreTemplateLiterals: true }],
        // 强制最大行数
        "max-lines": 0,
        // 强制回调函数最大嵌套深度 5层
        "max-nested-callbacks": [2, 5],
        // 强制 function 定义中最多允许的参数数量
        "max-params": [2, 4],
        // 强制 function 块最多允许的的语句数量
        "max-statements": [2, 200],
        // 强制每一行中所允许的最大语句数量
        "max-statements-per-line": 2,
        // 强化多行评论的特定风格。
        "multiline-comment-style": 0,
        // 强制或禁止三元表达式的操作数之间的换行符
        "multiline-ternary": 0,
        // 要求构造函数首字母大写 （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
        "new-cap": 0,
        // 要求调用无参构造函数时有圆括号
        "new-parens": 0,
        // 要求或禁止 var 声明语句后有一行空行
        "newline-after-var": 0,
        // 要求 return 语句之前有一空行
        "newline-before-return": 0,
        // 要求方法链中每个调用都有一个换行符
        "newline-per-chained-call": 0,
        // 禁用 alert、confirm 和 prompt
        "no-alert": 2,
        // 禁止使用 Array 构造函数
        "no-array-constructor": 0,
        // 不允许await在循环体内使用。
        "no-await-in-loop": 0,
        // 禁用按位运算符
        "no-bitwise": 1,
        // 不允许调用和构造Buffer()构造函数。
        "no-buffer-constructor": 0,
        // 禁用 arguments.caller 或 arguments.callee
        "no-caller": 2,
        // 不允许在 case 子句中使用词法声明
        "no-case-declarations": 0,
        // 不允许 catch 子句的参数与外层作用域中的变量同名
        "no-catch-shadow": 2,
        // 禁止修改类声明的变量
        "no-class-assign": 2,
        // 检测对象文字中的尾随逗号。因此，只要遇到对象字面上的尾随逗号，就会发出警告。
        // 'no-comma-dangle': 2,
        // 针对试图与-0进行比较的代码发出警告，因为这不会按预期工作。也就是说，像x === -0这样的代码将通过+0和-0。作者可能打算 Object.is（x，-0）。
        "no-compare-neg-zero": 2,
        // 禁止条件表达式中出现赋值操作符
        "no-cond-assign": 2,
        // 不允许箭头功能，在那里他们可以混淆的比较
        "no-confusing-arrow": 0,
        // 禁止修改 const 声明的变量
        "no-const-assign": 2,
        // 禁止在条件中使用常量表达式
        // if (false) {
        // doSomethingUnfinished();
        // } //cuowu
        "no-constant-condition": 2,
        // 禁用 continue 语句
        "no-continue": 0,
        // 禁止在正则表达式中使用控制字符 ：new RegExp('\x1f')
        "no-control-regex": 0,
        // 禁止删除变量
        "no-delete-var": 2,
        // 禁止除法操作符显式的出现在正则表达式开始的位置
        "no-div-regex": 1,
        // 禁止 function 定义中出现重名参数
        "no-dupe-args": 2,
        // 禁止类成员中出现重复的名称
        "no-dupe-class-members": 2,
        // 禁止对象字面量中出现重复的 key
        "no-dupe-keys": 2,
        // 禁止重复的 case 标签
        "no-duplicate-case": 2,
        // 不允许复制模块的进口
        "no-duplicate-imports": 2,
        // 禁止 if 语句中有 return 之后有 else
        "no-else-return": 0,
        // 禁止空语句块
        "no-empty": 2,
        // 禁止在正则表达式中使用空字符集 (/^abc[]/)
        "no-empty-character-class": 2,
        // 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。
        "no-empty-function": 0,
        // 禁止使用空解构模式no-empty-pattern
        "no-empty-pattern": 2,
        // 禁止在没有类型检查操作符的情况下与 null 进行比较
        "no-eq-null": 2,
        // 禁用 eval()
        "no-eval": 2,
        // 禁止对 catch 子句的参数重新赋值
        "no-ex-assign": 2,
        // 禁止扩展原生类型
        "no-extend-native": 0,
        // 禁止不必要的 .bind() 调用
        "no-extra-bind": 0,
        // 禁止不必要的布尔转换
        "no-extra-boolean-cast": 1,
        // 禁用不必要的标签
        "no-extra-label: ": 0,
        // 禁止不必要的括号 //(a * b) + c;//报错
        "no-extra-parens": 0,
        // 禁止不必要的分号
        "no-extra-semi": 0,
        // 禁止 case 语句落空
        "no-fallthrough": 0,
        // 禁止数字字面量中使用前导和末尾小数点
        "no-floating-decimal": 2,
        // 禁止对 function 声明重新赋值
        "no-func-assign": 2,
        // 此规则不允许修改只读全局变量。
        "no-global-assign": 2,
        // 禁止使用短符号进行类型转换(!!fOO)
        "no-implicit-coercion": 2,
        // 禁止在全局范围内使用 var 和命名的 function 声明
        "no-implicit-globals": 0,
        // 禁止使用类似 eval() 的方法
        "no-implied-eval": 2,
        // 禁止在代码行后使用内联注释
        "no-inline-comments": 0,
        // 禁止在嵌套的块中出现 function 或 var 声明
        "no-inner-declarations": [2, "both"],
        // 禁止 RegExp 构造函数中无效的正则表达式字符串
        "no-invalid-regexp": 2,
        // 禁止 this 关键字出现在类和类对象之外
        "no-invalid-this": 0,
        // 禁止在字符串和注释之外不规则的空白
        "no-irregular-whitespace": 2,
        // 禁用 __iterator__ 属性
        "no-iterator": 2,
        // 不允许标签与变量同名
        "no-label-var": 2,
        // 禁用标签语句
        "no-labels": 2,
        // 禁用不必要的嵌套块
        "no-lone-blocks": 2,
        // 禁止 if 作为唯一的语句出现在 else 语句中
        "no-lonely-if": 2,
        // 禁止在循环中出现 function 声明和表达式
        "no-loop-func": 1,
        // 禁用魔术数字(3.14什么的用常量代替)
        "no-magic-numbers": 0,
        // 禁止混合使用不同的操作符
        "no-mixed-operators": 2,
        // 禁止混合常规 var 声明和 require 调用
        "no-mixed-requires": 1,
        // 不允许空格和 tab 混合缩进
        "no-mixed-spaces-and-tabs": 2,
        // 不允许在单个语句中使用多个分配。a = b = c = d;
        "no-multi-assign": 2,
        // 禁止使用多个空格
        "no-multi-spaces": 2,
        // 禁止使用多行字符串，在 JavaScript 中，可以在新行之前使用斜线创建多行字符串
        "no-multi-str": 0,
        // 不允许多个空行
        "no-multiple-empty-lines": [2, { max: 2 }],
        // 不允许否定的表达式
        "no-negated-condition": 0,
        // 禁止在 in 表达式中出现否定的左操作数
        "no-negated-in-lhs": 0,
        // 不允许使用嵌套的三元表达式 var foo = bar ? baz : qux === quxx ? bing : bam;
        "no-nested-ternary": 1,
        // 禁止在非赋值或条件语句中使用 new 操作符
        "no-new": 1,
        // 禁止对 Function 对象使用 new 操作符
        "no-new-func": 1,
        // 禁止使用 Object 的构造函数
        "no-new-object": 0,
        // 禁止调用 require 时使用 new 操作符
        "no-new-require": 2,
        // 禁止 Symbol 的构造函数
        "no-new-symbol": 1,
        // 禁止对 String，Number 和 Boolean 使用 new 操作符
        "no-new-wrappers": 0,
        // 禁止把全局对象 (Math 和 JSON) 作为函数调用 错误：var math = Math();
        "no-obj-calls": 2,
        // 禁用八进制字面量
        "no-octal": 2,
        // 禁止在字符串中使用八进制转义序列
        "no-octal-escape": 2,
        // 不允许对 function 的参数进行重新赋值
        // 'no-param-reassign': 2,
        // 禁止对 __dirname 和 __filename进行字符串连接
        "no-path-concat": 0,
        // 禁止使用一元操作符 ++ 和 --
        // 'no-plusplus': 0,
        // 禁用 process.env
        "no-process-env": 1,
        // 禁用 process.exit()
        "no-process-exit": 1,
        // 禁用 __proto__ 属性
        "no-proto": 0,
        // 禁止直接使用 Object.prototypes 的内置属性
        "no-prototype-builtins": 0,
        // 禁止使用 var 多次声明同一变量
        "no-redeclare": 2,
        // 禁止正则表达式字面量中出现多个空格
        "no-regex-spaces": 1,
        // 禁用特定的全局变量
        "no-restricted-globals": 0,
        // 允许指定模块加载时的进口
        "no-restricted-imports": 0,
        // 允许你指定你不想在你的应用程序中使用的模块。
        "no-restricted-modules": 0,
        // 对象上的某些属性可能在代码库中被禁止。这对于取消API或限制模块方法的使用很有用。例如，您可能希望使用不允许describe.only使用摩卡或者告诉人们使用时Object.assign代替_.extend。
        "no-restricted-properties": 0,
        // 禁止使用特定的语法
        "no-restricted-syntax": 0,
        // 禁用指定的通过 require 加载的模块
        "no-return-assign": 0,
        // 禁止 return await ；这个规则旨在防止由于缺乏对async function语义的理解而导致的可能的常见性能危害。
        "no-return-await": 2,
        // 禁止使用 javascript: url
        "no-script-url": 0,
        // 禁止自我赋值
        "no-self-assign": 2,
        // 禁止自身比较
        "no-self-compare": 2,
        // 禁用逗号操作符
        "no-sequences": 2,
        // 禁止 var 声明 与外层作用域的变量同名
        "no-shadow": 0,
        // 禁止覆盖受限制的标识符
        "no-shadow-restricted-names": 2,
        // 禁用稀疏数组
        "no-sparse-arrays": 2,
        // 禁用同步方法
        "no-sync": 0,
        // 不允许使用制表符
        "no-tabs": 2,
        // 警告常规字符串包含看起来像模板字面占位符的内容。"Hello ${name}!";
        "no-template-curly-in-string": 0,
        // 不允许使用三元操作符
        "no-ternary": 0,
        // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
        "no-this-before-super": 2,
        // 禁止抛出非异常字面量
        "no-throw-literal": 2,
        // 禁用行尾空格
        "no-trailing-spaces": 2,
        // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        "no-undef": 2,
        // 禁止将变量初始化为 undefined
        "no-undef-init": 2,
        // 禁止将 undefined 作为标识符
        "no-undefined": 0,
        // 禁止标识符中有悬空下划线_bar
        "no-underscore-dangle": 0,
        // 禁止出现令人困惑的多行表达式
        "no-unexpected-multiline": 0,
        // 禁用一成不变的循环条件
        "no-unmodified-loop-condition": 2,
        // 禁止可以在有更简单的可替代的表达式时使用三元操作符
        "no-unneeded-ternary": 0,
        // 禁止在return、throw、continue 和 break语句之后出现不可达代码
        /*
        function foo() {
        return true;
        console.log('done');
        }//错误
        */
        "no-unreachable": 2,
        // 禁止在 finally 语句块中出现控制流语句
        "no-unsafe-finally": 0,
        // 不允许否定关系运算符的左操作数 disallow negating the left operand of relational operators
        "no-unsafe-negation": 2,
        // 禁止出现未使用过的表达式
        "no-unused-expressions": 2,
        // 禁用未使用过的标签
        "no-unused-labels": 2,
        // 禁止出现未使用过的变量
        "no-unused-vars": 2,
        // 不允许在变量定义之前使用它们
        "no-use-before-define": 2,
        // 禁止不必要的 .call() 和 .apply()
        "no-useless-call": 2,
        // 禁止不必要的计算性能键对象的文字
        "no-useless-computed-key": 2,
        // 禁止不必要的字符串字面量或模板字面量的连接
        "no-useless-concat": 2,
        // ES2015 会提供默认的类构造函数。因此，没有必要提供一个空构造函数或一个简单地委托给它的父类的构造函数，
        "no-useless-constructor": 2,
        // 禁用不必要的转义字符
        "no-useless-escape": 0,
        // 不允许将导入、导出和解构分配重命名为相同的名称。
        "no-useless-rename": 2,
        // 多余的return语句。
        "no-useless-return": 2,
        // 要求使用 let 或 const 而不是 var
        "no-var": 2,
        // 禁用 void 操作符
        "no-void": 2,
        // 禁止在注释中使用特定的警告术语
        "no-warning-comments": 0,
        // 禁止属性前有空白
        "no-whitespace-before-property": 2,
        // 禁用 with 语句
        "no-with": 1,
        // 当写if，else，while，do-while，和for语句，身体部分可以是单个语句而不是块。为这些单一语句强制执行一个一致的位置会很有用。
        "nonblock-statement-body-position": 1,
        // 强制花括号内换行符的一致性
        "object-curly-newline": 0,
        // 强制在花括号中使用一致的空格
        // 'object-curly-spacing': 2,
        // 强制将对象的属性放在不同的行上
        "object-property-newline": 0,
        // 要求或禁止对象字面量中方法和属性使用简写语法
        "object-shorthand": 2,
        // 强制函数中的变量要么一起声明要么分开声明
        "one-var": 0,
        // 要求或禁止在 var 声明周围换行
        "one-var-declaration-per-line": 0,
        // 要求或禁止在可能的情况下要求使用简化的赋值操作符
        "operator-assignment": 0,
        // 强制操作符使用一致的换行符
        "operator-linebreak": 0,
        // 要求或禁止块内填充
        "padded-blocks": 0,
        // 所有return语句之前需要空行，如换行前换行符规则。
        "padding-line-between-statements": 0,
        // 要求使用箭头函数作为回调
        "prefer-arrow-callback": 0,
        // 要求使用 const 声明那些声明后不再被修改的变量
        "prefer-const": 2,
        // 采用两组配置对象。第一个对象参数决定了规则适用的解构类型
        // 'prefer-destructuring': 0,
        // 允许数组通过下标取值
        "prefer-destructuring": ["error", { object: true, array: false }],
        // 禁止调用parseInt()或Number.parseInt()使用两个参数调用：一个字符串; 和2（二进制），8（八进制）或16（十六进制）的基数选项。
        "prefer-numeric-literals": 2,
        // 确保承诺只被Error对象拒绝。
        "prefer-promise-reject-errors": 0,
        // 要求在合适的地方使用 Reflect 方法
        "prefer-reflect": 0,
        // Suggest using the rest parameters instead of arguments
        "prefer-rest-params": 2,
        // 要求使用扩展运算符而非 .apply()
        "prefer-spread": 2,
        // 要求使用模板字面量而非字符串连接
        "prefer-template": 1,
        // 要求对象字面量属性名称用引号括起来
        "quote-props": 0,
        // 强制使用一致的反勾号、双引号或单引号
        quotes: 0,
        // 强制在parseInt()使用基数参数
        radix: 0,
        // 异步函数必须具有await表达式
        "require-await": 2,
        // 要求使用 JSDoc 注释
        "require-jsdoc": 0,
        // 要求generator 函数内有 yield
        "require-yield": 2,
        // enforce spacing between rest and spread operators and their expressions
        "rest-spread-spacing": 0,
        // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
        semi: 0,
        // 强制分号之前和之后使用一致的空格
        "semi-spacing": 0,
        // 强制分号位于配置的位置。
        "semi-style": 0,
        // 强制模块内的 import 排序
        "sort-imports": 0,
        // 所有属性定义并验证所有变量是按字母顺序排序的。
        "sort-keys": 0,
        // 要求同一个声明块中的变量按顺序排列
        "sort-vars": 0,
        // 强制在块之前使用一致的空格
        "space-before-blocks": [2, "always"],
        // 强制在 function的左括号之前使用一致的空格
        "space-before-function-paren": [2, "always"],
        // 强制在圆括号内使用一致的空格
        "space-in-parens": [2, "never"],
        // 要求操作符周围有空格
        "space-infix-ops": 2,
        // 强制在一元操作符前后使用一致的空格
        "space-unary-ops": 2,
        // 强制在注释中 // 或 /* 使用一致的空格
        "spaced-comment": 0,
        // 要求或禁止使用严格模式指令
        strict: 0,
        // switch语句内的空格
        "switch-colon-spacing": 2,
        // var foo = Symbol("some description"); 一定要有描述
        "symbol-description": 2,
        // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
        "template-curly-spacing": [2, "never"],
        // 模板标签函数与其模板文字之间是否有空格
        "template-tag-spacing": 0,
        // 要求或禁止 Unicode BOM
        "unicode-bom": 0,
        // 不允许比较'NaN'。判断数字是否是NaN，得用isNaN
        "use-isnan": 2,
        // 强制使用有效的 JSDoc 注释
        "valid-jsdoc": 0,
        // 强制 typeof 表达式与有效的字符串进行比较
        // typeof foo === 'undefimed' 错误
        "valid-typeof": 2,
        // 要求所有的 var 声明出现在它们所在的作用域顶部
        "vars-on-top": 2,
        // 要求 IIFE 使用括号括起来
        "wrap-iife": 0,
        // 要求正则表达式被括号括起来
        "wrap-regex": 0,
        // 强制在 yield* 表达式中 * 周围使用空格
        "yield-star-spacing": 2,
        // 要求或禁止 “Yoda” 条件
        yoda: 0,
    },
    overrides: [
        {
            files: ["*.vue"],
            rules: {
                // 这里写覆盖vue文件的规则
            },
        },
    ],
};
