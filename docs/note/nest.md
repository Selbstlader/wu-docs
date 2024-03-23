---
prev:
   text: 'React'
   link: '/note/react'
next:
   text: 'Mysql'
   link: '/note/mysql'
---

# Nestjs

## 起步

```bash
// 创建项目
npm i -g @nestjs/cli
nest new project-name
// 快速创建模块
nest -h
nest g res module/Co
```

## 控制器

### 路由

```ts
import { Controller, Get } from '@nestjs/common';
import { CoService } from './co.service';

@Controller('co')
export class CoController {
  constructor(private readonly coService: CoService) {}

  // GET /co
  @Get()
  // 路由与处理函数命名无关
  getHello(): string {
    // 当请求返回一个 JavaScript 对象或者数组时，他将自动序列化为 JSON
    // 返回类型为基本类型（string、number、boolean），nest 只发送值
    return 'hello';
  }
  
  // Nest 会检测程序使用 @Res 和 @Next，表明你选择了特定的库。
  // 如果在一个处理函数上同时使用了这两个方法，那么此处的标准方式就是自动禁用此路由, 你将不会得到你想要的结果。
  // 如果你在处理函数上使用这两种方法，必须将装饰器 @Res({ passthrough: true }) 中将 passthrough 选项设为 true。
  @Get('res')
  getHelloRes(@Res({ passthrough: true }) res: Response) {
    // res.status(200).send('123');
    console.log(res);
    return '456';
  }

  @Get('req')
  // @Req 获取请求对象
  getReqInfo(@Req() req: Request) {
    console.log(req);
    return 'req';
  }
}
```

**Nest 提供许多装饰器及其代表的底层对象**

| 方法                    | 代表对象                      |
| ----------------------- | ----------------------------- |
| @Request(), @Req()      | req                           |
| @Response, @Res()       | res                           |
| @Next()                 | next                          |
| @Session()              | req.session                   |
| @Param(Key?: string)    | req.params/req.params[key]    |
| @Body(Key?: string)     | req.body/req.body[key]        |
| @Query(Key?: string)    | req.query/req.query[key]      |
| @Headers(Name?: string) | req.headers/req.headers[name] |
| @Ip()                   | req.ip                        |
| @HostParam()            | req.hosts                     |

### 资源

 Nest 为所有标准的 HTTP 方法提供了相应的装饰器：`@Get()`、`@Post()`、 `@Put()`、`@Delete()`、`@Patch()`、`@Options()`、以及 `@Head()`。此外，`@All()` 则用于定义一个用于处理所有 HTTP 请求方法的处理程序。

### 路由通配符

```ts
// 路由同样支持模式匹配。例如，星号被用作通配符，将匹配任何字符组合。
@Get('ab*cd')
getUrl(@Req() req: Request) {
	return req.url;
}
```

### 状态码

```ts
// 通常状态码并不是固定的，而是取决于各种因素。
@Get('code')
@HttpCode(204)
getCode(@Req() req: Request) {
    console.log(req);
    return 'req';
}
```

### Headers

```ts
// 自定义响应头
@Get('header')
@Header('name', 'fwb')
getHeader(@Res() res: Response) {
    console.log(res.headers);
    return 'req';
}
```

### 重定向

```ts
// 将响应重定向到特定的 URL
@Get('redirect')
// @Redirect() 装饰器有两个参数，url 和 statusCode，省略 statusCode 默认为 302
@Redirect('https://docs.nestjs.com', 302)
getRedirect() {
    return 'redirect';
}
```

### 路由参数

接受**动态数据** 作为请求的一部分 `(GET /co/1)` 来获取 `id` 为 `1` 的值，可以在路由路径中添加路由参数 **标记(token)**来获取动态值。

```ts
@Get(':id')
getParams(@Param('id') id: string) {
    return 'id is ' + id;
}
```

### 子路由

`@Controller` 装饰器可以接受一个 `host` 选项，以要求传入请求的 `HTTP` 主机匹配某个特定值。

**Fastify 缺乏对嵌套路由的支持，不支持子路由**

### 异步性

