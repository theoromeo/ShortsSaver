export default class Router 
{
    currentURL = ''
    routes:any
    

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
        this.routes[route] = object
    }

    runRoutes()
    {
        this.currentURL = window.location.href

        const page = new URL(this.currentURL).pathname
        
        for (const route in this.routes) 
        {
            if(page.startsWith(route))
            {
                this.routes[route].run() 
                return true
            }
        }

        return false

    }
}