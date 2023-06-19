import Manager from "./Manager"

export default class ShortsRoute
{
    saveButtonHTML = `<pickering-yt-save>
    <button>
        <div class="icon">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="112.000000pt" height="112.000000pt" viewBox="0 0 112.000000 112.000000"
                preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,112.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                <path d="M657 982 c-32 -33 -33 -39 -8 -66 20 -21 20 -21 -61 -86 -44 -36
                -106 -86 -138 -112 -32 -27 -62 -48 -66 -48 -4 0 -22 14 -39 30 l-32 31 -33
                -31 -33 -31 89 -90 89 -89 -143 -143 c-124 -124 -142 -146 -142 -175 0 -29 3
                -32 32 -32 29 0 51 18 175 142 l143 143 87 -88 88 -87 33 31 34 31 -32 33 -32
                33 62 79 c34 43 82 106 108 140 49 66 61 73 82 48 18 -22 33 -19 63 13 l27 28
                -138 140 c-77 76 -150 149 -164 161 l-24 23 -27 -28z"/>
                </g>
            </svg>
        </div>

        <label for="">Save</label>
    </button>
</pickering-yt-save>`

    parentQuerySelector = 'ytd-reel-video-renderer[is-active] #actions'
    positioningQuerySelector = 'ytd-reel-video-renderer[is-active] #share-button'
    buttonTagName = 'pickering-yt-save'
    changingTargetQuerySelector = 'ytd-reel-video-renderer[is-active]'
    currentURL = ''

    manager: Manager

    constructor(manager:Manager)
    {
        this.manager = manager
    }

    run()
    {
        if(!this.setObserver()){ return false }

        this.currentURL = window.location.href
        setTimeout(()=>{this.injectSaveButton()},1000)
    }

    async injectSaveButton()
    {
        const positioningElement = document.querySelector(this.positioningQuerySelector)

        if(!positioningElement){return false}

        const parent = document.querySelector(this.parentQuerySelector)
        
        if(parent.querySelector(this.buttonTagName))
        {
            return null
        }

        positioningElement.insertAdjacentHTML("beforebegin", this.saveButtonHTML)

        const saveButton = parent.querySelector(this.buttonTagName)
        saveButton.querySelector('.icon').addEventListener("click" , ()=>{this.eventSaveButton(saveButton)})

        const isSaved = await this.manager.exists(this.currentURL)
        
        if(isSaved)
        {
            saveButton.className = "saved"
        }
    }


    eventSaveButton(button:Element)
    {
        if(button.classList.contains('saved'))
        {
            this.manager.delete(this.currentURL)
            button.classList.remove("saved")
            return 'deleted'
        }


        this.manager.save(this.currentURL)
        button.className = 'saved' 

        return 'saved'
    }

    setObserver()
    {
        const changingTarget = document.querySelector(this.changingTargetQuerySelector)
        
        if(!changingTarget)
        {
            return false
        }

        const options = {attributes:true, attributeFilter:['is-active']}
        const observer = new MutationObserver(this.eventObserver.bind(this))
        observer.observe(<Node> changingTarget,options)

        return true
    }

    eventObserver(mutationList:any, observer:any)
    {
        this.run()
    }

}