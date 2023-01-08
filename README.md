# Brand Meal API with NestJS + Objection.js

This is a simple API that allows an admin to create, delete and edit meal addons to a brand

## Prerequisites

## Hot to run

- `npm i`
- `npm run run:pg-docker`
- `npm run migrate && npm run seed`
- `npm run start`

API is accessible at `http://localhost`

## Example API requests

### Themes

```bash
# findAll
curl http://localhost:3001/api/themes

# findOne
curl http://localhost:3001/api/themes/1

# create
curl -X POST http://localhost:3001/api/themes -d '{ "name": "my"  }' -H "Content-Type: application/json"

# update
curl -X PUT http://localhost:3001/api/themes/6 -d '{ "name": "baz", "fontFamily": "DejaVu Sans Mono"  }' -H "Content-Type: application/json"

# delete
curl -X DELETE http://localhost:3001/api/themes/6
```

### Brands

```bash
# findAll
curl http://localhost:3001/api/brands  -H "Authorization: Bearer <Auth Token>"

# findOne
curl http://localhost:3001/api/brands/1  -H "Authorization: Bearer <Auth Token>"

# create
curl -X POST http://localhost:3001/api/brands -d '{ "name": "foobar"  }' -H "Content-Type: application/json"   -H "Authorization: Bearer <Auth Token"

# delete
curl -X DELETE http://localhost:3001/api/brands/6  -H "Authorization: Bearer <Auth Token>"
```

### Addons

```bash
# findAll
curl http://localhost:3001/api/brands/1/addons  -H "Content-Type: application/json"  -H "Authorization: Bearer <Auth Token>"

# findOne
curl http://localhost:3001/api/brands/1/addons/1  -H "Content-Type: application/json"  -H "Authorization: Bearer <Auth Token>"

# create
curl -X POST http://localhost:3001/api/brands/1/addons -d '{ "name": "foobar", "description": "bar", "price": 3000, "category": "foo" }' -H "Content-Type: application/json"  -H "Authorization: Bearer <Auth Token>"

# delete
curl -X DELETE http://localhost:3001/api/brands/2/addons/1  -H "Content-Type: application/json"  -H "Authorization: Bearer <Auth Token>"

