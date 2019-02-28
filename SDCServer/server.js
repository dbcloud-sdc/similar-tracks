// import express from 'express';
// import CONFIG from '../config.js';

/* API:
 *
 * GET: /api/song/:id/users
 * Expects JSON result in array of 9
 * -> Needs to take the song ID, and then query the database for users
 * that have liked that song.  Return 8 via some methodology.
 *
 *
 * GET: /api/song/:id/relatedtracks
 * Expects JSON result in array of 3
 * Need to have a way to query the username from the SongID,
 * and return an array of 3 songs from the same user.
 * (WHAT IF THE USER DOESNT HAVE THREE SONGS...?)
 *
 *
 * GET: /api/song/:id/playlists
 * Expects: JSON result in an array of 3
 *
 *
 */