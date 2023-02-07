Problems during HW#1

1. Javascript threw an error when I attempted to create a function named 'delete' in nastify.ts. 
    The console stated that 'delete' was a reserved word, so therefore i was not allowed to name my function delete.
    I tried googling the error code, and some suggestion recommended that I replace the function declaration with the one below:

    ```
    var request = {
    "delete" : function (url) {
        // Some code...
    }
    }
    request["delete"]('http://page.dev/users/1');
    ```
    [LINK: https://stackoverflow.com/questions/18793529/is-it-safe-to-declare-a-delete-method-in-javascript]

    This didn't work, so i just named my nastify's 'delete' function to '_delete'.

2. Based on the HW instructions provided, I wasn't sure how much of the code for the POST/DELETE endpoints I should add. 

    I decided to create a users array, to temporarily mimic a database of Users. 

    I modified the POST method to allow users to POST specific userIDs via the endpoint "POST /users/:userID". This will append a userID to the array.

    I added a PUT endpoint, but it currently only output a message after 2 seconds.

    I added a DELETE endpoint. 50% of the time, the request to delete a requested userID will fail. Upon success, the requested userID will be determined if it exists within the Users database. If it does exist, then it gets delete. If not, an error message is thrown stating that the userID does not exist within the Users database.

3. Added an html file named 'users.html'. I wasn't sure how to connect the users array to this file, so i just kept the users.html at its default page.
