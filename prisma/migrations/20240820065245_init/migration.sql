BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[usuarios] (
    [id] INT NOT NULL IDENTITY(1,1),
    [codigoTrabajador] NVARCHAR(1000) NOT NULL,
    [nombre] NVARCHAR(1000) NOT NULL,
    [correoElectronico] NVARCHAR(1000) NOT NULL,
    [telefono] NVARCHAR(1000) NOT NULL,
    [puesto] NVARCHAR(1000) NOT NULL,
    [rolId] INT NOT NULL,
    CONSTRAINT [usuarios_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [usuarios_codigoTrabajador_key] UNIQUE NONCLUSTERED ([codigoTrabajador])
);

-- CreateTable
CREATE TABLE [dbo].[roles] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [roles_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [roles_nombre_key] UNIQUE NONCLUSTERED ([nombre])
);

-- CreateTable
CREATE TABLE [dbo].[pedidos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nroPedido] NVARCHAR(1000) NOT NULL,
    [fechaPedido] DATETIME2 NOT NULL,
    [fechaRecepcion] DATETIME2,
    [fechaDespacho] DATETIME2,
    [fechaEntrega] DATETIME2,
    [vendedorId] INT NOT NULL,
    [repartidorId] INT,
    [estadoId] INT NOT NULL,
    CONSTRAINT [pedidos_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [pedidos_nroPedido_key] UNIQUE NONCLUSTERED ([nroPedido])
);

-- CreateTable
CREATE TABLE [dbo].[estados] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [estados_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [estados_nombre_key] UNIQUE NONCLUSTERED ([nombre])
);

-- CreateTable
CREATE TABLE [dbo].[productos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [sku] NVARCHAR(1000) NOT NULL,
    [nombre] NVARCHAR(1000) NOT NULL,
    [tipo] NVARCHAR(1000) NOT NULL,
    [precio] FLOAT(53) NOT NULL,
    [unidadMedida] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [productos_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [productos_sku_key] UNIQUE NONCLUSTERED ([sku])
);

-- CreateTable
CREATE TABLE [dbo].[etiquetas] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [etiquetas_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [etiquetas_nombre_key] UNIQUE NONCLUSTERED ([nombre])
);

-- CreateTable
CREATE TABLE [dbo].[etiquetas_productos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [productoId] INT NOT NULL,
    [etiquetaId] INT NOT NULL,
    CONSTRAINT [etiquetas_productos_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [etiquetas_productos_productoId_etiquetaId_key] UNIQUE NONCLUSTERED ([productoId],[etiquetaId])
);

-- CreateTable
CREATE TABLE [dbo].[pedidos_productos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [pedidoId] INT NOT NULL,
    [productoId] INT NOT NULL,
    [cantidad] INT NOT NULL,
    CONSTRAINT [pedidos_productos_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [pedidos_productos_pedidoId_productoId_key] UNIQUE NONCLUSTERED ([pedidoId],[productoId])
);

-- AddForeignKey
ALTER TABLE [dbo].[usuarios] ADD CONSTRAINT [usuarios_rolId_fkey] FOREIGN KEY ([rolId]) REFERENCES [dbo].[roles]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[pedidos] ADD CONSTRAINT [pedidos_vendedorId_fkey] FOREIGN KEY ([vendedorId]) REFERENCES [dbo].[usuarios]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pedidos] ADD CONSTRAINT [pedidos_repartidorId_fkey] FOREIGN KEY ([repartidorId]) REFERENCES [dbo].[usuarios]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pedidos] ADD CONSTRAINT [pedidos_estadoId_fkey] FOREIGN KEY ([estadoId]) REFERENCES [dbo].[estados]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[etiquetas_productos] ADD CONSTRAINT [etiquetas_productos_productoId_fkey] FOREIGN KEY ([productoId]) REFERENCES [dbo].[productos]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[etiquetas_productos] ADD CONSTRAINT [etiquetas_productos_etiquetaId_fkey] FOREIGN KEY ([etiquetaId]) REFERENCES [dbo].[etiquetas]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[pedidos_productos] ADD CONSTRAINT [pedidos_productos_pedidoId_fkey] FOREIGN KEY ([pedidoId]) REFERENCES [dbo].[pedidos]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[pedidos_productos] ADD CONSTRAINT [pedidos_productos_productoId_fkey] FOREIGN KEY ([productoId]) REFERENCES [dbo].[productos]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
