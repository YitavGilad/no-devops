# Quarkus Dockerfile
FROM quay.io/quarkus/quarkus-micro-image:2.16
WORKDIR /work/
COPY . .
RUN ./mvnw package -Pnative -Dquarkus.native.container-build=true
EXPOSE 8080
CMD ["/work/target/*-runner"]
