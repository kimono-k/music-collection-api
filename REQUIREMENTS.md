These are the requirements:

The data which the music collection contains doesn't matter.
You can be creative with it as long as it fulfills the requirements (id, artist, genre, tracks, year) etc.

# Checkpoint 10/15

- Watch all the lessons
- All communication from and to the webservice should be processed via the uniform interface.
- With the OPTIONS method it should be possible to check which methods are available on the URI -> Bas vragen
- A parameter limit should limit the amount of resources that shows up in the collection.
  (e.g. start=1 from the first resource of the collection.
- When there is no limit all the items should be displayed on the pagination (no default limit).
- The JSON file should be named webservice.json on stud hosted.
- Clean the code\*

# == General ==

- RESTful API should be made in Express.js X
- Retrieving information should happen via JSON X
- Sending information to the service should be possible as json and as x-www-form-urlencoded X
- When you create a new item the fields should be checked (all the fields should have a string as data type) X

# == Collection resource ==

- The service should include a collection resource where you can retrieve and create new data. X
- There should be more than 5 resources in the collection. X

# == Detail resource ==

- For each resource from the collection there should be a detail view which can be modified as a whole (e.g. album/id/1) X
- The resource should have at least 3 fields that can be modified X
- At least 2 fields should be visible in the collection. X
- During modification of the fields there should be a check if the fields are not empty and all the fields should be of the datatype string. X
