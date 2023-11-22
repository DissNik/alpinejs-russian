# x-ref

`x-ref` в сочетании с `$refs` — полезная утилита для простого прямого доступа к элементам DOM. Он наиболее полезен в качестве замены таких API, как `getElementById` и `querySelector`.

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
