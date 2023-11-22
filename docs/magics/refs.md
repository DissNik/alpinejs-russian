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
