import Manager from "./Manager"


export default class PlaylistRoute 
{
  viewerHTML = `
  <pickering-yt-viewer>
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
</pickering-yt-viewer>
`

  positioningQuerySelector = '#contents > ytd-playlist-video-list-renderer'
  emptyViewHTML = `<p class="empty"> No Saved Shorts</p>`
  manager: Manager


  constructor(manager: Manager)
  {
    this.manager = manager
  }

  run()
  {
    setTimeout(()=> {
      this.injectViewer()
    },1000)
  }

  async injectViewer()
  {
    if(document.querySelector('pickering-yt-viewer'))
    {
      const main = document.querySelector('pickering-yt-viewer  main')
      main.innerHTML = ''
      await this.injectShorts(main)

      return true;
    }

    const positioningElement = document.querySelector(this.positioningQuerySelector)

    if(!positioningElement)
    {
      return false
    }

    positioningElement.insertAdjacentHTML("afterbegin", this.viewerHTML)
    const viewer = document.querySelector('pickering-yt-viewer')
    await this.injectShorts(viewer.querySelector('main'))
  }

  async injectShorts(container:Element)
  {
    const savedShorts = await this.manager.getAll()

    const shortsCount = Object.keys(savedShorts).length

    if(shortsCount < 1 )
    {
      container.innerHTML = this.emptyViewHTML
      return true;

    }

    for(const url in savedShorts)
    {
      this.injectShort(container,url)
    }
  }

  async injectShort(container:Element , url:string)
  {
    const short = await this.getOpenGraphInfo(url)
    console.log(short)

    if(!short) return false 
    container.appendChild(this.createShortsCard(url, short.imageURL, short.title))

  }

  async getOpenGraphInfo(url:string)
  {
    try 
    {
      const response = await fetch(url)
      const html = await response.text()

      const parser = new DOMParser()
      const doc = parser.parseFromString(html,'text/html')
      
      const image = doc.querySelector(`meta[property="og:image"]`).getAttribute("content")
      const title = doc.querySelector(`meta[property="og:title"]`).getAttribute("content")

      return {
        imageURL:image,
        title: title
      }
    } 
    
    catch (error) 
    {
      return false
    }


    
  }

  createShortsCard(url:string , imageURL: string, title: string )
  {
    let card = document.createElement('a')
        card.className = 'pickering-yt-shorts-card'
        card.href = url
        // card.innerHTML = `<button class="close">Delete</button><img src="${imageURL}" alt=""><h2>${title}</h2><p>${viewCount}Views</p>`
        card.innerHTML = `<button class="close">Delete</button><img src="${imageURL}" alt=""><h2>${title}</h2>`
        card.querySelector('button').addEventListener('click', (event) => { event.preventDefault();  this.eventDeleteShort(url,card)})

    return card
  }

  eventDeleteShort(url:string, card:Element)
  {
    this.manager.delete(url)
    card.remove()

  }

  abbrNum (number:any, decPlaces:any = 1)
  {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces)
  
    // Enumerate number abbreviations
    var abbrev = ['k', 'm', 'b', 't']
  
    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {
      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10, (i + 1) * 3)
  
      // If the number is bigger or equal do the abbreviation
      if (size <= number) {
        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
        // This gives us nice rounding to a particular decimal place.
        number = Math.round((number * decPlaces) / size) / decPlaces
  
        // Handle special case where we round up to the next abbreviation
        if (number == 1000 && i < abbrev.length - 1) {
          number = 1
          i++
        }
  
        // Add the letter for the abbreviation
        number += abbrev[i]
  
        // We are done... stop
        break
      }
    }
  
    return number
  }

}