Nest 完美支持**异步函数**，每个异步函数都必须返回一个`Promise`，Nest 会自行进行解析。

```ts
@Get()
async findAll(): Promise<any[]> {
  return [];
}
```

Nest 也可以返回 RxJS `observable 流`。

```ts
// TODO: 暂时不明白这个 RxJS
@Get()
findAll(): Observable<any[]> {
  return of([]);
}
```

### 负载请求

我们可以定义一个`DTO`，来作为对数据结构的规则，它是一个对象。可以使用 TypeScript 接口或者 ES6 类。**建议使用ES6 类，因为接口在编译时会被抹去。**

```ts
// co.dto.ts
export class CreateCoDto {
    readonly name: string;
    readonly age: number;
}

// co.controller.ts
@Post()
setCo(@Body() body: CreateCoDto) {
    return 'my name is ' + body.name;
}
```

## 提供者

### 服务

控制器处理 HTTP 请求，应将开发逻辑交于提供者 `(providers)`。`Prociders` 是一个纯粹的 `JavaScript` 类，在其类声明之前带有 `@Injectable()` 装饰器。

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoService {}
```

```ts
// co.service.ts
import { Injectable } from '@nestjs/common';
import { CreateCoDto } from './co.dto';

@Injectable()
export class CoService {
  private readonly Co: CreateCoDto[] = [];

  create(co: CreateCoDto) {
    this.Co.push(co);
  }

  findAll() {
    return this.Co;
  }
}

// co.controller.ts
import { Body, Controller ,Get, Post } from '@nestjs/common';
import { CoService } from './co.service';
import { CreateCoDto } from './co.dto';

@Controller('co')
export class CoController {
  // coService 是通过类构造函数注入，使用只读。这意味着我们已经在同一位置创建并初始化了 coService 成员。
  constructor(private readonly coService: CoService) {}

  @Post()
  setCo(@Body() createCoDto: CreateCoDto) {
    this.coService.create(createCoDto);
    return 'ok';
  }

  @Get('all')
  getCoAll() {
    return this.coService.findAll();
  }
}
```

### 依赖注入

`Nest` 将 `coService` 通过创建并返回一个实例来解析 CoService`（或者，在单例的正常情况下，如果现有实例已在其他地方请求，则返回现有实例）。解析此依赖关系并将其传递给控制器的构造函数（或分配给指定的属性）：

```ts
constructor(private readonly coService: CoService) {}
```

### 作用域（TODO：不懂）

Provider 通常具有与应用程序生命周期同步的生命周期("作用域")。在启动应用程序时，必须解析每个依赖项，因此必须实例化每个提供者。同样，应用程序关闭时，每个 provider 都将被销毁。但是有一些方法可以改变 provider 的生命周期。 

### 可选提供者

TODO: 没懂，应该是可以选择性的注入依赖。

```ts
import { Inject, Injectable, Optional } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private readonly HttpService: T) {}
}
```

`HttpService` 类可接受一个泛型参数 `T`，用于表示注入的 HTTP 客户端的类型。构造函数中使用了 `@Optional()` 装饰器来标记 HTTP 客户端为可选的，使用 `@Inject('HTTP_OPTIONS')` 装饰器来注入标记为 `'HTTP_OPTIONS'` 的依赖，这可以用于传递 HTTP 客户端的配置选项。

### 属性注入

```ts
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```

如果顶级类依赖于一个或多个 providers，那么通过从构造函数中调用子类中的 `super()` 来传递它们就会非常烦人了。因此，为了避免出现这种情况，可以在属性上使用 `@Inject()` 装饰器。

## 模块

模块是具有 `@module` 的装饰器的类。`@module()` 装饰器提供了元数据，Nest 用他来组织应用程序结构。

每个 Nest 应用至少要有一个模块，即**根模块**

`@module()` 装饰器接受一个描述模块属性的对象：

| name        | desc                                                         |
| ----------- | ------------------------------------------------------------ |
| providers   | 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享。 |
| controllers | 必须创建的一组控制器。                                       |
| imports     | 导入模块的列表，这些模块导出了此模块中所需的提供者。         |
| exports     | 由本模块提供并应用在其他模块中可用的提供者的子集。           |

