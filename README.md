# Docker Compose for PostgreSQL and Express.js API

This repository contains a `docker-compose.yml` file to set up a PostgreSQL database and an Express.js API using Docker Compose. This setup will run both a PostgreSQL container and an API container, which can be used for development and testing purposes.

## Prerequisites

Before you start, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Services

### PostgreSQL

- **Container Name:** `db`
- **Image:** `postgres:16`
- **Hostname:** `localhost`
- **Ports:** `5432:5432`
- **Environment Variables:**
  - `POSTGRES_USER`: `admin`
  - `POSTGRES_PASSWORD`: `root`
  - `POSTGRES_DB`: `test_db`
- **Volumes:**
  - `postgres-data:/var/lib/postgresql/data`
- **Restart Policy:** `unless-stopped`

### Express.js API

- **Container Name:** `api`
- **Image:** `node:14`
- **Hostname:** `localhost`
- **Ports:** `3000:3000`
- **Environment Variables:**
  - `DB_HOST`: `db`
  - `DB_PORT`: `5432`
  - `DB_USER`: `admin`
  - `DB_PASSWORD`: `root`
  - `DB_NAME`: `test_db`
- **Depends On:** `db` (ensures that the PostgreSQL service is running before the API starts)
- **Restart Policy:** `unless-stopped`

## Getting Started

1. **Clone the Repository**

   ```sh
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Build and Start the Services**

   Run the following command to build and start both the PostgreSQL and Express.js API containers:

   ```sh
   docker-compose up --build -d
   ```

   The `--build` flag ensures that the Docker images are rebuilt, and the `-d` flag runs the containers in detached mode.

3. **Access the Express.js API**

   Once the containers are up and running, you can access the API at:

   - **URL:** `http://localhost:3000/`

   The API will be running and accessible on port `3000`. You can interact with the API using tools like `curl`, `Postman`, or directly in your browser.

4. **Access PostgreSQL**

   You can access the PostgreSQL database using any PostgreSQL client with the following credentials:

   - **Host:** `localhost`
   - **Port:** `5432`
   - **Username:** `admin`
   - **Password:** `root`
   - **Database Name:** `test_db`

5. **Stop the Services**

   To stop and remove the containers, networks, and volumes, run:

   ```sh
   docker-compose down
   ```

## Persistent Data

The PostgreSQL data is stored in a Docker volume named `postgres-data`. This ensures that your data persists even if the container is removed.

## Customization

If you need to change any configuration, such as database credentials, port mappings, or API settings, you can modify the `docker-compose.yml` file accordingly.

## Troubleshooting

- **PostgreSQL Logs:** If you encounter any issues with PostgreSQL, check the logs by running:

  ```sh
  docker-compose logs db
  ```

- **API Logs:** If you encounter any issues with the API, check the logs by running:

  ```sh
  docker-compose logs api
  ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any questions or support, please open an issue in the repository.
