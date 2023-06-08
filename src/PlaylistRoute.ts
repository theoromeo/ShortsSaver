import Manager from "./Manager"

export default class PlaylistRoute 
{
    viewerOuterHTML = `<pickering-yt-viewer>
    <header>

      <svg id="pickering-yt-viewer-icon" viewBox="0 0 432 468" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="156.385" width="390.656" height="174.441" rx="84" transform="rotate(-27.5 0 156.385)" fill="#F40407"/>
        <rect x="4.20776" y="338.17" width="390.656" height="174.441" rx="84" transform="rotate(-27.5 4.20776 338.17)" fill="#F40407"/>
        <path d="M228.818 170.377C223.816 175.536 223.66 176.474 227.568 180.694C230.694 183.977 230.694 183.977 218.032 194.138C211.154 199.766 201.462 207.582 196.46 211.646C191.457 215.867 186.768 219.149 186.143 219.149C185.517 219.149 182.703 216.961 180.046 214.46L175.044 209.614L169.885 214.46L164.726 219.306L178.639 233.375L192.552 247.287L170.198 269.641C150.814 289.025 148 292.464 148 296.998C148 301.531 148.469 302 153.002 302C157.536 302 160.975 299.186 180.359 279.802L202.713 257.448L216.313 271.205L230.069 284.805L235.228 279.959L240.543 275.113L235.54 269.954L230.538 264.795L240.23 252.446C245.545 245.724 253.048 235.876 257.113 230.561C264.772 220.244 266.648 219.149 269.931 223.057C272.745 226.497 275.09 226.028 279.779 221.025L284 216.648L262.428 194.763C250.391 182.883 238.979 171.471 236.791 169.595L233.039 166L228.818 170.377Z" fill="white"/>
      </svg>

      <h1>Saved Shorts</h1>

    </header>
    <main>
      
    </main>
<style>
  .pickering-yt-shorts-card {
  display: flex;
  flex-direction: column;
  max-width: 172px;
  margin-right: 16px;
  position: relative;
  text-decoration: none;
  color: unset;
}
.pickering-yt-shorts-card * {
  text-decoration: none;
  text-transform: none;
}
.pickering-yt-shorts-card .close {
  all: unset;
  position: absolute;
  margin: 4px;
  right: 0;
  background-color: var(--yt-spec-static-overlay-background-heavy);
  border-radius: 4px;
  color: var(--yt-spec-static-brand-white);
  font-size: var(--yt-badge-font-size, 1.2rem);
  outline: unset;
  display: block;
  font-weight: var(--yt-badge-font-weight, 500);
  font-family: Roboto, Arial, sans-serif;
  opacity: 0;
  padding: 3px 4px;
}
.pickering-yt-shorts-card img {
  width: 172px;
  aspect-ratio: 9/16;
  border-radius: 8px;
  background-color: rgba(48, 48, 48, 0.184);
}
.pickering-yt-shorts-card h2 {
  padding-top: 12px;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--yt-spec-text-primary);
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.pickering-yt-shorts-card p {
  font-size: 1.4rem;
  font-weight: 400;
  padding-top: 4px;
  color: var(--ytd-metadata-line-color, var(--yt-spec-text-secondary));
}
.pickering-yt-shorts-card:hover .close {
  opacity: 1;
}
pickering-yt-viewer {
  display: flex;
  flex-direction: column;
  margin-left: 36px;
}
pickering-yt-viewer header {
  display: flex;
  align-items: center;
  padding: 24px 8px;
}
pickering-yt-viewer header #pickering-yt-viewer-icon {
  width: 24px;
}
pickering-yt-viewer header h1 {
  color: var(--yt-spec-text-primary);
  font-size: 2rem;
  line-height: 2.8rem;
  font-weight: 400;
  margin-left: 8px;
}
pickering-yt-viewer main {
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
}
</style>
    
</pickering-yt-viewer>
`
    positionElementQueryString = '#contents > ytd-playlist-video-list-renderer'
    manager: Manager

    constructor(manager: Manager)
    {
        this.manager = manager
    }

    run()
    {
        this.injectViewer()
    }

    async injectViewer()
    {
        const positionElement = document.querySelector(this.positionElementQueryString)
        positionElement?.insertAdjacentHTML("afterbegin", this.viewerOuterHTML)

        const viewerElement = document.querySelector('pickering-yt-viewer')
        viewerElement.innerHTML = await this.getShorts()
    }

    async getShorts()
    {
        const shorts = await this.manager.getAll()
        let compiledShorts = '';

        shorts.forEach((short: any) => 
        {
            compiledShorts += this.createShortsCard(short.url,short.imageURL,short.title,short.viewCount)
        });

        return compiledShorts

    }

    createShortsCard(url:string, imageURL:string, title:string, viewCount:number , returnAs:'html'|'element' = 'html')
    {
        let element = document.createElement('a')
        element.className = 'pickering-yt-shorts-card'
        element.href = url
        element.innerHTML = `<button class="close">Delete</button><img src="${imageURL}" alt=""><h2>${title}</h2><p>${viewCount}Views</p>`
        element.querySelector('button').addEventListener('click', ()=>{this.eventDeleteCard(element)})
        
        if(returnAs == 'element')
        {
            return element
        }
       
        return element.outerHTML
    }

    eventDeleteCard(element:Element)
    {
        this.manager.delete(element.getAttribute('href'))
        element.remove()
    }
}