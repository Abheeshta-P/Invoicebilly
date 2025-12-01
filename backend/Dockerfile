# 1) Build stage (Java 25 with Maven)
FROM maven:3.9.9-eclipse-temurin-25 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -q clean package -DskipTests

# 2) Runtime stage (Java 25 JDK)
FROM eclipse-temurin:25-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
