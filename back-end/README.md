# ***API INVITATIONS***

The API was created for authenticating users with **JWT** and register information in **Mongo Db**.

## Installation

Clone repository
```shell
git clone https://github.com/ErikVillarreal-bit/
```
Install dependencies
```shell
npm install
```
Get in the folder
```shell
cd projectname
```

Configure .Env

In the `root` of the project create an `.env ` file to configure the environment variables. Replace the 'XXXXXX' with yor own credetials.

```shell
#Credentials for db
DBUSER = XXXXXX
DBPASSWORD = XXXXXX

#Secret for the jwt
TOKEN_SECRET = XXXXXX
```

Start server
```shell
npm run dev
```

> # **Note**  
> Don´t forget to put your **own credentials** to configure the database connection.  
> In this case **MongoDb Cloud** was used to start the database, this credentials are configured when you start  a database  in MongoDB Cloud.