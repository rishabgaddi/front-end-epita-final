# Movie Application - ReactJS

This is a simple movie application that allows users to view latest movies and rate them. The application is built using ReactJS and Redux.
This application was built as part of final project at EPITA.

## Installation

To install the application, run the following commands:

```
yarn install
yarn start
```

## Testing

To run the tests, run the following command:

```
yarn test
```

## Deployment

To deploy the application, run the following commands:

```
yarn build
yarn start:prod
```

## Technical Details

- The application is built using ReactJS, Redux and TypeScript.
- The application is connected to two backend services:
  - Spring Boot backend service that provides the user and seen movie data.
  - NodeJS backend service that provides the movie and rating data.
- The application uses i18next for internationalization.
- The application uses styled components for styling.
- The application uses React Router for routing.
- The application uses Jest for testing.
- The application uses ESLint and Prettier for linting and formatting.
- The application uses Husky for pre-commit hooks.
- Environment variables are used to configure the application.
  - The environment variables are defined in the `.env` file.
  - The environment.local variables are defined in the `.env.local` file which are an example of the environment variables.
  - Update the environment variables in the `.env.local` file to match your environment.
- An implementation to use the API GATEWAY is also provided.
- The Authentication currently is done through Keycloak.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Authors

[Rishab Gaddi](https://rishabgaddi.github.io/)
