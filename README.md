# back-end

# Anywhere Fitness

## Table of contents

- **[Overview](#overview)**<br>
- **[API Endpoints](#api-endpoints)**<br>

## <a name="overview"></a>Overview

AnywhereFitness is the all-in-one solution to meet your “on-location” fitness class needs.
AnywhereFitness makes it painless for Instructors and Clients alike to hold and attend Fitness
classes wherever they might be held.

## <a name="api-endpoints"></a>API endpoints

### https://anywhere-fitness-bw-2.herokuapp.com/

### **_Authentication (for login)_**

| Method        | Endpoint           | Body (required)                 | Body (optional) | Notes                                             |
| ------------- | ------------------ | ------------------------------- | --------------- | ------------------------------------------------- |
| register POST | /api/auth/register | email, username, password, role | N/A             | Creates a new user object in the database.        |
| login POST    | /api/auth/login    | username, password              | N/A             | Returns a welcome message and the JSON Web Token. |

### **_Additional athunetication for Instructor_**


| Method               | Endpoint            | Body (required)                                                                                | Body (optional) | Notes                                                                                                                                                                            |
| -------------------- | ------------------- | ---------------------------------------------------------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add class POST       | /api/instructor/    | name, instructor_name, type, intensity, location, date, duration, maximum, current, start_time | N/A             | Creates a new class object in the database. Date has to string in "04/19/2020" format. Maximum - (Int) Maximum number of attendees. Current - (Int) current number of attendees. |
| Update Class PUT     | /api/instructor/:id | any of the field                                                                               | N/A             | Updates the class with given Id                                                                                                                                                  |
| Removes Class DELETE | /api/instructor/:id | any of the field                                                                               | N/A             | Deletes the class with given Id                                                                                                                                                  |


### **_Endpoints for the Users_**

| Method          | Endpoint    | Body (required) | Body (optional) | Notes                                     |
| --------------- | ----------- | --------------- | --------------- | ----------------------------------------- |
| get classes GET | /api/client | N/A             | N/A             | Fetches all the classes from the database |

