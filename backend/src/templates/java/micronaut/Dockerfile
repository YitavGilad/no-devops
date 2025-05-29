# Micronaut Dockerfile
FROM gradle:8.2.1-jdk17 as builder
WORKDIR /app
COPY . .
RUN gradle assemble
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
