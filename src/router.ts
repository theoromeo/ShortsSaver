class Router
{
    currentURL = ''
    shortsRouteCallable:any
    playlistRouteCallable:any

    init(shortsRouteCallable:CallableFunction ,playlistRouteCallable:CallableFunction)
    {
        this.currentURL = window.location.href

        this.shortsRouteCallable = shortsRouteCallable
        this.playlistRouteCallable = playlistRouteCallable

        this.setTitleChangeListener()
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
            this.shortsRouteCallable()
            return true
        }
        else if ( page.startsWith("/playlist"))
        {
            this.playlistRouteCallable()
            return true
        }

        return false

    }


}

export default Router