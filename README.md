# Requerimientos
- Contar con NodeJS y npm instalados.
- Contar con una BD SQL Server.
- Tener instalado @nestjs/cli (`npm install -g @nestjs/cli`)

# Inicializacion

1. Se debe de crear un archivo .env con los valores indicados en .env.example
2. Se deben de instalar las librerias con el comando `npm install`
3. Luego iniciar la bd ejecutando el comando: `npx prisma db seed && npx prisma migrate dev`
4. Como paso final se ejecuta el comando `nest start`

# Funcionalidades
1. Todos los endpoints se encuentran documentados en OpenAPI/Swagger en la direccion `localhost:3000/swagger`

	![imagen](https://i.ibb.co/tXPtPj7/image.png)

2. [POST] http://localhost:3000/usuarios

	Crea usuarios de la aplicación, la contraseña está encriptada
    
	```json
	{
		"codigoTrabajador": "TRAB12345",
		"nombre": "Juan Pérez",
		"correoElectronico": "juan.perez@example.com",
		"telefono": "+1234567890",
		"puesto": "Vendedor",
		"rolId": 1,
		"password": "securePassword123"
	}
	```

3. [POST] http://localhost:3000/auth/login
	
	Se ingresan los parametros de correo y contraseña, se verifica que sean las credenciales correctas y se devuelve un access token que podrá ser usado en los endpoints protegidos, teniendo que mandarse en la cabecera, se puede validar el token en el servicio `/auth/validate`.

	![imagen](https://i.ibb.co/dQQ4Lq1/imagen-2024-08-20-112025541.png)

4. [POST] http://localhost:3000/auth/validate

	Se encarga de validar el token para verificar que se haya enviado correctamente desde el cliente.
	
	Devuelve la data del cliente asociado al token.

	![imagen](https://i.ibb.co/2kRZrdy/imagen-2024-08-20-112147562.png)

5. [POST] http://localhost:3000/pedidos

	Crea un nuevo pedido en la aplicación. Es necesario especificar el ID del vendedor, el estado inicial del pedido y los productos asociados. Requiere que se pase un jwt valido como `Authorization` header

	```json
	{
		"vendedorId": 1,
		"estadoId": 1,
		"productos": [
			{ "productoId": 1, "cantidad": 2 },
			{ "productoId": 2, "cantidad": 1 }
		]
	}
	```

6. [PATCH] http://localhost:3000/pedidos/:id/estado

	Cambia el estado de un pedido existente. El ID del pedido se pasa como parámetro en la URL y el nuevo estado se especifica en el cuerpo de la solicitud. Requiere que se pase un jwt valido como `Authorization` header

	```json
	{
		"nuevoEstadoId": 2
	}
	```

# Buenas prácticas

- Uso de autenticación y autorización en la aplicación haciendo uso de JWT.
- Uso de seeds en bd para tener valores iniciales en estados de pedidos y roles de usuarios.
- Manejo central de excepciones en la aplicación haciendo uso de `exception.filter.ts`
- La aplicación usa el [2do framework más usado de NodeJS](https://share.stateofjs.com/share/prerendered?localeId=en-US&surveyId=state_of_js&editionId=js2023&blockId=backend_frameworks&params=&sectionId=other_tools)
- Al usar NestJS como framework se manejan buenas prácticas como 
  - Inyeccion de dependencias.
  - Modulos con responsabilidades únicas.
  - Uso de typescript.
- Se usan ESlint y Prettier que mejoran la consistencia y calidad del código, automatizando el formateo y detectando errores, lo que facilita el mantenimiento y colaboración.
- Se documentaron los endpoints haciendo uso del estandar Open API con la herramienta Swagger
