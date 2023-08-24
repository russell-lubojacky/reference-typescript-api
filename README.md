# Reference TypeScript API

I wanted to create an API written in TypeScript that I can reference for future projects. The goal is to have a production ready API that integrates with a backend database and runs CRUD operations. I want to include best practices for:
* Project Structure
* Consistent Error Handling
* Strongly Typed API Request/Response
* Use Middleware for Common Tasks
* Automated Testing
* Validation
* Configuration Management
* Logging
* Rate Limiting and Security
* Consistent Naming Conventions

## Getting Started

### Installation
1. Clone the repository:
    ```bash
    git clone git@github.com:russell-lubojacky/trails-api.git trails-api
    cd trails-api
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the project root with the following variables:
    ```env
    DATABASE_URL=your_database_url
    ```
4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints
* `GET /api/trails`: Retrieves a list of all the trails.
* `POST /api/trails`: Creates a new trail.
* `GET /api/trails/:id`: Retrieves a specific trail by its ID.
* `DELETE /api/trails/:id`: Deletes a specific trail by its ID.

## Tests
Run the test suite using:
```bash
npm test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.