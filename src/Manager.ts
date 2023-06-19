export default class Manager
{
    async save(url:string)
    {
        return chrome.storage.local.set({ [url]: Date().toString() })
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

    async delete(url:string)
    {
        return chrome.storage.local.remove(url);
    }

    async deleteAll()
    {
        return chrome.storage.local.clear()
    }
}
