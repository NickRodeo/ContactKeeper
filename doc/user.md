# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "Dinzz",
  "password": "Rahasia",
  "name": "Udin"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "Dinzz",
    "name": "Udin"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "username must not blank..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "Dinzz",
  "password": "Rahasia"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "Dinzz",
    "name": "Udin",
    "token": "uuid"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "username or password wrong..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :
X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": {
    "username": "Dinzz",
    "name": "Udin"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :
X-API-TOKEN : token

Request Body :

```json
{
  "password": "Rahasia2", //optional
  "name": "Udin2" //optional
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "Dinzz", //optional
    "name": "Udin2" //optional
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized..."
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :
X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized..."
}
```
