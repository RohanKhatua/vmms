# Visitor and Meeting Management System

## Getting Started

1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Set up a local postgres database and update the .env file with the database credentials (Do this using Docker)
Run `docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`
4. Run `npx prisma migrate dev --name init` to migrate the schema to the database
5. Run `npm run dev` to start the development server
6. Visit `http://localhost:3000` to view the application
