---
title: 'Красивый JavaScript'
description: 'Как создавать цепочные методы для выразительности'
date: 'Jun 28 2025'
author: Ричард Бовелл
source:
  name: JavaScript Is Sexy
  url: https://javascriptissexy.com/beautiful-javascript-easily-create-chainable-cascading-methods-for-expressiveness/
---

## Цепочка методов

**Цепочка методов**, также известная как **каскадирование**, — это повторный вызов одного метода за другим на одном и том же объекте в одной непрерывной строке кода. Эта техника широко используется в jQuery и других JavaScript-библиотеках, а также встречается в некоторых нативных методах JavaScript.

Писать код так:

```javascript
$("#wrapper").fadeOut().html("Welcome, Sir").fadeIn();
```

или так:

```javascript
str.replace("k", "R").toUpperCase().substr(0, 4);
```

— не только приятно и удобно, но и лаконично и понятно. Это позволяет читать код как предложение, плавно текущее по странице. Такой стиль избавляет нас от однообразных, блочных структур, к которым мы привыкли.

Следующие 20 минут вы потратите на то, чтобы научиться создавать выразительный код с помощью этой каскадной техники. Чтобы использовать каскадирование, нужно возвращать `this` (объект, над которым будут работать последующие методы) в каждом методе. Давайте быстро разберёмся в деталях и вернёмся к еде, просмотру YouTube, чтению Hacker News или продуктивной работе.

Давайте создадим все наши «цепочные» методы внутри объекта, добавив туда же локальное хранилище данных. Обратите внимание: в реальном приложении данные скорее всего будут храниться в базе данных, а здесь мы просто сохраним их в переменной.

```javascript
// Хранилище данных:
var usersData = [
  { firstName: "tommy", lastName: "MalCom", email: "test@test.com", id: 102 },
  { firstName: "Peter", lastName: "breCht", email: "test2@test2.com", id: 103 },
  { firstName: "RoHan", lastName: "sahu", email: "test3@test3.com", id: 104 },
];

// Вспомогательная функция, которая делает то, что обещает:
function titleCaseName(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Наш объект с цепочными методами
var userController = {
  currentUser: "",

  findUser: function (userEmail) {
    var arrayLength = usersData.length,
      i;
    for (i = arrayLength - 1; i >= 0; i--) {
      if (usersData[i].email === userEmail) {
        this.currentUser = usersData[i];
        break;
      }
    }
    return this;
  },

  formatName: function () {
    if (this.currentUser) {
      this.currentUser.fullName =
        titleCaseName(this.currentUser.firstName) +
        " " +
        titleCaseName(this.currentUser.lastName);
    }
    return this;
  },

  createLayout: function () {
    if (this.currentUser) {
      this.currentUser.viewData =
        "<div class='member'>" +
        "<h2>Member: " +
        this.currentUser.fullName +
        "</h2>" +
        "<p>ID: " +
        this.currentUser.id +
        "</p>" +
        "<p>Email: " +
        this.currentUser.email +
        "</p></div>";
    }
    return this;
  },

  displayUser: function () {
    if (!this.currentUser) return;
    $(".members-wrapper").append(this.currentUser.viewData);
  },
};
```

Теперь, когда наши цепочные методы определены, мы можем выполнять наш выразительный код следующим образом (точно так же, как это делается в jQuery):

```javascript
userController
  .findUser("test2@test2.com")
  .formatName()
  .createLayout()
  .displayUser();
```

## Почему стоит использовать каскадирование в JavaScript?

- **Не нужны временные переменные**, чтобы сохранять каждый шаг процесса. Например, без цепочки код будет выглядеть так:

```javascript
var aUser = userController.findUser("test@test.com");
var formatUserName = aUser.formatName();
var layoutHTML = formatUserName.createLayout();
userController.displayUser(layoutHTML);
```

- Каждая строка кода **чётко и лаконично выражает своё назначение**, особенно если имя каждого метода составлено глаголом.
- Код становится **более поддерживаемым**, поскольку у нас есть простые, лаконичные, специализированные методы.
- В целом, такой код легко читать, быстро набирать и комфортно понимать.

## Как работает цепочка методов в JavaScript?

Когда каждый метод возвращает `this`, возвращается весь объект, который вызвал метод. Выполнение происходит следующим образом:

```javascript
userController.findUser("test@testdd.com");
```

Поскольку мы вызываем метод `findUser` на объекте `userController`, и так как `findUser` возвращает `this` (объект, который его вызвал), весь объект `userController` возвращается и передаётся следующему методу в цепочке. Это происходит потому, что ключевое слово `this` внутри `findUser` содержит значение объекта, который его вызвал.

Поэтому далее выполняется:

```javascript
userController.formatName();
```

Аналогично, метод `formatName` возвращает объект `userController`, поэтому дальше следует:

```javascript
userController.createLayout();
```

Затем:

```javascript
userController.displayUser();
```

Таким образом, цепочка продолжается до тех пор, пока не будут выполнены все методы.

## Версия для "чайников"

_Каскадирование на простом примере, комментарий от редакции сайта._

### Что такое каскадирование (chainable methods)?

**Каскадирование** — это стиль написания кода, при котором можно вызывать **несколько методов подряд в одной строке**, вот так:

```javascript
obj.метод1().метод2().метод3();
```

Это делает код:

- **Читаемым**, как предложение
- **Лаконичным**
- **Удобным для использования**

Такой стиль часто используется в библиотеках, например, **jQuery**:

```javascript
$("#myDiv").hide().html("Привет!").show();
```

### Как это работает?

Всё просто:  
Каждый метод **возвращает `this`** — то есть **объект**, на котором он был вызван.

Так следующий метод может работать с тем же объектом.

**Пример:**

```javascript
let user = {
  name: "Петя",
  setName(name) {
    this.name = name;
    return this; // <-- возвращаем весь объект
  },
  logName() {
    console.log(this.name);
    return this;
  },
};
```

**Вызов:**

```javascript
user.setName("Вася").logName(); // Выведет "Вася"
```

### Зачем это нужно?

1. **Не нужны временные переменные**

   ```javascript
   // Без цепочки:
   let user = getUser();
   user.setName("Вася");
   user.save();

   // С цепочкой:
   getUser().setName("Вася").save();
   ```

2. **Код понятнее и логичнее**

   - Каждый метод делает что-то одно.
   - Всё выглядит как единый процесс.

3. **Меньше ошибок**
   - Меньше промежуточных переменных → меньше шансов запутаться.

### Как сделать свои цепочные методы?

Просто добавь `return this` в конце каждого метода:

```javascript
let calculator = {
  result: 0,

  add(n) {
    this.result += n;
    return this;
  },

  multiply(n) {
    this.result *= n;
    return this;
  },

  getResult() {
    return this.result;
  },
};

calculator.add(5).multiply(2).getResult(); // 10
```

### Итог

Каскадирование — это когда методы возвращают `this`, чтобы можно было вызывать их один за другим: `объект.метод1().метод2().метод3()`  
Это делает код **красивее**, **понятнее** и **удобнее в использовании**.
