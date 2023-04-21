This is the Yolo test for Front-End Developer, the task was:

Please, visit the deployed version: https://yolo-game-management.web.app/users

Task: Implement a Responsive Dashboard Application
Requirements:
1 Create a dashboard application that displays data from REST API. The API should provide
information about users, user data, games, and game configurations.
2. Data used for the assignment can be mocked and in the candidate’s preferred structure.
3. The application should be responsive and work well on desktop and mobile devices.
4. The design should be clean, modern, and intuitive, with clear visual cues to highlight
important data points.
5. The application should be implemented using HTML, CSS, and JavaScript. The use of a
Front-End framework such as React or Angular is recommended.
6. The application should include the following features:
- A table displays games data - including the name, game category, and creation date
- A table displaying customers’ data - including the name, email, and address
- The ability to filter the data displayed in the tables based on the date, range, and the
category
- The ability to add new, delete, or edit the existing data displayed in the tables
- The application should also include appropriate error handling and loading indicators for
a smooth user experience.
Submission: Please provide a link to the GitHub repository containing the source code for the
application, along with a brief README file that explains how to run the application.

I'm going to explain the different screens of the app from top to bottom:

https://yolo-game-management.web.app/users

    In "Users," we see search inputs where we can filter the table of users.
    The table of users can be clicked on to lead us to the user screen.
    There is also a final section where we can create new users.

https://yolo-game-management.web.app/games/

    In "Games," we see search inputs where we can filter the table of games.
    The table of games can be clicked on to lead us to the game screen.
    There is also a final section where we can create new games.

https://yolo-game-management.web.app/game/1

    In the game screen, we see the name, category, and creation date of the game.
    We also see the configuration options, where every player can choose and store their preferences about the game. However, we cannot modify data in the game.

https://yolo-game-management.web.app/user/1

    The user screen is the most intricate page, displaying the user's information and their states regarding the games.
    The chart tells us whether the player has played the game.
    If the player has played the game once, we can open their data, including lastTimePlayed, amountPlayed, amountWon, and preferences. Here, we can change the user's preferences for the game.
    Pressing the play button will simulate a game session for the player, updating the date and incrementing amountPlayed and amountWon.

Notes about the development:

    I enjoyed coding this task; it's nice to challenge myself to code something that will be valued.
    I used regular React, regular context, modules like moment.js and route dom. I used Firebase for deployment and database, and Tailwind for quick CSS.
    The biggest challenge by far has been coding with the idea of dynamic preferences. I thought from the beginning that I wanted to stand out by offering a system where new preferences could be added later. I almost got it, but there is still a bug that makes it impossible for the players to take new preferences if they have already played the game.
    There are many things to improve, but I ran out of time. Some of them are the mobile responsiveness, which is better than the desktop since I did mobile first, and the spaghetti code, as solving the dynamic needs made me drill my own pattern layers and I lost the cleanliness. Next time I should design more before coding.
