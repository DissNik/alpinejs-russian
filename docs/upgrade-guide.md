# Обновление с версии V2

Ниже приведено исчерпывающее руководство по основным изменениям в Alpine V3, но если вы предпочитаете что-то более интересное, вы можете просмотреть все изменения, а также новые функции в V3, посмотрев программный доклад Alpine Day 2021 «Будущее Alpine»:

![type:video](https://www.youtube.com/embed/WixS4JXMwIQ)

Обновление с Alpine V2 до V3 должно пройти довольно безболезненно. Во многих случаях НИЧЕГО не нужно делать с вашей кодовой базой, чтобы использовать V3. Ниже приведен исчерпывающий список критических изменений и исключений в порядке убывания вероятности того, что они повлияют на пользователей:

!!! note "Примечание"

    Обратите внимание, что если вы используете Laravel Livewire и Alpine вместе, для использования Alpine V3 вам необходимо будет выполнить обновление до Livewire v2.5.1 или выше.

<a name="breaking-changes"></a>

## Критические изменения

- [`$el` теперь всегда указывает на текущий элемент](#el-no-longer-root)
- [Автоматическое выполнение функций `init()`, определённых в объекте data](#auto-init)
- [Необходимо вызывать `Alpine.start()` после импорта](#need-to-call-alpine-start)
- [Вместо `x-show.transition` теперь используется `x-transition`](#removed-show-dot-transition)
- [`x-if` больше не поддерживает `x-transition`](#x-if-no-transitions)
- [`x-data` теперь имеет каскадную область видимости](#x-data-scope)
- [`x-init` больше не принимает функцию обратного вызова](#x-init-no-callback)
- [Возврат `false` из обработчиков событий больше не приводит к неявному «preventDefault»](#no-false-return-from-event-handlers)
- [Вместо `x-spread` теперь используется `x-bind`](#x-spread-now-x-bind)
- [Использование глобальных событий жизненного цикла вместо `Alpine.deferLoadingAlpine()`](#use-global-events-now)
- [`x-ref` больше не поддерживает связывание](#x-ref-no-more-dynamic)
- [IE11 больше не поддерживается](#no-ie-11)

<a name="el-no-longer-root"></a>

### `$el` теперь всегда является текущим элементом

`$el` теперь всегда представляет элемент, над которым было выполнено выражение, а не корневой элемент компонента. Это заменит большинство случаев использования `x-ref`, а в тех случаях, когда все же необходимо получить доступ к корню компонента, можно использовать `$root`. Например:

```html
<!-- 🚫 До -->
<div x-data>
  <button @click="console.log($el)"></button>
  <!-- В V2 $el был <div>, теперь это <button>. -->
</div>

<!-- ✅ После -->
<div x-data>
  <button @click="console.log($root)"></button>
</div>
```

Для более плавного обновления можно заменить все экземпляры `$el` на пользовательскую магию `$root`.

[→ Подробнее о $el в V3](magics/el.md)
[→ Подробнее о $root в V3](magics/root.md)

<a name="auto-init"></a>

### Автоматическое выполнение функций `init()`, определённых в объекте data

Распространенной схемой в V2 был ручной вызов метода `init()` (или аналогичного по названию метода) для объекта `x-data`.

В V3 Alpine будет автоматически вызывать методы `init()` у объектов данных.

```html
<!-- 🚫 До -->
<div x-data="foo()" x-init="init()"></div>

<!-- ✅ После -->
<div x-data="foo()"></div>

<script>
  function foo() {
    return {
      init() {
        //
      },
    };
  }
</script>
```

[→ Подробне об автозапуске функций init](globals/alpine-data.md#init-functions)

<a name="need-to-call-alpine-start"></a>

### Необходимо вызывать `Alpine.start()` после импорта

Если вы импортировали Alpine V2 из NPM, теперь вам нужно будет вручную вызывать `Alpine.start()` для V3. Это не повлияет на вас, если вы используете файл сборки Alpine или CDN из тега `<template>`.

```js
// 🚫 До
import 'alpinejs';

// ✅ После
import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();
```

[→ Подробнее об инициализации Alpine V3](essentials/installation.md#as-a-module)

<a name="removed-show-dot-transition"></a>

### Вместо `x-show.transition` теперь используется `x-transition`

Все удобства, предоставляемые хелперами `x-show.transition...`, по-прежнему доступны, но теперь из более унифицированного API: `x-transition`:

```html
<!-- 🚫 До -->
<div x-show.transition="open"></div>
<!-- ✅ После -->
<div x-show="open" x-transition></div>

<!-- 🚫 До -->
<div x-show.transition.duration.500ms="open"></div>
<!-- ✅ После -->
<div x-show="open" x-transition.duration.500ms></div>

<!-- 🚫 До -->
<div x-show.transition.in.duration.500ms.out.duration.750ms="open"></div>
<!-- ✅ После -->
<div x-show="open" x-transition:enter.duration.500ms x-transition:leave.duration.750ms></div>
```

[→ Подробнее о `x-transition`](directives/transition.md)

<a name="x-if-no-transitions"></a>

### `x-if` больше не поддерживает `x-transition`

Возможность перемещать элементы и добавлять их до/после удаления из DOM больше не доступна в Alpine.

Это была функция, о существовании которой даже мало кто знал, не говоря уже об использовании.

Поскольку система переходов сложна, с точки зрения обслуживания имеет смысл поддерживать переходные элементы только с помощью `x-show`.

```html
<!-- 🚫 До -->
<template x-if.transition="open">
  <div>...</div>
</template>

<!-- ✅ После -->
<div x-show="open" x-transition>...</div>
```

[→ Подробнее о `x-if`](directives/if.md)

<a name="x-data-scope"></a>

### `x-data` теперь имеет каскадную область видимости

Область, определенная в `x-data`, теперь доступна всем дочерним элементам, если только она не перезаписана вложенным выражением `x-data`.

```html
<!-- 🚫 До -->
<div x-data="{ foo: 'bar' }">
  <div x-data="{}">
    <!-- foo не определено -->
  </div>
</div>

<!-- ✅ После -->
<div x-data="{ foo: 'bar' }">
  <div x-data="{}">
    <!-- foo равно 'bar' -->
  </div>
</div>
```

[→ Подробнее об области видимости `x-data`](directives/data.md#scope)

<a name="x-init-no-callback"></a>

### `x-init` больше не принимает функцию обратного вызова

До V3, если `x-init` получал возвращаемое значение, являющееся «функцией» `typeof`, он выполнял обратный вызов после того, как Alpine завершала инициализацию всех остальных директив в дереве. Теперь вам нужно вручную вызывать `$nextTick()`, чтобы добиться такого поведения. `x-init` больше не «распознает возвращаемое значение».

```html
<!-- 🚫 До -->
<div x-data x-init="() => { ... }">...</div>

<!-- ✅ После -->
<div x-data x-init="$nextTick(() => { ... })">...</div>
```

[→ Подробнее о `$nextTick`](magics/nextTick.md)

<a name="no-false-return-from-event-handlers"></a>

### Возврат `false` из обработчиков событий больше не приводит к неявному «preventDefault»

Alpine V2 воспринимает возвращаемое значение `false` как желание запустить `preventDefault` для события. Это соответствует стандартному поведению встроенных прослушивателей: `<... oninput="someFunctionThatReturnsFalse()">`. Alpine V3 больше не поддерживает этот API. Большинство людей не знают о его существовании, и поэтому поведение является удивительным.

```html
<!-- 🚫 До -->
<div x-data="{ blockInput() { return false } }">
  <input type="text" @input="blockInput()" />
</div>

<!-- ✅ После -->
<div x-data="{ blockInput(e) { e.preventDefault() } }">
  <input type="text" @input="blockInput($event)" />
</div>
```

[→ Подробнее о `x-on`](directives/on.md)

<a name="x-spread-now-x-bind"></a>

### Вместо `x-spread` теперь используется `x-bind`

Одна из историй повторного использования функциональности в Alpine — абстрагирование директив Alpine в объекты и применение их к элементам с помощью `x-spread`. Это поведение осталось прежним, за исключением того, что теперь вместо `x-spread` нужно использовать `x-bind`.

```html
<!-- 🚫 До -->
<div x-data="dropdown()">
  <button x-spread="trigger">Переключить</button>

  <div x-spread="dialogue">...</div>
</div>

<!-- ✅ После -->
<div x-data="dropdown()">
  <button x-bind="trigger">Переключить</button>

  <div x-bind="dialogue">...</div>
</div>

<script>
  function dropdown() {
    return {
      open: false,

      trigger: {
        'x-on:click'() {
          this.open = !this.open;
        },
      },

      dialogue: {
        'x-show'() {
          return this.open;
        },
        'x-bind:class'() {
          return 'foo bar';
        },
      },
    };
  }
</script>
```

[→ Подробнее о привязке директив с помощью `x-bind`](directives/bind.md#bind-directives)

<a name="use-global-events-now"></a>

### Использование глобальных событий жизненного цикла вместо `Alpine.deferLoadingAlpine()`

```html
<!-- 🚫 До -->
<script>
  window.deferLoadingAlpine = (startAlpine) => {
    // Будет выполнено перед инициализацией Alpine.

    startAlpine();

    // Будет выполнено после инициализации Alpine.
  };
</script>

<!-- ✅ После -->
<script>
  document.addEventListener('alpine:init', () => {
    // Будет выполнено перед инициализацией Alpine.
  });

  document.addEventListener('alpine:initialized', () => {
    // Будет выполнено после инициализации Alpine.
  });
</script>
```

[→ Подробнее о событиях жизненного цикла Alpine](essentials/lifecycle.md#alpine-initialization)

<a name="x-ref-no-more-dynamic"></a>

### `x-ref` больше не поддерживает связывание

В Alpine V2 для кода ниже

```html
<div x-data="{options: [{value: 1}, {value: 2}, {value: 3}] }">
  <div x-ref="0">0</div>
  <template x-for="option in options">
    <div :x-ref="option.value" x-text="option.value"></div>
  </template>

  <button @click="console.log($refs[0], $refs[1], $refs[2], $refs[3]);">Отобразить $refs</button>
</div>
```

после нажатия кнопки были отображены все `$refs`. Однако в Alpine V3 возможен доступ только к `$refs` для элементов, созданных статически, поэтому, как и ожидалось, будет возвращена только первая ссылка.

<a name="no-ie-11"></a>

### IE11 больше не поддерживается

Alpine больше не будет официально поддерживать Internet Explorer 11. Если вам нужна поддержка IE11, мы рекомендуем по-прежнему использовать Alpine V2.

## Устаревшие API

Следующие два API по-прежнему будут работать в версии 3, но считаются устаревшими и, вероятно, будут удалены в какой-то момент в будущем.

<a name="away-replace-with-outside"></a>

### Модификатор прослушивателя событий `.away` следует заменить на `.outside`

```html
<!-- 🚫 До -->
<div x-show="open" @click.away="open = false">...</div>

<!-- ✅ После -->
<div x-show="open" @click.outside="open = false">...</div>
```

<a name="alpine-data-instead-of-global-functions"></a>

### Предпочитайте `Alpine.data()` поставщикам данных глобальных функций Alpine.

```html
<!-- 🚫 До -->
<div x-data="dropdown()">...</div>

<script>
  function dropdown() {
      return {
          ...
      }
  }
</script>

<!-- ✅ После -->
<div x-data="dropdown">...</div>

<script>
  document.addEventListener('alpine:init', () => {
      Alpine.data('dropdown', () => ({
          ...
      }))
  })
</script>
```

!!! tip "Совет"

    Обратите внимание, что вам необходимо определить расширения `Alpine.data()` ПЕРЕД вызовом `Alpine.start()`. Для получения дополнительной информации обратитесь к разделам [Проблемы жизненного цикла](advanced/extending.md#lifecycle-concerns) и [Установка в качестве модуля](essentials/installation.md#as-a-модуль).
