class Router
{
    currentURL = ''
    shortsRouteCallable:any
    playlistRouteCallable:any

    constructor(shortsRouteCallable:Object ,playlistRouteCallable:Object)
    {
        
        this.shortsRouteCallable = shortsRouteCallable
        this.playlistRouteCallable = playlistRouteCallable
        
        this.setTitleChangeListener()
        this.doRoutes()
    }


    setTitleChangeListener()
    {
        new MutationObserver(this.setTitleChangeListenerCallback.bind(this))
        .observe(<Node> document.querySelector('title'),
                {subtree:true,childList:true})
    }
    
    setTitleChangeListenerCallback()
    {
        if(this.currentURL == window.location.href)
        {
            return false
        }

        return this.doRoutes()
    }

    doRoutes()
    {
        this.currentURL = window.location.href

        const page = new URL(this.currentURL).pathname

        if(page.startsWith("/shorts"))
        {
            this.shortsRouteCallable.run()
            return true
        }
        else if ( page.startsWith("/playlist"))
        {
            this.playlistRouteCallable.run()
            return true
        }

        return false

    }


}

export default Router