### 共享模块

在 Nest 中每个模块都是一个单例，可以轻松的在多个模块之间使用同一个提供者的实例。

每一个模块都是**共享模块**。一旦被创建就能被任意模块使用。

### 模块导入/导出

```ts
import { Module } from '@nestjs/common';
import { MoService } from './mo.service';
import { MoController } from './mo.controller';
import { CoModule } from '../co/co.module';
import { CoService } from '../co/co.service';

@Module({
  imports: [CoModule], // 导入其他模块
  controllers: [MoController],
  providers: [MoService, CoService],
})
export class MoModule {}
```

在 `MoModule` 中导入 `CoModule` 作用：

1. 更加明确了各模块之间的关系。
2. 如果 `MoModule` 中使用了` CoService`，可以单独注入。但如果 ` CoService` 使用到了其他的 service 就需要继续注入。但如果使用 `imports` 导入，nest 就会自动帮你分析依赖关系，自动帮你引入。

### 依赖注入

提供者也可以注入到模块(类)中，（例如用于配置目的）：

```ts
import { Module } from '@nestjs/common';
import { CoService } from './co.service';
import { CoController } from './co.controller';

@Module({
  controllers: [CoController],
  providers: [CoService],
})
export class CoModule {
  constructor(private readonly coService: CoService) {}
}
```

但是，由于循环依赖性，模块类不能注入到提供者中。

### 全局模块

如果你的模块被多次相同的引用，可以注册为全局模块，这样就不用多次的 `imports` 导入。例如 helper、数据库连接。

`@Global` 装饰器使模块成为全局作用域。 全局模块应该只注册一次，最好由根或核心模块注册。

```ts
import { Module, Global } from '@nestjs/common';
import { CoService } from './co.service';
import { CoController } from './co.controller';

@Global
@Module({
  controllers: [CoController],
  providers: [CoService],
})
export class CoModule {
  constructor(private readonly coService: CoService) {}
}
```

### 动态模块

```ts
// 动态模块
import { DynamicModule, Module } from '@nestjs/common';
import { ConnectionProvider } from './connection.provider';
import { DatabaseProviders } from './database.providers';

@Module({
  providers: [ConnectionProvider],
})
export class DatabaseModule {
  static forRoot(entities: [], options?: any): DynamicModule {
    const providers = DatabaseProviders(entities, options);
    return {
      // 如果注册为全局模块
      global: true,
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}

// 注册动态模块
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
})
export class AppModule {}
```

## 中间件

中间件是在路由处理程序之前调用的函数。中间件函数可以访问请求和响应对象，以及应用程序请求响应周期中的 `next()` 中间件函数。 `next()` 中间件函数通常命名为 `next()` 的变量表示。

中间件功能：

- 执行任何代码
- 对请求和响应对象进行更改
- 结束请求-响应周期
- 调用堆栈中的下一个中间件函数
- 如果当前的中间件函数没有结束请求-响应周期，他必须调用 `next()` 将控制传递给下一个中间件函数。否则，请求将会被挂起

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```

### 依赖注入

`Nest` 中间件完全支持依赖注入。就像提供者和控制器一样，他们能够注入属于统一模块的依赖项

### 应用中间件

中间件不能在 `@Module()` 装饰器中列出。我们必须使用模块类的 `configure()` 的方法设置他们。包含中间件的模块必须实现 `NestModule` 接口。我们将 `LoggerMiddleware` 设置在 `AppModule` 层上。

```ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoModule } from './module/co/co.module';
import { MoModule } from './module/mo/mo.module';
import { DatabaseModule } from './module/database/database.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [CoModule, MoModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```

在配置中间件时将包含路由路径的对象和请求方法传递给 `forRoutes()` 方法。`forRoutes(mo/all)`，这样当我们请求路由 `mo/all` 时就会使用到中间件 `LoggerMiddleware`，当`forRoutes(*)` 时，每个路由都会被应用。

