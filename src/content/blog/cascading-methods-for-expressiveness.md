---
title: 'Цепочки вызовов в JavaScript'
description: 'Как создавать выразительный и лаконичный код с помощью каскадных методов'
date: 'Jun 28 2025'
draft: false
author: 'Ричард Бовелл'
source:
  name: 'JavaScript Is Sexy'
  url: 'https://javascriptissexy.com/beautiful-javascript-easily-create-chainable-cascading-methods-for-expressiveness/'
---

Цепочка методов или каскадирование — это вызов нескольких методов подряд на одном и том же объекте в одной непрерывной инструкции. Этот прием знаком каждому веб-разработчику по библиотекам вроде jQuery, интерфейсам построителей запросов и нативным методам работы со строками и массивами в JavaScript.

Сравните классический построчный вызов с цепочкой:

```javascript
// Без цепочки методов:
const str = "hello world";
const replaced = str.replace("h", "H");
const upper = replaced.toUpperCase();
const result = upper.slice(0, 5);

// С цепочкой методов:
const result = "hello world"
  .replace("h", "H")
  .toUpperCase()
  .slice(0, 5);
```

Такой код читается слева направо как связное предложение. Он избавляет от промежуточных переменных, которые нужны лишь для передачи промежуточного состояния на следующий шаг.

## Как работает каскадирование

Механика проста: чтобы метод можно было вызвать в цепочке, предыдущий метод должен вернуть контекст объекта — ключевое слово `this`.

Когда метод возвращает `this`, следующий метод вызывается на том же самом экземпляре:

```javascript
const calculator = {
  value: 0,

  add(n) {
    this.value += n;
    return this;
  },

  multiply(n) {
    this.value *= n;
    return this;
  },

  reset() {
    this.value = 0;
    return this;
  },

  result() {
    return this.value;
  },
};

const total = calculator.add(10).multiply(2).result(); // 20
```

Методы `add` и `multiply` мутируют внутреннее состояние и возвращают `this`, позволяя продолжать цепочку. Завершающий метод `result` возвращает вычисленное числовое значение, завершая каскад.

## Практический пример: контроллер пользователя

Рассмотрим работу с данными пользователя и генерацию разметки. Создадим контроллер с цепочными методами для поиска, форматирования и отрисовки:

```javascript
const users = [
  { id: 101, firstName: "иван", lastName: "иванов", email: "ivan@example.com" },
  { id: 102, firstName: "анна", lastName: "смирнова", email: "anna@example.com" },
];

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

const userController = {
  currentUser: null,
  renderedView: "",

  findUser(email) {
    this.currentUser = users.find((user) => user.email === email) || null;
    return this;
  },

  formatName() {
    if (!this.currentUser) return this;

    this.currentUser.fullName = [
      capitalize(this.currentUser.firstName),
      capitalize(this.currentUser.lastName),
    ].join(" ");

    return this;
  },

  render() {
    if (!this.currentUser) return this;

    this.renderedView = `
      <div class="user-card">
        <h2>${this.currentUser.fullName}</h2>
        <p>Email: ${this.currentUser.email}</p>
      </div>
    `;

    return this;
  },

  mount(targetSelector) {
    if (!this.renderedView) return;
    const container = document.querySelector(targetSelector);
    if (container) {
      container.innerHTML = this.renderedView;
    }
  },
};
```

Теперь выполнение всех операций объединяется в одну наглядную последовательность:

```javascript
userController
  .findUser("anna@example.com")
  .formatName()
  .render()
  .mount("#profile");
```

## Преимущества и практические соображения

Каскадные методы делают код выразительным, но требуют взвешенного применения:

- **Меньше промежуточных переменных.** Не нужно придумывать имена для временных результатов, которые больше нигде не используются.
- **Единый поток чтения.** Операции выстраиваются в строгую хронологическую последовательность.
- **Самодокументируемость.** Если методы названы глаголами (`findUser`, `formatName`, `render`), цепочка читается как понятный сценарий действий.

При этом стоит помнить об отладке: при возникновении ошибки внутри длинной цепочки стек вызовов может указывать на всю цепочку целиком. Разделяйте вызовы переносом строк, чтобы упростить чтение и расстановку точек останова.

