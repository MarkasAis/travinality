![](https://user-images.githubusercontent.com/39225800/57587563-6cb0dc00-750f-11e9-8436-d3add3c7be4e.png)
# Travinality

A tour booking platform with a little more personality. 😉

## Description
This is a platform where travelers can book tours from guides.

### 🗺️ Features

* All pages are dynamic
* Collapsible NavBar
* Images & Pages fade in smoothly
* Unique guide profiles with automatically updating backgrounds based on their location
* A map in which you can see guide's travel route
* Location markers tell you more about the location when clicked on
* Guide search feature based on their current location
* Uses 'Google Cloud Storage' for storing images
* Live guide position and online status
* A cool logo!

## 🖼️ Gallery
### Home Page
![a1](https://user-images.githubusercontent.com/39225800/167273387-d483db6b-b089-4269-850d-6fd92efd0d69.png)
### Guide Profile
![a2](https://user-images.githubusercontent.com/39225800/167273386-72d21002-61f0-422e-abf9-1645132934bd.png)
### Search Feature
![a3](https://user-images.githubusercontent.com/39225800/167273385-3fe62821-4701-4c88-ab03-3b0f0a8a6e26.png)
### Log In
![a4](https://user-images.githubusercontent.com/39225800/167273383-ed4b029c-7753-45c8-bf01-8e71da1a2a33.png)

## 🛠️ Running Instructions

The instructions assume you're using *Windows*, though it can be run on other OS's too.

### Prerequisites

* Have **'Bash on Ubuntu on Windows'** installed.
* Have a **MySQL** sever installed and running, through 'Bash on Ubuntu on Windows'
* Have **NodeJs** with **NPM**


### How to run it

1. Go to **'\my-api\config\database.yml'** database configuration. Enter your MySQL credentials **(username & password)**
2. In the **'Bash on Ubuntu on Windows'** console, **cd** to the **'my-api'** directory.
3. Run **```rails db:reset```** to initialize and seed the database.
4. Run **```rails s```** to start the server. *(It runs on PORT 3000)*

5. Now using **'Windows command promt'**, **cd** into **'my-app'** directory.
6. Run **```npm install```** to install all required packages.
7. Run **```npm start```** to run the application. *(It runs on PORT 3001)*
8. If the website hasn't opened up automatically, navigate to **'localhost:3001'**.

#### You're all set! 🎉
