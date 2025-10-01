 //Mi App  (Actividad 6)//

Autor: Marlene Nielsen  
Stack: Gitbash . Angular 20 · TypeScript · Bootstrap 5

//Descripción//
Aplicación CRUD de usuarios: listado en grid, con botones detalle, actualizar , borrar,  creación/edición de mismo formulario y borrado con confirmación. Incluye paginación y navegación por rutas.

//Rutas principales//
/home — grid de usuarios con Ver / Editar / Eliminar y paginación
/user/:id — detalle (foto, correo, usuario)
/newuser — crear usuario (validaciones)
/updateuser/:id — actualizar usuario (mismo formulario)

//Requisitos//
Node.js LTS 
Angular CLI (`npm i -g @angular/cli`) o usar `npx`

//Ejecutar en desarrollo//
```bash
npm i
npm run dev   # abre http://localhost:5200