# SS2023 SSC Group_11


How to start the website:
Install all node modules with npm install and run node app.js in the terminal.

Database connection details:

user: ##########

password: #########


Sample regular user:

username: #########

password: #########


Sample admin user:

username: #########

password: #########



Description:

Users can register, log in/log out, view profiles, set a profile picture, edit and delete their own profiles, admin users can edit and delete any profile. If a username already exists, users have to choose a different name to register/edit. Users can take a quiz to determine which of the four nations they belong to; according to the results, the profile page will have a different background color.
Users can also put together a team of up to four ATLA characters. They can also delete their own teams. They can read about different characters from ATLA and, if they are logged in, can leave comments on the characters. There is also a chat where users can join an ATLA-themed room and chat with other users.

Criteria:
What your submission must be capable of: (60p)

Users can be: displayed, added, updated & deleted (10p) ✅

Nice overall design that is consistent throughout all views and appealing to a user (5p) ✅

New users can register themselves and the password is saved encrypted in the database (5p) ✅

Users can log in and log out (using JWT) (5p) ✅

Only users with the role "Administrator" can change data. Users can only edit their own profile. (5p) ✅

There are at least 3 other tables in correspondence with the users that also have their own model, controller and views implemented. (10p) (users_nation, users_team, user_pictures, characters_comments)✅

There is a chat with different rooms and users can switch between rooms. (5p) ✅

Everything works as expected and there are no unhandled errors or blank pages (5p) ✅

Project is hosted online (e.g. via UAS Node.js Hosting Service) (10p)


Optional Criteria: (55p)

User experience: The project should have a user-friendly interface that is easy to navigate and understand (self-explanatory). Design should be visually appealing, creative, and functional. (5p) ✅

Documentation: functions have comments that explain what the function does so that you still know it what your code does if you read it in one year (5p) ✅

All errors are handled with proper error handling capabilities and users get at least a nice/funny "404 not found" page (5p) ✅

Code follows naming conventions, is tidied up, clean and self-explanatory even when someone else reads it (5p) ✅

Picture upload works and uses UUID (5p) ✅

Users can upload/update their profile pictures. (5p) ✅

The chat uses the name of the user when logged in and else „guest” (5p) ✅

Only administrators can view all user data. Users can only see which other users exist as well as their "public" profiles (5p) ✅

Users can delete their own profile (5p) ✅

Everything was submitted correctly (no node_modules, easy but detailed enough description for the lecturer how to start the project and test it, credentials for your database for the submission are included, etc) (5p) ✅




Not implemented:

JWT passed in the HTTP header and not in cookies (5p) 