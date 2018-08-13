
Make sure you have PostgreSql, pgAdmin, NodeJs and NPM already installed before you start.
PostgreSQL and pgAdmin tutorial: 
http://www.indjango.com/ubuntu-install-postgresql-and-pgadmin/
NodeJs and NPM tutorial:
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04


1. Clone the repo using this command:
`git clone ...`

2. Then go to the cloned directory and install dependences using this command:
`npm install`

3. Install Sequelize CLI using this command:
`npm install -g sequelize-cli`

4. Create database using this command:
`createdb assist-teach-me`

5. Set your postgresql username and password inside server/config/config.json file

6. Run migrations using this command: 
`sequelize db:migrate`

If you don't get any errors you set the config file correct and you should have a "Tests" table inside your "assist-teach-me" db.

7. To run the app use this command:
`npm run start:dev`

Now you can check the example routes from routes/index.js in POSTMAN

Other tutorials: 
- ToDo App using Node, Express And PostgreSQL: https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
- Authentication tutorial (Ignore mongoose part, use sequelize/postgreSQL):
https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
- Hashing passwords tutorial: 
https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt