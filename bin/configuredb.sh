#!/bin/bash

echo "Configuring database: blogger_server"

cd bin
chmod +x configuredb.sh
cd ..
# dropdb -U postgres blogger_server
# createdb -U postgres blogger_server

# psql -U postgres blogger_server


# psql -U postgres -p 5432 -e "DROP DATABASE blogger_server"
psql -U postgres -p 5432 -h localhost -W -e 'drop database blogger_server;'


        #   user: 'postgres',
        #   host: 'localhost',
        #   database: 'blogger_server',
        #   password: '1234',
        #   port: 5432


echo "Configured"


# run chmod +x configuredb.sh in terminal