# Requerimientos
  - Contar con NodeJS y npm instalados.
  - Contar con una BD SQL Server

# Inicializacion
  1. Se debe de crear un archivo .env con los valores indicados en .env.example
  2. Se deben de instalar las librerias con el comando `npm install`
  3. Luego iniciar la bd ejecutando el comando: `npx prisma migrate dev`

# Funcionalidades
Se tienen los siguientes endpoints:

1. [POST] http://localhost:3000/usuarios

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

2. [POST] http://localhost:3000/auth/login
	
	Se ingresan los parametros de correo y contraseña, se verifica que sean las credenciales correctas y se devuelve un access token que podrá ser usado en los endpoints protegidos, teniendo que mandarse en la cabecera, se puede validar el token en el servicio `/auth/validate`.

	![imagen](https://i.ibb.co/dQQ4Lq1/imagen-2024-08-20-112025541.png)

3. [POST] http://localhost:3000/auth/validate

	Se encarga de validar el token para verificar que se haya enviado correctamente desde el cliente.
	
	Devuelve la data del cliente asociado al token.

	![imagen](https://i.ibb.co/2kRZrdy/imagen-2024-08-20-112147562.png)

4. [POST] http://localhost:3000/pedidos

	Crea un nuevo pedido en la aplicación. Es necesario especificar el ID del vendedor, el estado inicial del pedido y los productos asociados.

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

5. [PATCH] http://localhost:3000/pedidos/:id/estado

	Cambia el estado de un pedido existente. El ID del pedido se pasa como parámetro en la URL y el nuevo estado se especifica en el cuerpo de la solicitud.

	```json
	{
		"nuevoEstadoId": 2
	}
	```