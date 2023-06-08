export default class Manager
{
    mode:"local"

    save( url:string , title?:string, viewCount?:number, imageURL?:string)
    {
        let build = 
        {
            "title": title,
            "viewCount":viewCount,
            "imageURL":imageURL
        }

        // console.log(chrome.storage)
        chrome.storage.local.set({ [url]: build }).then(() => {
          });
    }

    async doesExists(url:string)
    {
        return chrome.storage.local.get(url).then((result) => {
            let index = Object.keys(result).length
            return (index == 0)? false :  true
        });
    }    


    async get(url:string)
    {
         return chrome.storage.local.get(url).then((result) => {
            let index = Object.keys(result).length

            if (index == 0)
            {
                return false
            }

            return result
        });
    }

    delete(url:string)
    {
        chrome.storage.local.remove(url);
    }

    deleteAll()
    {
        chrome.storage.local.clear()
    }

    async getAll()
    {
        return chrome.storage.local.get().then(result => {
            return result
          });

          
    }

}

