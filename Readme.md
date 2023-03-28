## Deploy Server
- cd front-end, yarn
- Change front-end/.env: REACT_APP_SERVER_API=<<Golf_URL>>
- cd ..
- Change .env: CORS=<<URL server_self>>
- yarn
- sh build.sh
- node app
