# Shorts-Save by Pickering (Chrome Extention)
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
Will zip the `/build` folder
