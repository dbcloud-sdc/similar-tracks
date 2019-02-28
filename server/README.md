# Similar Tracks API
## CRUD operations

### READ: Retrieve Similar Tracks
<_Given a songID, return the top three related tracks from the database_>

* **URL/ENDPOINT**

    `/api/song/:id/relatedtracks`

* **METHOD**

  - `GET`

*  **URL Params**

  `id` _(Number)_ : ID of the song to retrieve related tracks


* **Success Response:**

  * **Code:** 200
  * **Content:** `{} //TODO: datastructure`

  * **Example Response**
  ```[
    {
      title:
      album_pic:
      username:
      num_plays:
      num_likes:
      num_reposts:
      num_comments:
      album_id:
      primary_song_playlistid:
    }
    ...//2 more song objects
  ]```

  |Key                      |Type        |
  |:----------------------- |:---------  |
  |`title`                  |varchar(63) |
  |`album_pic`              |varchar(511)|
  |`username`               |int         |
  |`num_plays`              |int         |
  |`num_likes`              |int         |
  |`num_reposts`            |int         |
  |`num_comments`           |int         |
  |`album_id`               |int         |
  |`primary_song_playlistid`|int         |


* **Error Response:**

  * **Code:** `404 NOT FOUND`
  * **Content:** `{ error : "" }`

### READ: Retrieve A Single, Specified Track
<_Given a songID, return the top three related tracks from the database_>

* **URL/ENDPOINT**

    `/api/song/:id/`

* **METHOD**

  - `GET`

*  **URL Params**

  `id` _(Number)_ : ID of the song to retrieve related tracks

* **Success Response:**

  * **Code:** 200
  * **Content:** `{} //TODO: datastructure`

* **Error Response:**

  * **Code:** `404 NOT FOUND`
  * **Content:** `{ error : "" }`



### CREATE: Add New Track
<_Given a songID and data, update paramaters of the record _>

* **URL/ENDPOINT**

  - `/api/song/:id/`

* **METHOD**

  - `PUT` or `PATCH`

*  **Required Body Parameters**

  |Key                      |Type        |
  |:----------------------- |:---------  |
  |`title`                  |varchar(63) |
  |`album_pic`              |varchar(511)|
  |`username`               |int         |
  |`num_plays`              |int         |
  |`num_likes`              |int         |
  |`num_reposts`            |int         |
  |`num_comments`           |int         |
  |`album_id`               |int         |
  |`primary_song_playlistid`|int         |

* **Success Response:**

  * **Code:** 201
    **Content:** `{}`

* **Error Response:**
  * **Code:** `400 BAD REQUEST`
    **Content:** `{ error : "" }`
    **Detail** `Request error`

  * **Code:** `500 INTERNAL ERROR`
    **Content:** `{ error : "" }`
    **Detail** `Database failure`


### UPDATE: Update an existing track with new data
<_Given a songID and data, update an existing song entry_>

* **URL/ENDPOINT**

  - `/api/song/:id/`

* **METHOD**

  - `POST`

*  **Optional Body Parameters**

  - All Key:values are optional, but at least one must be chosen

  |Key                      |Type        |
  |:----------------------- |:---------  |
  |`title`                  |varchar(63) |
  |`album_pic`              |varchar(511)|
  |`username`               |int         |
  |`num_plays`              |int         |
  |`num_likes`              |int         |
  |`num_reposts`            |int         |
  |`num_comments`           |int         |
  |`album_id`               |int         |
  |`primary_song_idaylistid`|int         |


* **Success Response:**

  * **Code:** 201
    **Content:** `{}`

* **Error Response:**
  * **Code:** `400 BAD REQUEST`
    **Content:** `{ error : "" }`
    **Detail** `User request error`

  * **Code:** `404 FILE NOT FOUND`
    **Content:** `{ error : "" }`
    **Detail** `Record does not exist`


  * **Code:** `500 INTERNAL ERROR`
    **Content:** `{ error : "" }`
    **Detail** `Database failure`

### DELETE: Remove an existing track
<_Given a songID, remove the record from the database_>

* **URL/ENDPOINT**

  - `/api/song/:id/`

* **METHOD**

  - `PUT` or `PATCH`

* **Success Response:**

  * **Code:** 201
    **Content:** `{}`

* **Error Response:**
  * **Code:** `400 BAD REQUEST`
    **Content:** `{ error : "" }`
    **Detail** `Request error`

  * **Code:** `500 INTERNAL ERROR`
    **Content:** `{ error : "" }`
    **Detail** `Database failure`
