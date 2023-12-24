# $refs

`$refs` - это магическое свойство, которое может быть использовано для получения элементов DOM, помеченных `x-ref` внутри компонента. Это удобно, когда необходимо вручную манипулировать элементами DOM. Он часто используется как более лаконичная и расширенная альтернатива `document.querySelector`.

```html
<button @click="$refs.text.remove()">Удалить текст</button>

<span x-ref="text">Привет👋</span>
```

!!! example "Пример"

    <div class="demo">
        <div x-data>
            <button class="md-button md-button--primary" x-on:click="$refs.text.remove()">Удалить текст</button>
            <div class="pt-4" x-ref="text">Привет👋</div>
        </div>
    </div>

Теперь при нажатии кнопки `<button>` элемент `<span>` будет удаляться.

<a name="limitations"></a>

### Ограничения

В V2 можно было динамически привязывать `$refs` к элементам, как показано ниже:

```html
<template x-for="item in items" :key="item.id">
  <div :x-ref="item.name">какой-то контент...</div>
</template>
```

Однако в V3 доступ к `$refs` возможен только для элементов, которые создаются статически. Итак, для примера выше: Если вы ожидали, что значение `item.name` внутри `$refs` будет что-то вроде _Batteries_, то знайте, что `$refs` будет содержать литеральную строку `'item.name'`, а не _Batteries_.
