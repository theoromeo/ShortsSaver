export default class Router 
{
    currentURL = ''
    routes = new Map()
    

    constructor()
    {
        this.setObserver()
    }

    setObserver()
    {
        new MutationObserver(this.eventObserver.bind(this))
        .observe(<Node> document.querySelector('title'),{subtree:true,childList:true})
    }

    eventObserver()
    {
        if(this.currentURL == window.location.href)
        {
            return false
        }

        this.runRoutes()
    }

    add(route:string, object:Object)
    {
        this.routes.set(route, object)
    }

    runRoutes()
    {

        this.currentURL = window.location.href
        const page = new URL(this.currentURL).pathname
        
        this.routes.forEach((value,key) => 
        {
            if(!page.startsWith(key))
            {
                return false
            }

            value.run()
            return true
        })

        return false


    }
}