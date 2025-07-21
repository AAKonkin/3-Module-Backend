# Check-up of tasks:

## 4. Структура данных приложения

-   база данных на json-server
-   BFF
-   Redux Store

# Сущности приложения:

-   пользователь: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
-   роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), стор (использование на клиенте)
-   статья: БД (список статей), стор (отображение в браузере)
-   комментарий: БД (список комментариев), стор (отображение в браузере)

# Таблицы БД:

-   пользователи - users: id / login / password / registed_at / role_id
-   статьи - posts: id / title / image_url / content / published_at
-   роли - roles: id / name
-   комментарии - comments: id / author_id / post_id i/ content

# Схема состояния на BFF:

-   сессия текущего пользователя: login / password / role

# Схема для редакс стора (на клиенте):

-   user: id / login / roleld / session
-   posts: массив post: id / title / imageUrl / publishedAt / commentsCount
-   post: id / title / imageUrl Y content / publishedAt / comments: массив comment: id / author / content / publishedAt
-   users: массив user: id / login / registeredat / role

# Генерация картинок:

Ссылка: https://picsum.photos/280/150

# Генерация текста:

Ссылка: https://fishtext.ru/index.php
