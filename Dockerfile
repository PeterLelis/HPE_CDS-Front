# Etapa 1: Construcción
FROM node:14 AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json ./

# Instalar dependencias
RUN npm install -g @angular/cli@8 && npm install

# Copiar el resto del código fuente al contenedor
COPY . .

# Construir la aplicación en modo producción
RUN ng build --prod

# Etapa 2: Servidor web
FROM nginx:alpine

# Copiar los archivos generados por Angular al directorio que Nginx sirve
COPY --from=build /app/dist/angular-user-registration-and-login-example /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
