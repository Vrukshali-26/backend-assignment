# Datifyy - BE assignment

## Objective:

Design and implement a secure backend API using any programming language of your choice (e.g., Node.js, Python, Java) with PostgreSQL as the database. The API should provide user registration (sign up) and authentication (login) endpoints. Additionally, implement rate limiting on a specific secure endpoint to enhance security.

## How to Implement this on your local machine?

You will need to clone this repository and create .env file and set up all env vars (replace this with your env variables) (you can use Database on cloud)

```
ENV = "developement"
DATABASE_URL="postgresql://username:password@postgres_url:port/sample_db?schema=public"
PORT = port
JWT_SECRET = S3CrEt
```

#### Once that's done, you can use the following commands to run the app locally:

```
npm install
npx prisma migrate dev --name init
npm run dev
```

### Additionally you can create docker image and deploy it to any cloud(AWS)

```
docker build -t <name> .
docker run -d -p <port>:3000 <image>
```

## API Endpoints

- Sign Up: `/api/users/signup` = Pass username, email, password in body to create the user:

```
{
    "username": "xyz",
    "email": "xyz@email.com",
    "password": "xyzpassword"
}

Returns:

{
    "message": "User created successfully",
}
```

- Login: `/api/users/login` = Pass username, password in body to login:

```
{
    "username": "xyz",
    "password": "xyzpassword"
}

Returns:

{
    "message": "User logged in successfully",
    "token": "TOKEN"
}
```

### Secure EndPoint

To demonstrate secure endpoint I have created a basic application to perform `CRUD` operations. In this example application you can create, read, update and delete goals and this is the secure endpoint where you need to pass authorization header. The token generated in the login needs to be passed in the header to be able to access this private endpoints.

- POST `/api/goals` = Create a goal

```
{
    "title": "Goal"
}
```

- GET `/api/goals` = Get all the goals created

```
{
    "message": [here you will get all your goals]
}
```

- PUT `/api/goals/:id` = Update a particular goal (you need to pass the id of the goal that you want to update)

```
{
    "title": "Updated Goal"
}
```

- DELETE `/api/goals/:id` = Delete a particular goal (you need to pass the id of the goal that you want to update)

```
{
    "message": [information about deleted goal]
}
```

### Rate Limiting Strategy

Implemented rate limiting using `express-rate-limit` library. In this I have defined the maximum number of request a user can make to an API within 1 minute time frame. If it exceeds the limit then send message "Too many requests"

```
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 20, // Max X requests per minute
  message: "Too many requests, please try again later.",
});
```

### Built with

- JavaScript
- Node.js
- Prisma
- Docker
