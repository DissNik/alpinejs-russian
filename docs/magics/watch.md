# $watch

Вы можете «наблюдать» за свойством компонента с помощью магического метода `$watch`. Например:

```html
<div x-data="{ open: false }" x-init="$watch('open', value => console.log(value))">
  <button @click="open = !open">Переключить</button>
</div>
```

В приведенном выше примере при нажатии кнопки и изменении значения `open` сработает предоставленный обратный вызов и `console.log` выдаст новое значение:

Вы можете просматривать глубоко вложенные свойства, используя «точечную» нотацию:

```html
<div x-data="{ foo: { bar: 'baz' }}" x-init="$watch('foo.bar', value => console.log(value))">
  <button @click="foo.bar = 'bob'">Переключить</button>
</div>
```

При нажатии `<button>` для `foo.bar` будет установлено значение «bob», а затем оно будет выведено в консоли.

<a name="getting-the-old-value"></a>

### Получение «старого» значения

`$watch` отслеживает предыдущее значение отслеживаемого свойства. Вы можете получить к нему доступ, используя необязательный второй аргумент обратного вызова, например:

```html
<div
  x-data="{ open: false }"
  x-init="$watch('open', (value, oldValue) => console.log(value, oldValue))"
>
  <button @click="open = !open">Переключить</button>
</div>
```

<a name="deep-watching"></a>

### Глубокое наблюдение

`$watch` автоматически отслеживает изменения на любом уровне, но вы должны иметь в виду, что при обнаружении изменения наблюдатель вернет значение наблюдаемого свойства, а не значение измененного подсвойства.

```html
<div
  x-data="{ foo: { bar: 'baz' }}"
  x-init="$watch('foo', (value, oldValue) => console.log(value, oldValue))"
>
  <button @click="foo.bar = 'bob'">Обновить</button>
</div>
```

Когда `<button>` будет нажата, `foo.bar` будет установлен в значение «bob», а «{bar: 'bob'} {bar: 'baz'}» будет выведено в консоль (новое и старое значение).

!!! warning "Предупреждение"

    Изменение свойства «наблюдаемого» объекта в качестве побочного эффекта обратного вызова `$watch` приведет к бесконечному циклу и в конечном итоге к ошибке.

```html
<!-- 🚫 Бесконечный цикл -->
<div x-data="{ foo: { bar: 'baz', bob: 'lob' }}" x-init="$watch('foo', value => foo.bob = foo.bar)">
  <button @click="foo.bar = 'bob'">Обновить</button>
</div>
```
