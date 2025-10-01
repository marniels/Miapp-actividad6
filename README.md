 //Mi App  (Actividad 6)//

Autor: Marlene Nielsen  
Stack: Gitbash . Angular 20 · TypeScript · Bootstrap 5

//Descripción//
Aplicación CRUD de usuarios: listado en grid, acciones de **detalle**, **actualizar**, **borrar**, y **creación/edición** usando el mismo formulario. Incluye paginación y navegación por rutas.

//Rutas principales//
- `/home` — Grid de usuarios con acciones Ver / Editar / Eliminar y paginación
- `/user/:id` — Detalle (foto, correo, usuario)
- `/newuser` — Crear usuario (validaciones)
- `/updateuser/:id` — Actualizar usuario (mismo formulario reutilizado)

//Requisitos//
Node.js LTS 
Angular CLI (`npm i -g @angular/cli`) o usar `npx`

//Ejecutar en desarrollo//
```bash
npm i
npm run dev   # o ng serve -o si usas Angular CLI


//Pantallazos//
- `src/assets/capturas/home.png`
  - `src/assets/capturas/detalle.png`
  - `src/assets/capturas/actualizar.png`
  - `src/assets/capturas/nuevo-usuario.png`
  - `src/assets/capturas/borrar-usuario.png`