---
title: Асинхронность
description: Поддержка асинхронных функций в Alpine.js
sidebar:
  order: 4
---

Alpine создан для поддержки асинхронных функций, в большинстве случаев он поддерживает стандартные.

Например, допустим, у вас есть простая функция `getLabel()`, которая используется в качестве входного элемента директивы `x-text`:

```js
function getLabel() {
  return 'Привет, мир!';
}
```

```html
<span x-text="getLabel()"></span>
```

Поскольку функция `getLabel` является синхронной, всё работает так, как и ожидалось.

Теперь представим, что `getLabel` делает сетевой запрос на получение метки и не может вернуть её мгновенно (асинхронно). Сделав `getLabel` асинхронной функцией, вы можете вызывать её из Alpine, используя синтаксис JavaScript `await`.

```js "await"
async function getLabel() {
  let response = await fetch('/api/label');

  return await response.text();
}
```

```html "await"
<span x-text="await getLabel()"></span>
```

Кроме того, если вы предпочитаете вызывать методы в Alpine без круглых скобок, вы можете их не указывать, и Alpine определит, что предоставленная функция является асинхронной, и обработает её соответствующим образом. Например:

```html "getLabel"
<span x-text="getLabel"></span>
```
