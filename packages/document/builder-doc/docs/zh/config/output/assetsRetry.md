- **类型：** `Object`

`output.assetsRetry` 用于配置资源加载失败时的重试逻辑。配置类型如下:

```ts
export type AssetsRetryHookContext = {
  times: number;
  domain: string;
  url: string;
  tagName: string;
};

export type AssetsRetryOptions = {
  type?: string[];
  domain?: string[];
  max?: number;
  test?: string | ((url: string) => boolean);
  crossOrigin?: boolean;
  onRetry?: (options: AssetsRetryHookContext) => void;
  onSuccess?: (options: AssetsRetryHookContext) => void;
  onFail?: (options: AssetsRetryHookContext) => void;
};
```

由于该能力会往 HTML 中注入额外的一些运行时代码，因此我们默认关闭了该能力，如果需要开启该能力，你可以配置成对象的形式，比如：

```js
export default {
  output: {
    assetsRetry: {},
  },
};
```

当你开启该能力后，`assetsRetry` 的默认配置如下：

```ts
export const defaultAssetsRetryOptions: AssetsRetryOptions = {
  type: ['script', 'link', 'img'],
  domain: [],
  max: 3,
  test: '',
  crossOrigin: false,
  onRetry: () => {},
  onSuccess: () => {},
  onFail: () => {},
};
```

同时你也可以根据接下来的一些配置说明，来定制你的重试逻辑。

### assetsRetry.max

- **类型：** `number`
- **默认值：** `3`

单个资源的最大重试次数。比如：

```js
export default {
  output: {
    assetsRetry: {
      max: 3,
    },
  },
};
```

### assetsRetry.domain

- **类型：** `string[]`
- **默认值：** `[]`

指定资源加载失败时的重试域名，如果为空则使用当前页面的域名。比如：

```js
export default {
  output: {
    assetsRetry: {
      domain: ['https://cdn1.example.com', 'https://cdn2.example.com'],
    },
  },
};
```

### assetsRetry.type

- **类型：** `string[]`
- **默认值：** `['script', 'link', 'img']`

可重试的资源类型。比如：

```js
export default {
  output: {
    assetsRetry: {
      type: ['script', 'link'],
    },
  },
};
```

### assetsRetry.test

- **类型：** `string | ((url: string) => boolean) | undefined`
- **默认值：** `undefined`

匹配资源 URL 的正则表达式或函数，默认匹配所有资源。比如：

```js
export default {
  output: {
    assetsRetry: {
      test: /cdn\.example\.com/,
    },
  },
};
```

### assetsRetry.crossOrigin

- **类型：** `undefined | boolean`
- **默认值：** false

用于向 `<script>` 资源标签中注入 crossorigin 属性，传入 true 则会启用默认值 anonymous。比如：

```js
export default {
  output: {
    assetsRetry: {
      crossOrigin: true,
    },
  },
};
```

### assetsRetry.onRetry

- **类型：** `undefined | (options: AssetsRetryHookContext) => void`

资源重试时的回调函数。比如：

```js
export default {
  output: {
    assetsRetry: {
      onRetry: ({ times, domain, url, tagName }) => {
        console.log(
          `Retry ${times} times, domain: ${domain}, url: ${url}, tagName: ${tagName}`,
        );
      },
    },
  },
};
```

### assetsRetry.onSuccess

- **类型：** `undefined | (options: AssetsRetryHookContext) => void`

资源重试成功时的回调函数。比如：

```js
export default {
  output: {
    assetsRetry: {
      onSuccess: ({ times, domain, url, tagName }) => {
        console.log(
          `Retry ${times} times, domain: ${domain}, url: ${url}, tagName: ${tagName}`,
        );
      },
    },
  },
};
```

### assetsRetry.onFail

- **类型：** `undefined | (options: AssetsRetryHookContext) => void`

资源重试超过最大重试次数时的回调函数。比如：

```js
export default {
  output: {
    assetsRetry: {
      onFail: ({ times, domain, url, tagName }) => {
        console.log(
          `Retry ${times} times, domain: ${domain}, url: ${url}, tagName: ${tagName}`,
        );
      },
    },
  },
};
```