# fagprove-gjestebok-2022
# Features
# Getting started
Follow these instructions to get the project set up locally:
    - Installer [Nodejs](https://nodejs.org/en/) og [MongoDB](https://www.mongodb.com/download-center/community)
    - Clone git repository
    ```
    git clone https://github.com/Flickza/fagprove-gjestebok-2022
    ```
    - Installer pakker
    ```
    cd .\Server\
    npm install
    ```
    - Sett opp env fil
    ```
    Create a file called .env with the following content:
    PORT = "PORT"
    CONN_URL = "MONGO URL STRING"
    GOOGLE_CLIENT_ID = "GOOGLE CLIENT ID"
    GOOGLE_CLIENT_SECRET = "GOOGLE CLIENT SECRET"
    GOOGLE_CALLBACK_URI = "GOOGLE CALLBACK URI"
    SECRET = 'SECRET'
    ```
    - Start the server
    ```
    *Make sure you are in the .\Server\ directory
    npm start
    ```