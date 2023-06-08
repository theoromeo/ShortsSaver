import Manager from "./Manager"

export default class ShortsRoute
{   
    saveButtonOuterHTML = `<pickering-yt-save>
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

    <style>
        pickering-yt-save
        {
            padding-top: 16px;
            display: block;
        }
        pickering-yt-save > button 
        {
            all:unset;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 48px;
        }
        pickering-yt-save .icon 
        {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            /* aspect-ratio: 1/1; */

            display: flex;
            align-items: center;
            justify-content: center;

            background-color: rgba(255, 255, 255, 0.1);
            cursor: pointer;
        }
        pickering-yt-save .icon:hover
        {
            background-color: rgba(255, 255, 255, 0.3);
            
        }
        pickering-yt-save .icon > svg 
        {
            width: 24px;

        }
        pickering-yt-save .icon > svg > g 
        {
            fill: white;
        }

        pickering-yt-save label 
        {
            color: white;
            font-size: 1.4rem;
            margin-top: 4px;
            font-weight: 400;
        }

        pickering-yt-save.saved .icon > svg > g
        {
            fill: var(--yt-spec-text-primary-inverse);
        }
        pickering-yt-save.saved .icon
        {
            background-color: var(--yt-spec-text-primary);
        }
    </style>
</pickering-yt-save>`

    positionElementQueryString = 'ytd-reel-video-renderer[is-active] #share-button'
    buttonTagName = 'pickering-yt-save'
    manager: Manager
    changeTargetQuerySelector = 'ytd-reel-video-renderer[is-active]'

    constructor(manager: Manager)
    {
        this.manager = manager
    }

    run()
    {
        if(!this.setObserver())
        {
            return false
        }

        this.injectSaveButton()
    }

    async injectSaveButton()
    {
        const positionElement = document.querySelector(this.positionElementQueryString)

        if(!positionElement)
        {
            return false;
        }

        positionElement?.insertAdjacentHTML("beforebegin",this.saveButtonOuterHTML)

        const saveButtonElement = document.querySelector(this.buttonTagName)
        const isSaved = await this.isSaved(window.location.href)
        if(isSaved)
        {
            saveButtonElement.setAttribute("class","saved")
        }
        saveButtonElement?.querySelector('icon')?.addEventListener('click', () => { this.eventSaveButton(saveButtonElement)})

    }

    async isSaved(url:string)
    {
        return await this.manager.doesExists(url)
    }

    eventSaveButton(saveButtonElement:Element )
    {
        const url = window.location.href

        if(saveButtonElement.classList.contains('saved'))
        {
            this.manager.delete(url)
            return "deleted"
        }

        this.manager.save(url)
        return "saved"

        
    }

    setObserver() :boolean
    {
        const target = document.querySelector(this.changeTargetQuerySelector) as Node
        
        if(!target)
        {
            console.error(`target node <${this.changeTargetQuerySelector}> not found`)
            return false;
        }

        const options = {attributes:true, attributeFilter:['is-active']}

        const observer = new MutationObserver(this.eventObserver.bind(this))
        observer.observe(<Node>target,options)
        return true
    }

    eventObserver(mutationList:any, observer:any)
    {
        this.run()
    }
}