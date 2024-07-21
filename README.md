# Docker Compose for PostgreSQL

This repository contains a `docker-compose.yml` file to set up a PostgreSQL database using Docker Compose. This setup will run a PostgreSQL container, which can be used for development and testing purposes.

## Prerequisites

Before you start, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Services

### PostgreSQL

- **Container Name:** `container-pg`
- **Image:** `postgres`
- **Hostname:** `localhost`
- **Ports:** `5432:5432`
- **Environment Variables:**
  - `POSTGRES_USER`: `admin`
  - `POSTGRES_PASSWORD`: `root`
  - `POSTGRES_DB`: `test_db`
- **Volumes:**
  - `postgres-data:/var/lib/postgresql/data`
- **Restart Policy:** `unless-stopped`

## Getting Started

1. **Clone the Repository**

   ```sh
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Start the Services**

   Run the following command to start the PostgreSQL container:

   ```sh
   docker-compose up -d
   ```

   The `-d` flag runs the containers in detached mode.

3. **Access PostgreSQL**

   Once the container is up and running, you can access the PostgreSQL database using any PostgreSQL client. Use the following credentials:

   - **Host:** `localhost`
   - **Port:** `5432`
   - **Username:** `admin`
   - **Password:** `root`
   - **Database Name:** `test_db`

4. **Stop the Services**

   To stop and remove the containers, networks, and volumes, run:

   ```sh
   docker-compose down
   ```

## Persistent Data

The PostgreSQL data is stored in a Docker volume named `postgres-data`. This ensures that your data persists even if the container is removed.

## Restart Policy

The `restart: unless-stopped` policy ensures that the PostgreSQL container will automatically restart unless it is explicitly stopped.

## Customization

If you need to change any configuration, such as database credentials or port mappings, you can modify the `docker-compose.yml` file accordingly.

## Troubleshooting

If you encounter any issues, you can check the logs of the PostgreSQL container by running:

```sh
docker-compose logs postgres
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any questions or support, please open an issue in the repository.
