module.exports = {
    // 与 IDEA 默认右侧边距 (Hard wrap at) 保持一致：120 字符
    printWidth: 120,
    // 与 IDEA 默认缩进保持一致：4 个空格
    tabWidth: 4,
    // 不使用 Tab 缩进符，使用空格
    useTabs: false,
    // 行尾保留分号（IDEA 默认）
    semi: true,
    // JS/TS 使用单引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // JSX 使用双引号（IDEA 默认）
    jsxSingleQuote: false,
    // 多行对象/数组尾随逗号（兼容 ES5）
    trailingComma: 'es5',
    // 大括号内的首尾不加空格（IDEA 默认：import {a} from 'b'、{margin: 0}）
    bracketSpacing: false,
    // JSX 标签的反尖括号换行
    bracketSameLine: false,
    // 箭头函数参数括号
    arrowParens: 'always',
    // 格式化整个文件
    rangeStart: 0,
    rangeEnd: Infinity,
    requirePragma: false,
    insertPragma: false,
    proseWrap: 'preserve',
    htmlWhitespaceSensitivity: 'css',
    // 自动保持现有的换行符（兼容 Windows CRLF 与 Mac/Linux LF）
    endOfLine: 'auto',
    // 对 JSON / YAML 等配置文件保持 2 空格缩进
    overrides: [
        {
            files: ['*.json', '*.yml', '*.yaml'],
            options: {
                tabWidth: 2,
            },
        },
    ],
}
