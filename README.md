# rest-to-graphql

OpenAPI Specification(OAS)를 제공하는 REST API를 GraphQL 서버로 쉽게 구현할 수 있습니다.

Apollo Server + Fastify 기반으로 구성되어 있습니다.

## 주요 기술 스택

[Apollo Server](https://www.apollographql.com/docs/apollo-server/)

[Fastify](https://fastify.dev/)

[GraphQL Tools](https://the-guild.dev/graphql/tools)

[GraphQL Scalars](https://the-guild.dev/graphql/scalars)

[OpenAPI-to-GraphQL](https://github.com/IBM/openapi-to-graphql)

## Getting Started

### 로컬 개발 서버 실행

브라우저에서 https://localhost:4000/ 로 API 문서와 쿼리를 수행해 볼 수 있습니다.

```
# Runs the app in the local mode.
yarn local
```

### 환경 별 서버 실행 명령

Apollo 서버를 실행합니다. port는 4000번을 노출합니다.

```
yarn start
```
