# carapp-backend
In order to run the application properly, you'll need to set up a MySQL database.
The application is using the dotenv library, where you can set up your MySQL config.
Your .env file should look like this.
```
DB_HOST=*your dbhost*
DB_USER=*root by default*
DB_PASS=*user's password*
DB_NAME=*database name*
SECRET_KEY=*JSON webtoken secret key*
```

Additional informations about the dotnev library:
https://www.npmjs.com/package/dotenv
