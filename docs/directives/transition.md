# x-transition

Alpine уже из коробки предоставляет надежную утилиту для переходов. С помощью нескольких директив `x-transition` можно создавать плавные переходы между отображением и скрытием элемента.

Существует два основных способа организации переходов в Alpine:

- [Хелпер `x-transition`](#the-transition-helper)
- [Применение классов CSS](#applying-css-classes)

<a name="the-transition-helper"></a>

## Хелпер `x-transition`

Самый простой способ реализовать переход с помощью Alpine - это добавить `x-transition` к элементу с `x-show` на нем. Например:

```html
<div x-data="{ open: false }">
  <button @click="open = !open">Переключить</button>

  <span x-show="open" x-transition> Привет👋 </span>
</div>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ open: false }">
            <button class="md-button md-button--primary" x-on:click="open = !open">Переключить</button>
            <span x-show="open" x-transition>
                Привет👋
            </span>
        </div>
    </div>

Как видно, по умолчанию `x-transition` применяет приятные переходы для затухания и масштабирования раскрывающегося элемента.

Вы можете переопределить эти значения по умолчанию с помощью модификаторов, присоединенных к `x-transition`. Давайте рассмотрим их.

<a name="customizing-duration"></a>

### Настройка продолжительности

Изначально длительность устанавливается равной 150 миллисекундам при входе и 75 миллисекундам при выходе.

С помощью модификатора `.duration` можно задать желаемую длительность перехода:

```html
<div ... x-transition.duration.500ms></div>
```

Приведенный выше `<div>` будет переходить на 500 миллисекунд при входе и на 500 миллисекунд при выходе.

Если вы хотите настроить продолжительность перехода именно для входа и выхода, то это можно сделать следующим образом:

```html
<div ... x-transition:enter.duration.500ms x-transition:leave.duration.400ms></div>
```

<a name="customizing-delay"></a>

### Настройка задержки

Задержать переход можно с помощью модификатора `.delay`, например, так:

```html
<div ... x-transition.delay.50ms></div>
```

Приведенный пример задержит переход и вход и выход из элемента на 50 миллисекунд.

<a name="customizing-opacity"></a>

### Настройка непрозрачности

По умолчанию в `x-transition` применяется переход по масштабу и непрозрачности для достижения эффекта «затухания».

Если требуется применить только переход непрозрачности (без масштабирования), то это можно сделать следующим образом:

```html
<div ... x-transition.opacity></div>
```

<a name="customizing-scale"></a>

### Настройка масштаба

Аналогично модификатору `.opacity`, можно настроить `x-transition` только на масштабирование (а не на непрозрачность перехода) следующим образом:

```html
<div ... x-transition.scale></div>
```

Модификатор `.scale` также предоставляет возможность настройки значений масштаба и начала координат:

```html
<div ... x-transition.scale.80></div>
```

Приведенный выше фрагмент будет масштабировать элемент вверх и вниз на 80%.

Опять же, вы можете настроить эти значения отдельно для переходов входа и выхода следующим образом:

```html
<div ... x-transition:enter.scale.80 x-transition:leave.scale.90></div>
```

Для настройки начала перехода масштаба можно использовать модификатор `.origin`:

```html
<div ... x-transition.scale.origin.top></div>
```

Теперь масштаб будет применяться с использованием в качестве начала координат верхней части элемента, а не центра, как по умолчанию.

Как вы уже догадались, возможными значениями для этой настройки являются: `top`, `bottom`, `left` и `right`.

При желании можно также объединить два значения происхождения. Например, если нужно, чтобы начало шкалы находилось в правом верхнем углу, можно использовать: `.origin.top.right` в качестве модификатора.

<a name="applying-css-classes"></a>

## Применение классов CSS

Для непосредственного контроля над тем, что именно попадает в переходы, можно применять CSS-классы на разных этапах перехода.

!!! note "Примечание"

    В следующих примерах используются классы утилиты [TailwindCSS](https://tailwindcss.com/docs/transition-property).

```html
<div x-data="{ open: false }">
  <button @click="open = !open">Переключить</button>

  <div
    x-show="open"
    x-transition:enter="transition ease-out duration-300"
    x-transition:enter-start="opacity-0 scale-90"
    x-transition:enter-end="opacity-100 scale-100"
    x-transition:leave="transition ease-in duration-300"
    x-transition:leave-start="opacity-100 scale-100"
    x-transition:leave-end="opacity-0 scale-90"
  >
    Привет👋
  </div>
</div>
```

!!! example "Пример"

    <div class="demo">
      <div x-data="{ open: false }">
        <button class="md-button md-button--primary" x-on:click="open = !open">Переключить</button>
        <div
            x-show="open"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 transform scale-90"
            x-transition:enter-end="opacity-100 transform scale-100"
            x-transition:leave="transition ease-in duration-300"
            x-transition:leave-start="opacity-100 transform scale-100"
            x-transition:leave-end="opacity-0 transform scale-90"
        >Привет👋</div>
      </div>
    </div>

| Директива      | Описание                                                                                                                                      |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `:enter`       | Применяется на протяжении всей фазы входа.                                                                                                    |
| `:enter-start` | Добавляется перед вставкой элемента, удаляется через один кадр после вставки элемента.                                                        |
| `:enter-end`   | Добавляется через один кадр после вставки элемента (одновременно с удалением `enter-start`), удаляется по завершении перехода/анимации.       |
| `:leave`       | Применяется на протяжении всей фазы выхода.                                                                                                   |
| `:leave-start` | Добавляется сразу при срабатывании перехода выхода, удаляется через один кадр.                                                                |
| `:leave-end`   | Добавляется один кадр после срабатывания перехода выхода (одновременно с удалением `leave-start`), удаляется по завершении перехода/анимации. |
