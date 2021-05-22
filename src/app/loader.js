export class Loader {
    constructor( body, itemsCount = 8 ) {
        if ( !body ) return false
        this.body = body
        if ( this.body.style.position != 'absolute' || this.body.style.position != 'fixed' )
            this.body.style.position = 'relative'
        this.overlay = document.createElement( 'div' )
        this.overlay.classList.add( 'loader_1_overlay' )

        this.loaderRect = document.createElement( 'div' )
        this.loaderRect.classList.add( 'loader-body' )

        for ( let i = 0; i < itemsCount; i++ )
            this.loaderRect.append( document.createElement( 'div' ) )

        this.overlay.append( this.loaderRect )
        this.body.append( this.overlay )

        this.visibleTimer = null

        window.h = this.hide.bind( this )
        window.s = this.show.bind( this )
    }
    changeOpacity( step, interval ) {
        if ( this.visibleTimer ) clearTimeout ( this.visibleTimer )
        let currentValue = parseFloat( window.getComputedStyle( this.overlay ).getPropertyValue( 'opacity' ) )
        if ( step < 0 && currentValue + step <= 0 ) {
            this.overlay.style.opacity = 0
            this.overlay.style.display = 'none'
            return ;
        }
        if ( step > 0 && currentValue + step >= 1 ) {
            this.overlay.style.opacity = 1
            return ;
        }
        this.overlay.style.opacity= currentValue+step
        this.visibleTimer = setTimeout ( () => this.changeOpacity( step, interval ), interval )
    }
    hide( time = 300, framesCount = 40 ) {
        this.changeOpacity( -1 / ( time / framesCount ), framesCount )
    }
    show( time = 300, framesCount = 40 ) {
        this.overlay.style.display = 'flex'
        this.changeOpacity( 1 / ( time / framesCount ), framesCount )
    }
}