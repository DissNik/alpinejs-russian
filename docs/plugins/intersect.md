---
title: Intersect
description: Удобная оболочка Alpine для Intersection Observer, которая позволяет легко реагировать, когда элемент попадает в область просмотра.
---

# Плагин Intersect

![](https://alpinejs.dev/social_intersect.jpg)

Плагин Intersect представляет собой удобную обёртку для [Intersection Observer](https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API), которая позволяет легко реагировать на попадание элемента в область просмотра.

Это полезно для: отложенной загрузки изображений и другого контента, запуска анимации, бесконечной прокрутки, регистрации «просмотров» контента и т. д.

<a name="installation"></a>

## Установка

Вы можете использовать этот плагин, включив его из тега `<script>` или установив через NPM:

### Через CDN

Вы можете подключить CDN-сборку этого плагина с помощью тега `<script>`, только подключать нужно ДО основного JS-файла Alpine.

```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### Через NPM

Вы можете установить Intersect из NPM для использования внутри вашей сборки следующим образом:

```shell
npm install @alpinejs/intersect
```

Затем инициализируйте его в своей сборке:

```js
import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'

Alpine.plugin(intersect)
Alpine.start();
```

<a name="x-intersect"></a>

## x-intersect

Основным API для использования этого плагина является `x-intersect`. Вы можете добавить `x-intersect` к любому элементу в компоненте Alpine, и когда этот компонент попадет в область просмотра (будет прокручен), будет выполнено указанное выражение.

Например, в следующем фрагменте `shown` будет оставаться `false` до тех пор, пока элемент не будет прокручен в поле зрения. В этот момент выражение будет выполнено, и `shown` станет `true`:

```html
<div x-data="{ shown: false }" x-intersect="shown = true">
  <div x-show="shown" x-transition>Я нахожусь в области просмотра!</div>
</div>
```

!!! example "Пример"

    <div class="demo" style="height: 60px; overflow-y: scroll;" x-data x-ref="root">
        <span x-on:click.prevent="$refs.root.scrollTo({ top: $refs.root.scrollHeight, behavior: 'smooth' })">Прокрутите вниз 👇</span>
        <div style="height: 50vh"></div>
        <div x-data="{ shown: false }" x-intersect="shown = true" id="yoyo">
            <div x-show="shown" x-transition.duration.1000ms>
                Я нахожусь в области просмотра!
            </div>
            <div x-show="!shown">&nbsp;</div>
        </div>
    </div>

<a name="x-intersect-enter"></a>

### x-intersect:enter

Суффикс `:enter` является псевдонимом `x-intersect` и работает аналогичным образом:

```html
<div x-intersect:enter="shown = true">...</div>
```

Для наглядности можно использовать суффикс `:leave`.

<a name="x-intersect-leave"></a>

### x-intersect:leave

Добавление `:leave` запускает ваше выражение, когда элемент покидает область просмотра:

```html
<div x-intersect:leave="shown = true">...</div>
```

<a name="modifiers"></a>

## Модификаторы

<a name="once"></a>

### .once

Иногда полезно вычислять выражение только в первый раз, когда элемент попадает в область просмотра, а не в последующие разы. Например, при запуске анимации ввода («enter»). В этих случаях для достижения этой цели вы можете добавить модификатор `.once` к `x-intersect`.

```html
<div x-intersect.once="shown = true">...</div>
```

<a name="half"></a>

### .half

Оценивает выражение, когда порог пересечения превышает `0.5`.

Применяется для элементов, где важно показать хотя бы часть элемента.

```html
<div x-intersect.half="shown = true">...</div>
// когда `0,5` элемента находится в области просмотра
```

<a name="full"></a>

### .full

Оценивает выражение, когда порог пересечения превышает `0.99`.

Применяется для элементов, где важно показать весь элемент целиком.

```html
<div x-intersect.full="shown = true">...</div>
// когда `0,99` элемента находится в области просмотра
```

<a name="threshold"></a>

### .threshold

Позволяет управлять свойством `threshold` базового `IntersectionObserver`:

Это значение должно находиться в диапазоне «0-100». Значение «0» означает: вызвать пересечение, если ЛЮБАЯ часть элемента попадает в область просмотра (поведение по умолчанию). В то время как значение «100» означает: не вызывать пересечение, если только весь элемент не вошел в область просмотра.

Любое значение между ними представляет собой процент от этих двух крайних значений.

Например, если необходимо вызвать пересечение после того, как половина элемента вошла на страницу, можно использовать `.threshold.50`:

```html
<div x-intersect.threshold.50="shown = true">...</div>
// когда 50% элемента находится в области просмотра
```

Если бы требовалось срабатывать только тогда, когда 5% элемента попадает в область просмотра, то можно было бы использовать: `.threshold.05`, и так далее, и так далее.

<a name="margin"></a>

### .margin

Позволяет управлять свойством `rootMargin` нижележащего `IntersectionObserver`.
Это позволяет эффективно изменять размер границы области просмотра. Положительные значения
расширяют границу за пределы области просмотра, а отрицательные значения сужают её вглубь. Значения
работают подобно CSS margin: одно значение для всех сторон; два значения для `top/bottom`, `left/right`; или
четыре значения для `top`, `right`, `bottom`, `left`. Вы можете использовать значения `px` и `%`, или использовать голое число для получения значения в пикселях.

```html
<div x-intersect.margin.200px="loaded = true">...</div>
// Загрузить, когда элемент находится в пределах 200px области просмотра
```

```html
<div x-intersect:leave.margin.10%.25px.25.25px="loaded = false">...</div>
// Выгрузить, когда элемент оказывается в пределах 10% от верхней границы области просмотра или в
пределах 25px от трех других границ
```

```html
<div x-intersect.margin.-100px="visible = true">...</div>
// Пометить как видимый, если элемент находится в области просмотра более чем на 100 пикселей.
```
