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

针对 gridsome 依赖 sharp，安装过慢的问题，可通过使用淘宝镜像方式解决。

```shell
npm config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp"

npm config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips"
```

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

### template

> [template](https://gridsome.org/docs/templates/)：template 使用说明

集合中的数据，可以通过单独的页面来进行展示。

```js
// gridsome.config.js
module.exports = {
  templates: {
    Post: [
      {
        path: '/blog/:year/:month/:title',
        component: './src/other/location/Post.vue'
      }
    ]
  }
}
```

通过在 `gridsome.config.js` 配置文件中，制定组件的方式，来对集合中的每条数据进行渲染。

## strapi

> [strapi](https://strapi.io/)：一个可以简单、快速、自动生成安全可靠后端 api 的框架。

### 安装

> [Quick Start Guide](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html)

通过以下命令，可快速创建一个 `strapi` 项目。

```shell
yarn create strapi-app my-project --quickstart
```

### 数据接口

> [Content API](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html)：数据接口使用。

在创建相应的集合类型或者单一类型后，`strapi` 会默认生成一系列接口，供调用。在 `角色和权限` 对集合类型进行权限的设置后，我们就可对数据进行查询，新增，删除，更新等操作。

### Tip

1. 在添加完集合类型后，需在 `角色和权限` 对集合类型进行对应的权限设置，不然将无法进行查询。
2. 使用单一类型时，建议使用查询集合的方式进行查询。

## 部署

### 切换 strapi 数据库

> [strapi 更改数据库](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#database)

`strapi` 默认使用 `sqlite`（以本地文件方式存储数据） 来进行数据的存储。此处我们将其切换为 `mysql`。

1. 在 `/config/database.js` 下，修改数据库配置为 `mysql`:

   ```js
   module.exports = ({ env }) => ({
     defaultConnection: "default",
     connections: {
       default: {
         connector: "bookshelf",
         settings: {
           client: "mysql",
           host: env("DATABASE_HOST", "localhost"),
           port: env.int("DATABASE_PORT", 3306),
           database: env("DATABASE_NAME", "blog"),
           username: env("DATABASE_USERNAME", "strapi"),
           password: env("DATABASE_PASSWORD", "strapi"),
         },
         options: {},
       },
     },
   });
   ```

2. 增加 `mysql` 依赖：

   ```shell
   yarn add mysql
   ```


### 部署 strapi

1. 将代码上传至服务器上。

2. 运行以下命令，使用 `pm2` 运行 `strapi`。

   ```shell
   pm2 start "yarn start" --name blog-backend
   ```

### 部署 gridsome

> [vercel](https://vercel.com/)：网站托管服务。

此项目中，使用 `vercel` 对 `gridsome` 进行托管。

1. 修改 `.env` 文件中，后端地址。（可使用 `.env.production` 与 `.env.development` 将开发环境与生产环境进行区分）
2. 推送到 `git` 仓库。
3. 在 `vercel` 中，引入 `git` 仓库，并进行部署。

### 自动部署

在 `vercel` 中，可通过 `Deploy Hooks` 的方式，当 `strapi` 中数据发生变化时，自动进行构建。

1. 在 `vercel` 下项目的 `Settings` 找到 `Deploy Hooks` ，通过 `Create Hook` 生成对应接口。
2. 在 `strapi` 设置只能找到 `Webhooks`，将上方的接口地址填入。
3. 此时当 `strapi` 中，数据发生变化时，就会触发 `vercel`  的重新部署。

## 参考链接

1. [Gridsome](https://gridsome.org/)
2. [strapi](https://strapi.io/)