我们还可以通过 `forRoutes({ path: 'cats', method: RequestMethod.GET });` 限制请求的方法。

### 路由通配符

路由同样支持模式匹配。例如，星号被用作**通配符**，将匹配任何字符组合。

### 中间件消费者

`MiddlewareConsumer` 是一个帮助类。他提供了几种内置方法来管理中间件。他们都可以被简单的连接起来。`forRoutes()` 可以接受一个字符串、多个字符串、对象、一个控制器类甚至多个控制器类。在大多数情况下，您可能会传递一个由逗号分割的控制器类。

```ts
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes(MoController);
  }
}
```

**该 `apply()` 方法可以使用单个中间件，也可以使用多个参数来指定多个**中间件**。**

```ts
// exclude() 可以轻松的排除某些路由。可以采用一个字符串，多个字符串或一个 RouteInfo 对象来标识要排除的路由
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST },
    'cats/(.*)',
  )
```

### 函数中间件

`LoggerMiddleware` 类非常简单。它没有成员，没有额外的方法，没有依赖关系。因此可以简单的抽离成一个函数。

```ts
// 函数中间件
import { NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request...');
  next();
}
```

使用方法一致。

### 多个中间件

```ts
// 多个中间件使用逗号分隔
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```

### 全局中间件

将中间件注册到每一个路由中。

