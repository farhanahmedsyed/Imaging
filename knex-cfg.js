module.exports =
{
    pg:
	{
		client: "pg",
		connection: 
		{
			host    : 'localhost',
			user    : 'imaging',
			password: 'test',
			database: 'postgres',			
			port: 5432,			
		},
		debug: false
	},
    sqlite:
    {
        client: "sqlite3",
        connection:
        {
            filename:"./LoaderDB.db",

        }
    }
}