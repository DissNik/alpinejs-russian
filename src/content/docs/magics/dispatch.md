---
title: $dispatch
description: Знакомимся с магическим свойством $dispatch в Alpine.js
sidebar:
  order: 5
---

`$dispatch` — полезное сокращение для диспетчеризации событий браузера.

```html
<div @notify="alert('Привет, мир!')">
  <button @click="$dispatch('notify')">Уведомить</button>
</div>
```

!!! example "Пример"

    <div class="demo">
        <div x-data x-on:notify="alert('Привет, мир!')">
            <button x-on:click="$dispatch('notify')">
                Уведомить
            </button>
        </div>
    </div>

При желании вместе с отправляемым событием можно передать и данные. Эти данные будут доступны как свойство `.detail` события:

```html
<div @notify="alert($event.detail.message)">
  <button @click="$dispatch('notify', { message: 'Привет, мир!' })">Уведомить</button>
</div>
```

!!! example "Пример"

    <div class="demo">
        <div x-data x-on:notify="alert($event.detail.message)">
            <button x-on:click="$dispatch('notify', { message: 'Привет, мир!' })">Уведомить</button>
        </div>
    </div>

Под капотом `$dispatch` представляет собой обертку для более подробного API: `element.dispatchEvent(new CustomEvent(...))`.

**Примечание о распространении событий**

Обратите внимание: из-за [всплытия событий](https://learn.javascript.ru/bubbling-and-capturing), когда вам нужно перехватывать события, отправляемые с узлов, находящихся в одной и той же иерархии вложенности, вам нужно будет использовать модификатор [`.window`](/directives/on#window):

**Example:**

```html
<!-- 🚫 Не работает -->
<div x-data>
  <span @notify="..."></span>
  <button @click="$dispatch('notify')">Уведомить</button>
</div>

<!-- ✅ Будет работать (благодаря .window) -->
<div x-data>
  <span @notify.window="..."></span>
  <button @click="$dispatch('notify')">Уведомить</button>
</div>
```

!!! warning "Предупреждение"

    Первый пример не будет работать, потому что при отправке `custom-event` оно будет распространяться на своего общего предка, `div`, а не на его родственного, `<span>`. Второй пример будет работать, потому что одноуровневый элемент прослушивает `notify` на уровне `window`, до которого в конечном итоге всплывет пользовательское событие.

## Отправка другим компонентам

Вы также можете воспользоваться предыдущим методом, чтобы заставить ваши компоненты взаимодействовать друг с другом:

**Пример:**

```html
<div x-data="{ title: 'Привет' }" @set-title.window="title = $event.detail">
  <h1 x-text="title"></h1>
</div>

<div x-data>
  <button @click="$dispatch('set-title', 'Привет, мир!')">Нажми меня</button>
</div>
<!-- При нажатии содержимое h1 получит текст «Привет, мир!». -->
```

## Диспетчеризация в x-model

Вы также можете использовать `$dispatch()` для запуска обновления данных для привязок `x-model`. Например:

```html
<div x-data="{ title: 'Привет' }">
  <span x-model="title">
    <button @click="$dispatch('input', 'Привет, мир!')">Нажми меня</button>
    <!-- После нажатия кнопки `x-model` перехватит всплывающее событие ввода и обновит заголовок. -->
  </span>
</div>
```

Это открывает возможности для создания пользовательских компонентов ввода, значение которых можно установить с помощью `x-model`.
