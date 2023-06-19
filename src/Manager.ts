export default class Manager
{
    async save(url:string)
    {
        return chrome.storage.sync.set({ [url]: Date().toString() })
    }

    async exists(url:string)
    {
        return chrome.storage.sync.get(url)
        .then((result) => 
        {
            let index = Object.keys(result).length
            return (index > 0)? true :  false
            
        })
    }

    async get(url:string)
    {
        return chrome.storage.sync.get(url)
        .then((result) => 
        {
            let index = Object.keys(result).length
            return (index > 0)? result : null
        })
    }

    async getAll()
    {
        return chrome.storage.sync.get()
        .then((result) => 
        {
            return result
        });
    }

    async delete(url:string)
    {
        return chrome.storage.sync.remove(url);
    }

    async deleteAll()
    {
        return chrome.storage.sync.clear()
    }
}
