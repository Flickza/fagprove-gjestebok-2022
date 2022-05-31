# fagprove-gjestebok-2022
# Features
This is a simple message app, kind of like twitter but not twitter at all.
# Built with
## Backend
- [expressjs](https://expressjs.com/)
- [mongodb](https://www.mongodb.com/)
- [nodejs](https://nodejs.org/)

## Frontend
- [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Bootstrap](https://getbootstrap.com/)
- [JQuery](https://jquery.com/)

# Getting started
Follow these instructions to get the project set up locally:
- Install [Nodejs](https://nodejs.org/en/) & [MongoDB](https://www.mongodb.com/download-center/community)

- Clone git repository

    ```
    git clone https://github.com/Flickza/fagprove-gjestebok-2022
    ```

- Installer pakker  
    ```
    cd .\Server\

    npm install
    ```
- Set up environment variables

    Create a file called .env with the following content:

    ```
    PORT = "PORT"

    CONN_URL = "MONGO URL STRING"

    GOOGLE_CLIENT_ID = "GOOGLE CLIENT ID"

    GOOGLE_CLIENT_SECRET = "GOOGLE CLIENT SECRET"

    GOOGLE_CALLBACK_URI = "GOOGLE CALLBACK URI"

    SECRET = 'SECRET'

    ```

- Start the server  
    ```
    * Make sure you are in the .\Server\ directory 
    
    npm start  # Starts the server
    ```