```ts
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

## 异常过滤器

内置的**异常层**负责处理整个应用程序中的所有抛出异常。当捕获到未处理异常时，最终用户将收到友好的响应。

开箱即用，此操作由内置的全局异常过滤器执行，该过滤器处理异常类型 `HttpException` (及其子类)的异常。每个发生的异常都由全局异常过滤器处理，当这个异常**无法识别**时(既不是 `HttpException` 也不是继承类 `HttpException`  )，用户将会收到一下响应。

```JSON
{
    "statusCode": 500,
    "message": "Internal server error"
}
```

### 基础异常类

`Nest` 提供了一个内置的 `HttpException` 类。对于典型的 `HttpException` `REST/GrapQL` API程序，最佳实践是在发生某些错误情况时发送的标准HTTP响应对象。

```ts
@Get()
async findAll() {
  // 传入一个 string 将会仅覆盖 message 内容
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

客户端响应

```JSON
{
    "statusCode": 403,
    "message": "Forbidden"
}
```

`HttpException` 的构造函数有两个必要的参数来决定响应：

- `response` 参数定义 `JSON` 响应体。它可以是 `string` 或 `object`，如下所述。
- `status ` 参数定义`HTTP` 。

默认情况下，`JSON` 响应主体包含两个属性：

- `statusCode`：默认为 `status` 参数中提供的 `Http` 状态码。
- `message`： 基于状态的 `HTTP` 错误简述。

仅覆盖 `JSON` 响应主体的消息部分，请在 `response` 参数中提供一个 `string`。

要覆盖整个 `JSON` 响应主体，请在 `response` 参数中传递一个 `object` 。 `Nest` 将序列化对象，并将其作为 `JSON` 响应返回。

参数 `status` 是有效的 `HTTP` 状态码。最佳方法是使用 `HttpStatus` 枚举引入。

```ts
@Get()
async findAll() {
  // 传入一个 object 将会仅覆盖整个响应主体
  @Get('all')
  getCoAll() {
    throw new HttpException(
      {
        code: HttpStatus.FORBIDDEN,
        error: 'Forbidden',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
```

客户端响应

```JSON
{
    "code": 403,
    "error": "Forbidden"
}
```

### 自定义异常

自定义异常可以创建自己的异常层次结构。自定义异常继承于 `HttpException` 基类。`Nest` 可以识别你的异常，并自动处理异常响应。

```ts
// 继承于 HttpException，实现一个自定义异常
import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('forbidden', HttpStatus.FORBIDDEN);
  }
}
```

```ts
// 使用自定义异常
@Get('all')
getCoAll() {
    throw new ForbiddenException();
}
```

### 内置HTTP异常

Nest 继承 `HttpException` 实现了许多异常。

- `BadRequestException`
- `UnauthorizedException`
- `NotFoundException`
- `ForbiddenException`
- `NotAcceptableException`
- `RequestTimeoutException`
- `ConflictException`
- `GoneException`
- `PayloadTooLargeException`
- `UnsupportedMediaTypeException`
- `UnprocessableException`
- `InternalServerErrorException`
- `NotImplementedException`
- `BadGatewayException`
- `ServiceUnavailableException`
- `GatewayTimeoutException`

### 异常过滤器

基本(内置)过滤器也可以解决许多问题，但有时候你希望对异常层有**完全控制权** ，例如，基于某些动态因素添加日志记录或使用不同的 `JSON` 模式。**异常过滤器** 正是可以解决整个问题，可以控制精确的控制流以及将响应的内容发送客户端。

创建一个异常过滤器，他负责捕获作为 `HttpException` 类实例的异常，并为他设置自定义响应逻辑。因此我们需要访问底层平台的 `Request` `Response`。我们将访问 `Request` 对象，以便提取原始 url 并将包含在日志信息中。我们将使用 `Response.json()` 方法，使用 `Response` 对象直接控制发送的响应。

```ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

**所有的异常过滤器都应该实现 `ExceptionFilter<T>` 接口。他需要你使用有效签名提供 `catch(exception: Exception, host: ArgumentsHost)` 方法。T表示异常的类型。**

`@Catch()` 装饰器绑定所需的元数据到异常过滤器上。他告诉 `Nest` 这个特定的过滤器正在寻找 `HttpException` 而不是其他的。`@Catch()` 可以传递多个参数，可以通过逗号分隔多个类型的异常设置过滤器。

### 参数主机

`catch()` 方法两个参数 `exception` 和 `host`。`exception` 参数是当前正在处理的异常对象。 `host` 参数是一个 `ArgumentsHost` 对象。 `ArgumentsHost`  是一个功能强大的应用程序对象。我们可以用他来回去 `response`  和 `request` 对象的引用，这些对象被传递给原始请求处理程序(在异常发生的控制器中)。`ArgumentsHost` 可以在所有上下文中使用。

### 绑定过滤器

```ts
@Get('all')
// 可以绑定多个过滤器，使用逗号分隔过滤器实例列表
// 仅针对 getCoAll() 单个路由程序
// 过滤器的控制范围可以分为方法范围，控制器范围或全局范围
// 这种方式属于方法范围
// @UseFilters(new HttpFilter())
@UseFilters(HttpFilter)
getCoAll() {
    throw new ForbiddenException();
}
```

```ts
// 控制器范围
@Controller('co')
@UseFilters(new HttpFilter())
export class CoController {
  constructor(private readonly coService: CoService) {}
}
```

```ts
// 全局范围 -- 全局过滤器
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpFilter());
  await app.listen(3000);
}
bootstrap();
```

全局过滤器用于整个应用程序、每个控制器和每个路由处理程序。

```ts
// 使用依赖注入，注册全局过滤器
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpFilter,
    },
  ],
})
export class AppModule {}
```

### 捕获异常

```ts
// 表示捕获 HttpException 类型的异常
// @Catch() 表示捕获所有异常
@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {}
```

```ts
// 过滤器将捕获抛出的每个异常，而不管其类型(类)如何。
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

## 管道

管道是具有 `@Injectable()` 装饰器的类。管道应实现 `PipeTransform` 接口。

管道的两个应用场景：

- **转化：**管道将输入数据转化为所需的数据输出(例如，将 string 转为 number)
- **验证：**对输入数据进行验证，如果验证成功继续传递；验证失败则抛出异常

在这两种情况下，管道 `参数(arguments)` 会由控制器的路由处理程序进行处理。Nest 会在调用这个方法之前插入一个管道，管道会先拦截方法的调用参数，进行转化或者验证处理，然后用转化好或者验证好的参数调用原方法。

当 Pipe 发生异常时，controller 不会执行任何方法。

Nest 的内置管道：

- `ValidationPipe`	
- `ParseIntPipe`
- `ParseFloatPipe`

