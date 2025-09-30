 //Mi App  (Actividad 6)//

**Autor:** Marlene Nielsen  
**Stack:** Creada con Gitbash, Angular 20 · TypeScript · Bootstrap 5


 //Descripción//
Aplicación CRUD de usuarios: listado en grid, detalle, creación/edición en mismo formulario y borrado con confirmación. Incluye paginación y navegación por rutas.


//Requisitos//
- Node.js (LTS recomendado)
- Angular CLI (`npm i -g @angular/cli`) o usar `npx`


//Rutas//
/home — grid de usuarios (Ver / Editar / Eliminar) + paginación
/user/:id — detalle (foto, correo, usuario)
/newuser — crear usuario (validaciones)
/updateuser/:id — actualizar usuario



//Notas de la API//
Se usa una API pública de demostración; a veces no guarda cambios. Tras crear/editar se muestra aviso y se regresa al inicio(Home).



 //Ejecutar en desarrollo//
```bash
npm i
npm run dev   # abre http://localhost:5200
