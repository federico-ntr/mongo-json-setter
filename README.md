## Not ready for production yet
### This utility has only basic functionality and is missing checks on passed args
# Mongo JSON Setter
A small utility to create a database with collections and documents based on a given JSON file with the wanted configuration.

```
mongo-setup ./path/to/your/json
```

Inside your config file you have to specify host and port of your MongoDB instance, along with the database name and the
collections' array. Refer to the following example:
```json5
// example.json

{
  "host": "localhost",
  "port": "27017",
  "db_name": "example",
  "collections": [
    {
      "name": "collection1",
      "fields": {
        "foo": "bar",
        "john": "doe"
      }
    },
    {
      "name": "collection2",
      "fields": {
        "title": "Never Gonna Give You Up",
        "artist": "Rick Astley",
        "album": "Whenever You Need Somebody",
        "genre": "Dance pop",
        "label": "RCA",
        "formats": [
          {
            "type": "Vinyl",
            "sizes": ["7 inches, 12 inches"]
          },
          {
            "type": "CD"
          }
        ]
      }
    }
  ]
}
```