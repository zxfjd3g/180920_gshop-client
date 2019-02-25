# day01
## 1. 项目开发准备
    项目描述
    技术选型
    API接口

## 2. 开启项目开发
    使用脚手架创建项目
    安装所有依赖/指定依赖
    开发环境运行
    生产环境打包与发布

## 3. 搭建项目整体界面结构
    stylus的理解和使用
        结构化, 变量, 函数/minxin(混合)
    vue-router的理解和使用
        $router: 路由器对象, 包含一些操作路由的功能函数, 来实现编程式导航(跳转路由)
        $route: 当前路由对象, 一些当前路由信息数据的容器, path/meta/query/params
    项目路由拆分
        确定路由组件显示的区域
        确定路由是几级路由
    底部导航组件: FooterGuide
    导航路由组件: MSite/Search/Order/Profile
    
## 4. 抽取头部组件: Header, 
    通过props向组件传递数据
    通过slot向组件传递标签
    
    
# day02

## 1. 抽取商家列表组件: ShopList

## 2. 登陆/注册的路由组件: Login
    FooterGuide的显示/隐藏: 通过路由的meta
    
## 3. 启动后台应用并测试
    运行后台项目(启动mongodb服务), 
    使用postman测试后台接口, 如果不一致, 修改接口文档
    
## 4. 异步显示数据
    封装ajax: 
        promise+axios封装ajax请求的函数
        封装每个接口对应的请求函数(能根据接口定义ajax请求函数)
        解决ajax的跨越域问题: 配置代理, 对代理的理解
    vuex编码
        创建所有相关的模块: store/index|state|mutations|actions|getters|mutation-types
        设计state: 从后台获取的数据
        实现actions: 
            定义异步action: async/await
            流程:　发ajax获取数据, commit给mutation
        实现mutations: 给状态赋值
        实现index: 创建store对象
        main.js: 配置store
    组件异步显示数据
        在mounted()通过$store.dispatch('actionName')来异步获取后台数据到state中
        mapState(['xxx'])读取state中数据到组件中
        在模板中显示xxx的数据

## 5. Star组件
    创建组件, 设计组件的props
    使用组件标签, 并传入相应的标签属性
    完成组件编码: 使用计算属性
    
## 6. 异步显示分类轮播
    通过vuex获取categorys数组(发请求, 读取)
    对数据进行整合一计算(维变为特定的二维数组)
    使用Swiper显示轮播, 如何在界面更新之后创建Swiper对象?
        1). 使用watch+$nextTick( () =>{界面更新之后立即执行})
        2). 使用回调+$nextTick()	
    使用svg图片实现loading的效果

# day03


