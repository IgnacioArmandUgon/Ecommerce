## Crear imagen de docker y base de datos local

```
docker-compose up -d
```

_El -d significa **detached** y ejecutará el proceso en segundo plano, dejandote la consola libre_

## MongoDB url local

```
mongodb://localhost:27017/ecommercedb
```

## Reconstruir los modulos de node

```
yarn install
yarn dev
```

## Llenar la base de datos con información de prueba

```
http://localhost:3000/api/seed
```
