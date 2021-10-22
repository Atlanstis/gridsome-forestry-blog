# Gridsome-Blog

使用 Gridsome 及 strapi 搭建可配置的博客。

## Gridsome

> [Gridsome](https://gridsome.org/)：Gridsome 是一个免费、开源、基于 Vue.js 构建的框架。

### 初始化项目

> [Install](https://gridsome.org/docs/#how-to-install)

1. 安装 Gridsome CLI 工具

   ```shell
   yarn global add @gridsome/cli
   ```

2. 创建 Gridsome 项目

   1. 使用 `gridsome create my-gridsome-site` 命令，初始化项目。
   2. `cd my-gridsome-site` 命令，进入项目目录。
   3. 使用 `gridsome develop` 命令，以开发模式运行 gridsome。

### graphql

项目启动后，未更改启动端口时，可通过 http://localhost:8080/___explore 进行 graphql 的查询。

### 环境变量设置

> [环境变量](https://gridsome.org/docs/environment-variables/)

通过在根目录下新建 `.env` 文件进行配置。如需区分生产及开发环境，新建 `.env.production` 与 `.env.development` 文件即可。

```
GRIDSOME_API_URL=https://api.example.com
DB_USER=root
DB_PASS=s1mpl3
```

之后，通过 `process.env.{name}` 进行访问。

#### Tip

1. 在客户端代码使用时，`{name}` 必须以 `GRIDSOME_` 开头。

### 与 strapi 连接

> [Plugin-@gridsome/source-strapi](https://gridsome.org/plugins/@gridsome/source-strapi)：`@gridsome/source-strapi` 使用。
>
> [查询数据](https://gridsome.org/docs/querying-data/)：如何查询 graphql，并将数据渲染到页面。

通过插件 `@gridsome/source-strapi` 我们可以从 strapi 中读取数据，并通过 graphql 进行数据的查询。

## strapi

> [strapi](https://strapi.io/)：一个可以简单、快速、自动生成安全可靠后端 api 的框架。

### 安装

> [Quick Start Guide](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html)

通过以下命令，可快速创建一个 `strapi` 项目。

```shell
yarn create strapi-app my-project --quickstart
```

### Tip

1. 在添加完集合类型后，需在 `角色和权限` 对集合类型进行对应的权限设置，不然将无法进行查询。

## 参考链接

1. [Gridsome](https://gridsome.org/)
2. [strapi](https://strapi.io/)
