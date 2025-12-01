# Use official Eclipse Temurin Java 25 runtime image
FROM eclipse-temurin:25-jdk-alpine

# Argument for jar file location
ARG JAR_FILE=target/*.jar

# Copy jar into container
COPY ${JAR_FILE} app.jar

# Run the jar
ENTRYPOINT ["java","-jar","/app.jar"]
