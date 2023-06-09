export default class Manager
{
    save(url:string)
    {
        chrome.storage.local.set({ [url]: Date() })
    }

    async exists(url:string)
    {
        return chrome.storage.local.get(url)
        .then((result) => 
        {
            let index = Object.keys(result).length
            return (index > 0)? true :  false
            
        })
    }

    async get(url:string)
    {
        return chrome.storage.local.get(url)
        .then((result) => 
        {
            let index = Object.keys(result).length
            return (index > 0)? result : null
        })
    }

    async getAll()
    {
        return chrome.storage.local.get()
        .then((result) => 
        {
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
}