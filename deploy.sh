echo "Iniciando despliegue"
#git pull

CID=$(docker ps -aqf "name=postventa-api")
echo $CID

echo "Detendiendo contenedor"
docker stop $CID

echo "Borrando contenedor"
docker rm $CID

echo "Borrando imagen"
docker rmi postventa-api:v1
docker build -t postventa-api:v1 .
docker run -p 3000:3000 --network postventa-network --name postventa-api -d postventa-api:v1

echo "Terminando despliegue"
