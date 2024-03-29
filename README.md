# Star Wars planet management system Project
This repository contains a Dockerized Star Wars project for easier execution. Below, you will find a step-by-step guide to set up and run the project.

## Prerequisites
* Docker (version 23.0.1 or higher)
* Docker Compose

## Configuration
1. Clone this repository to your local machine:
```bash
git clone https://github.com/SasePriv/star_wars_planet_management.git
```

2. Navigate to the project's root directory:
```bash
cd star-wars-project
```

3. Create a .env file in the project's root directory with the following parameters:
```
VITE_STAR_WARS_ENDPOINT=https://swapi.dev/api
```
The VITE_STAR_WARS_ENDPOINT parameter defines the endpoint of the Star Wars API to be used in the project.

## Running the Project

1. Execute the following command to build and run the Docker containers:
```bash
docker-compose up
```
This will start the necessary Docker containers for the project and run the application.

2. Open your web browser and visit http://localhost:8000 to access the Star Wars application.

3. Enjoy exploring the Star Wars galaxy!

## Stopping the Project
To stop and remove the Docker containers for the project, simply press Ctrl + C in the terminal where docker-compose up is running. This will shut down the containers and free up the used resources.

## How to execute the test
1. Enter in the bash of container
```bash
docker exec -it vite_docker sh
```
2. And run the following command 
```bash
npm test
```

## To do
* Sort the list of planets by name, diameter, climate, terrain or population.
* Adding more test cases