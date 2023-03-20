Node.js WhatsApp Bot for YouTube mp3 Download




This is a Node.js application that allows users to download mp3 files from YouTube by sending a WhatsApp message to a designated phone number.




Dependencies
This application requires the following dependencies:

whatsapp-web.js: A WhatsApp Web API library for Node.js


ytdl-core: A library for downloading YouTube videos and extracting audio in various formats


Installation

Clone the repository: git clone https://github.com/your-username/your-repo.git

Install the dependencies: npm install

Configure the application by editing the .env file (see below)

Start the application: npm start


Configuration



The application uses environment variables to store configuration data. Create a file named .env in the root directory of the project with the following contents:




PHONE_NUMBER=your-phone-number

SESSION_FILE=session.json

DOWNLOAD_DIR=downloads/
