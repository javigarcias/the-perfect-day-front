![](src/img/logo.jpg)
![](https://visitor-badge.glitch.me/badge?page_id=javigarcias.the-perfect-day-front)

# The Perfect Day
_Este proyecto consiste en la creación de una aplicación web tipo red social, donde los usuarios podrán asignar una opinión y una valoración a un comercio determinado. Esta app se ha realizado pensando en distintos proveedores del sector nupcial, donde tanto los invitados al evento, como los propios creadores del evento podrán dejar su opinión y experiencia._

## Comenzando 🚀

_Para poder poner en funcionamiento el proyecto en tu maquina local con propositos de desarrollo y pruebas necesitarás instalar las siguiente dependencias:_

```
npm init -y
npm i sass react-router-dom axios redux react-redux

```
_Para ejecutar el programa en tu maquina local:_

```
npm start

```
## Ejecutando las pruebas ⚙️

* [The Perfect Day](https://the-perfect-day-front.herokuapp.com/)

### Components 📌
- /header:
    - Acceso directo a /home /review /login desde cualquier punto de la web
### Containers 📌
- /home:
    - Acceso directo a los diferentes tipos de proveedor
    - Filtrado por tipo de proveedor y ciudad
- /login:
    - Disponemos de dos campos para logearnos con email y password correspondiente
    - Si no estamos registrados, disponemos de un acceso directo para registrarse
- /register:
    - Introducimos los datos de registro y nos redirecciona a /login para logearnos por primera vez.
- /profile:
    - Una vez logueados, accederemos al apartado perfil, donde aparecerán las opiniones publicadas.
- /review:
    - Podremos publicar una opinión de un proveedor determinado.
    - Disponemos de un input donde buscar el provvedor que queremos realizar la valoración el cual, en el momento de introducir por teclado irá buscando coincidencias.
- /opinion:
    - Aparece las opiniones que tiene asignadas el proveedor seleccionado previamente.
- /restaurant /photographers /florist /beauty
    - Son las vistas creadas para mostrar todos los comercios filtrados según su tipo.

### REGEX 📋
 - EMAIL: formato valido
 - PASSWORD: 
    -8/10 caracteres
    -Uso de mayúsculas y minúsculas
    -Uso de al menos un carácter especial

## Construido con 🛠️

_Tecnologías utilizadas en el proyecto_

- Javascript
- NodeJS
- React
- Redux
- SASS
- Git

_Librerías utilizadas en el proyecto_

- axios
- regex

_Herramientas utilizadas en el proyecto_

- Git Flow
- GitHub
- Heroku
- React Developer Tools
- Redux DevTools
- Trello

## Autor ✒️

* **Javier García**  - [javigarcias](https://github.com/javigarcias)

---
⌨️ con ❤️ por [JaviGarcia](https://www.linkedin.com/in/javigarciasanchez/) 😊