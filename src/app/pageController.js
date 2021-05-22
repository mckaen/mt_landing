export class PageController {
    constructor() {
        let elems = document.querySelectorAll( '[block]' )
        this.pages = {}
        this.pagesList = []
        elems.forEach( elem => {
            this.pages[ elem.getAttribute( 'block' ) ] = elem
            this.pagesList.push( elem.getAttribute( 'block' ) )
        })
        this.currentPage = null

        this.attachEvents()

        this.show( this.getPageFromHash() )
    }

    attachEvents(){
        document.querySelectorAll( '[link]' ).forEach( link => {
            link.addEventListener( 'click', evt => {
                evt.preventDefault()
                let hash = this.getPageFromHash( link.href.replace(/^[^#]*#/, '#') )
                this.show( hash )
                return false
            })
        })
    }

    getPageFromHash( src ) {
        let hash = src || location.hash || ''
        if ( !hash || !hash.length || hash == '#' ) return this.pagesList[0]
        hash = hash.split('#').filter( item => item && item.length )[0].trim()
        if ( this.pagesList.indexOf( hash ) == -1 ) return this.pagesList[0]
        return hash
    }

    show( page ) {
        if ( this.pagesList.indexOf( page ) == -1 ) page = this.pagesList[0]
        if ( this.currentPage == page ) return false
        if ( this.currentPage ) this.pages[ this.currentPage ].style.display = 'none'
        this.pages[ page ].style.display = 'block'
        this.currentPage = page
        if ( page != this.pagesList[0] ) location.hash = '#'+page
        else location.hash = ''
    }

}