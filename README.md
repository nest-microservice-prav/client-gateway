## Cliente Gateway

El gateway es el punto de comunicacion entre los clientes y los servicios que estan sirviendo por detras. Es el encargado de recibir las peticiones, enviarlas a los servicios correcpondientes y posteriormente devolver la respuesta al cliente que lo solicito.

## Desarrollo

1.- Clonal el repositorio
2.- Instalar dependencias
3.- Crear un archivo `.env` basado en `.env-template`
4.- Tener levantados los servicios que van a servir
5.- Levantar el proyecto con `npm run start:dev`

## Nats
```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```