- `ParseBoolPipe`
- `ParseArrayPipe`
- `ParseUUIDPipe`
- `ParseEnumPipe`
- `DefaultValuePipe`
- `ParseFilePipe`

### 绑定管道

```ts
@Get(':id')
getCoById(@Param('id', ParseIntPipe) id) {
    return this.moService.findOne(id);
}
```

这确保了我们在 `findOne()` 方法中接收的参数是一个数字(与 `this.moService.findOne()` 方法的诉求一致)，或者在路由处理程序被调用之前抛出异常。

```ts
@Get(':id')
// 传递一个实例而非类，可以用来自定义管道的行为
async findOne(
  @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
) {
  return this.moService.findOne(id);
}
```

### 自定义管道

```ts
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    return value;
  }
}
```

> `PipeTransform<T, R>` 是每个管道必须实现的泛型接口。泛型 `T` 表示输入的 value 的类型
>
> 泛型 `R` 表示 `transform()` 的返回值。

`transform()` 有两个参数：

- `value`
- `metadata`

`value` 参数是当前处理的方法参数(在被路由处理程序方法接收之前)

`metadata` 是当前处理的方法的元数据。

```ts
// metadata 包括以下属性
export interface ArgumentMetadata {
    type: 'body' | 'query' | 'param' | 'custom';
    metatype?: Type<unknown>;
    data?: string
}
```

### 类验证器

Nest 与 class-validator 配合得很好。这个优秀的库允许使用基于装饰器的验证。

```bash
npm i --save class-validator class-transforme
```

安装完成后，我就可以向 `DTO` 类添加一些装饰器。

```ts
export class CreateCoDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;
}
```

```ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // 验证 metatype
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const error = await validate(object);
    if (error.length > 0) {
      throw new BadRequestException('validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

`plainToInstance()` 方法将普通的 JavaScript 参数对象转换为可验证的类型对象。

使用 `import { ValidationPipe } from '@nestjs/common';` 也能达到相同的效果。

```JSON
{
    "message": [
        "age must be an integer number"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

### 全局管道

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

也可以采用依赖注入的方式

```ts
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
```

## 守卫

守卫是一个使用 `@Injectable()` 装饰器的类。守卫实现 `CanActivate` 接口。

守卫有一个独立的职责。他们会根据运行时出现的某种条件(例如权限、角色、访问控制列表等)来确定给定的请求是否由路由程序处理。

**守卫在每个中间件之后执行，或者拦截器和管道之前执行。**

### 授权守卫

授权是守卫的一大重要用例。只有当用户或特定身份具有足够权限时才能够使用特定的路由。

```ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

`validateRequest()` 根据自己的需求进行编写。主要目的是说明守卫如何适应请求/响应周期。

每一个守卫必须实现一个  `canActivate()` 函数。返回返回一个 Boolean，用于指示是否允许当前请求。他可以通过同步或异步的返回响应(通过 `Promise` 或 `Observable`)。

- 如果返回 `true` ，将处理用户调用。
- 如果返回 `false`，则 Nest 会忽略当前请求。

### 执行上下文

`ExecutionContext` 继承于 `ArgumentsHost` 。并且提供更多的功能。

### 绑定守卫

```ts
// 可以给每个路由处理函数绑定守卫，也可以绑定控制器
@Get(':id')
@UseGuards(AuthGuard)
getCoById(@Param('id', ParseIntPipe) id) {
    return this.moService.findOne(id);
}
```

```ts
// 也可以通过注入实例而不是类来绑定守卫
@Get(':id')
@UseGuards(new AuthGuard())
getCoById(@Param('id', ParseIntPipe) id) {
    return this.moService.findOne(id);
}
```

```ts
// 注册一个全局守卫
const app = await NestFactory.create(AppModule);
app.useGlobalGuards(new RolesGuard());
```

```ts
// 通过依赖注入的方式，注册全局守卫
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
```

### 为每个处理器设置角色

`Nest` 通过 `@SetMatedata()`  来给每个处理器设置角色。

```ts
@Get(':id')
@SetMetadata('roles', ['admin'])
@UseGuards(AuthGuard)
getCoById(@Param('id', ParseIntPipe) id) {
    return this.moService.findOne(id);
}
```

```ts
// roles.decorator.ts 我们可以创建自己的装饰器来接收自定义的角色

import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

## 拦截器

拦截器是使用 `@Injectable()` 装饰器注解的类。拦截器应该实现 `NestInterceptor` 的接口。

拦截器具有一系列功能

- 在函数执行之前/之后绑定**额外逻辑**
- 转换从函数返回的结果
- 转换从函数抛出的异常
- 扩展函数的基本行为
- 根据所选条件完全重写函数

### 基础

每个拦截器都有 `intercept()` 方法。他有两个参数：第一个参数 `ExecutionContext` ，`ExecutionContext` 继承自 `ArgumentsHost` 。第二个参数 `CallHandler` ，如果不手动调用 `handle()` 那么主程序不会进行求值，`CallHandler`是一个包装执行流的对象，因此推迟了最终的处理程序执行。

```ts
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
```

> `NestInterceptor<T，R>` 是一个通用接口，其中 `T` 表示已处理的 `Observable<T>` 的类型（在流后面），而 `R` 表示包含在返回的 `Observable<R>` 中的值的返回类型。

### 绑定拦截器

与守卫一样，拦截器可以是控制器范围内的，方法范围内的或者全局范围内的。

```ts
@UseInterceptors(LoggingInterceptor)
export class CatsController {}
```

同样的，可以选择注入实例，而不是类来绑定拦截器

```ts
@UseInterceptors(new LoggingInterceptor())
export class CatsController {}
```

绑定全局拦截器

```ts
const app = await NestFactory.create(AppModule);
app.useGlobalInterceptors(new LoggingInterceptor());
```

使用依赖注入的方式，绑定全局拦截器

```ts
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
```

### 响应映射

使用 `map()` 方法，对你的响应数据进行映射，返回你所需要的响应内容。

```ts
import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data, // 数据
          status: 0, // 接口状态值
          extra: {}, // 拓展信息
          message: '操作成功！', // 异常信息
          success: true, // 接口业务返回状态
        };
      }),
    );
  }
}
```

### 异常映射

```ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => throwError(new BadGatewayException())),
      );
  }
}
```

## 自定义装饰器

在代码中，我们可能多次需要使用到 req.url，为了使代码更具有可读性和透明性，我们可以创建一个 

`@User()` 装饰器来帮助我们获取到他。

```ts
const user = req.url;
```

```ts
// url.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Url = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.url;
  },
);
```

使用自定义装饰器

```ts
@Get('all')
getCoAll(@Url() url) {
    console.log('url', url);
    return this.coService.findAll();
}
```

### 传递数据

通过 data 参数，获取到传递的数据

```ts
// url.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Url = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log(data);
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.url;
  },
);
```

```ts
@Get('all')
getCoAll(@Url('http://xxxx') url) {
    console.log('url', url);
    return this.coService.findAll();
}
```

### 装饰器聚合

```ts
import { applyDecorators } from '@nestjs/common';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' })
  );
}
```

使用 `applyDecorators()` 方法，可以聚合多个装饰器，但也有部分装饰器由于自身特性没法进行聚合。

## 自定义提供者

### 依赖注入

依赖注入是一种控制反转(`IoC`) 技术，您可以将依赖的实例化委派给`IoC` 容器。

首先，我们定义一个提供者。`@Injectable()`装饰器将 `CatsService` 类标记为提供者。

### 标准提供者

```ts
@Module({
  controllers: [CoController],
  providers: [CoService],
})
```

providers属性接受一个提供者数组。到目前为止，我们已经通过一个类名列表提供了这些提供者。实际上，该语法`providers: [CoService]`是更完整语法的简写：

```ts
providers: [
    {
        provide: CoService,
        useClass: CoService
    }
]
```

现在我们看到了这个显式的构造，我们可以理解注册过程。在这里，我们明确地将令牌 `CoService`与类 `CoService` 关联起来。简写表示法只是为了简化最常见的用例，其中令牌用于请求同名类的实例。
