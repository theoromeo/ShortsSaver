# ShortsSaver by Pickering (Chrome Extention)
ShortsSaver allows you to save YouTube Shorts videos for later viewing. With just a single click, you can store Shorts directly to your YouTube 'Watch Later' tab.

## Run Extension
To build the application and run it, open `chrome://extensions/` then toggle on `developer mode` in the top right corner of the page. <br>

Click `load unpacked` and select the `./build` folder.

## Build Extension

```console
npm run build
```
Will compile the code in `/src` into a single `/build/app.js` file.


## Package a Distributable 
```console
npm run package
```
Will zip the `/build` folder as `build-.zip`

## Source Architecture 

### Classes
-  <b>Manager</b><br>
Handles saving of Sorts information to cache

- <b>Router</b><br>
Pairs a youtube.com/{route} to a object and calls its `run` function.

- <b>ShortsRoute</b><br>
Class that handles injection of the `ShortsSaver button` to the active short and its functions

- <b>PlaylistRoute</b><br>
Class that injecting a list of shorts saved to the playlist `/playlist?list=WL` at the top of the playlist.

### Coupling 
Functionality is loosely coupled, from routes handeling `(w/Router)`, injection of elements `(w/ ShortsRoute & PlaylistRoute)` and saving to cache `(w/ Manager)`.

### Main Entry Point 
```
app.js
```

## Developer details
- <b>Website</b><br>
`www.bypickering.com`