README.md
markdown
Copiar código
# Demostración de DevOps NodeJs

Esta es una aplicación sencilla para utilizar en las pruebas técnicas de DevOps.

## Empezando

### Prerrequisitos

- Node.js 18.15.0

### Instalación

1. Clonar este repositorio.

```bash
git clone https://bitbucket.org/devsu/demo-devops-nodejs.git
Instalar dependencias.
bash
Copiar código
npm i
Base de datos
La base de datos se genera como un archivo en la ruta principal cuando se ejecuta el proyecto por primera vez y su nombre es dev.sqlite.

Considere dar permisos de acceso al archivo para su correcto funcionamiento.

Uso
Para ejecutar pruebas puedes usar este comando.
bash
Copiar código
npm run test
Para ejecutar localmente el proyecto puedes utilizar este comando.
bash
Copiar código
npm run start
Abra http://localhost:8000/api/users con su navegador para ver el resultado.

Nuevas Rutas
Ruta Principal
Método: GET
URL: /
Respuesta:
text
Copiar código
Bienvenido a la ruta principal de Devsu  candidato: Carlos Bejarano  correo: cebm.programmer@gmail.com !
Ruta de Health Check
Método: GET
URL: /healthcheck
Respuesta:
json
Copiar código
{
  "status": "OK"
}
Docker
Dockerfile
Este proyecto incluye un Dockerfile para facilitar la creación de un contenedor Docker.

dockerfile
Copiar código
# Usa una imagen base oficial de Node.js
FROM node:18.15.0

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al directorio de trabajo
COPY . .

# Establece variables de entorno (si es necesario)
ENV NODE_ENV=production

# Expone el puerto en el que la aplicación estará escuchando
EXPOSE 8000

# Define el comando que se ejecutará cuando el contenedor se inicie
CMD ["node", "index.js"]
Construcción y Ejecución del Contenedor
Para construir y ejecutar el contenedor Docker, use los siguientes comandos:

Construir la imagen Docker
bash
Copiar código
docker build -t demo-devops-nodejs .
Ejecutar el contenedor Docker
bash
Copiar código
docker run -p 8000:8000 demo-devops-nodejs
Abra http://localhost:8000/api/users con su navegador para ver el resultado.

Pipelines
Este proyecto incluye dos pipelines configurados con GitHub Actions.

Pipeline de Build y Deploy
Este pipeline se ejecuta en cada push a la rama main y realiza las siguientes acciones:

Compila la imagen Docker
Etiqueta la imagen Docker
Publica la imagen Docker en Amazon ECR
Actualiza el servicio de Amazon ECS con la nueva imagen
yaml
Copiar código
name: Build and Deploy

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Set up AWS CLI
      uses: aws-actions/configure-aws-credentials@v3
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ${{ secrets.AWS_REGION }}

    - name: Log in to Amazon ECR
      id: login-ecr
      uses: aws-actions/amazon-ecr-login@v2

    - name: Build the Docker image
      run: |
        IMAGE_TAG=my-image-name:latest
        docker build . --file Dockerfile --tag $IMAGE_TAG

    - name: Tag Docker image
      run: |
        IMAGE_TAG=my-image-name:latest
        docker tag $IMAGE_TAG ${{ secrets.ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/${{ secrets.ECR_REPOSITORY }}:latest

    - name: Push Docker image to ECR
      run: |
        docker push ${{ secrets.ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/${{ secrets.ECR_REPOSITORY }}:latest

    - name: Update ECS service with new image
      run: |
        aws ecs update-service --cluster ${{ secrets.ECS_CLUSTER_NAME }} --service ${{ secrets.ECS_SERVICE_NAME }} --force-new-deployment
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: ${{ secrets.AWS_REGION }}
Pipeline de Pruebas en Pull Requests
Este pipeline se ejecuta en cada pull request a la rama main y realiza las siguientes acciones:

Instala las dependencias
Ejecuta las pruebas unitarias
yaml
Copiar código
name: pull-request-ci

on:
  pull_request:
    branches: [ "main" ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '22'

    - name: Install dependencies
      run: npm install

    - name: Run unit tests
      run: npm test

    # Uncomment and configure the following steps to use SonarQube for SAST
    # - name: Set up SonarQube Scanner
    #   uses: sonarsource/sonarcloud-github-action@v1.9.0

    # - name: Run SonarQube Scanner
    #   env:
    #     SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
    #   run: |
    #     sonar-scanner \
    #       -Dsonar.projectKey=your_project_key \
    #       -Dsonar.organization=your_organization_key \
    #       -Dsonar.sources=. \
    #       -Dsonar.host.url=https://sonarcloud.io \
    #       -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
Licencia
Copyright © 2023 Devsu. Todos los derechos reservados.