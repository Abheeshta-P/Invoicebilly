# 1) Build stage – Maven + Java 25
FROM maven:3.9.11-eclipse-temurin-25-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -q clean package -DskipTests && ls -R .

# 2) Runtime stage – Java 25
FROM eclipse-temurin:25-jdk-alpine
WORKDIR /app
COPY --from=build /app/backend/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
