# x-if

`x-if` используется для переключения элементов на странице, аналогично `x-show`, однако он полностью добавляет и удаляет элемент, к которому он применен, а не просто меняет его свойство отображения CSS на «none».

Из-за этой разницы в поведении `x-if` не следует применять непосредственно к элементу, а вместо этого применять к тегу `<template>`, который окружает элемент. Таким образом, Alpine может сохранить запись об элементе после его удаления со страницы.

```html
<template x-if="open">
  <div>Содержимое...</div>
</template>
```

!!! info "Информация"

    В отличие от `x-show`, `x-if` НЕ поддерживает переключатели перехода с помощью `x-transition`.

!!! note "Примечание"

    Помните: теги `<template>` могут содержать только один элемент корневого уровня.