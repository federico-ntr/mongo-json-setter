## Not ready for production yet
### This utility has only basic functionality and is missing checks on passed args
# Mongo JSON Setter
A small utility to create a database with collections and documents based on a given JSON file with the wanted configuration.

Install globally with :
```
npm install -g mongo-json-setter
```
Use it with:
```
mongo-setup ./path/to/your/json
```
Pass `--help` or `-h` instead of the json to see the help 
or `--example` for a demo on your local instance based on the config file below.

Inside your config file you have to specify host and port of your MongoDB instance, along with the database name and the
collections' array. Refer to the following example:
```json5
// complete example in example.json

{
  "host": "localhost",
  "port": "27017",
  "db_name": "example",
  "collections": [
    {
      "name": "collection1",
      "documents": [
        {
          "foo": "bar",
          "john": "doe"
        }
      ]
    },
    {
      "name": "collection2",
      "documents": [
        {
          "title": "Never Gonna Give You Up",
          "artist": "Rick Astley",
          "album": "Whenever You Need Somebody",
          "genre": "Dance pop",
          "label": "RCA",
          "formats": [
            //...
          ]
        },
        {
          //...
        }
      ]
    }
  ]
}
```