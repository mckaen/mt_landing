import { Loader } from './loader'
export class Tracker {
    constructor( trackerBody ) {
        this.url = 'https://www.mytoys.ru/servicesru/track/'
        this.trackerBody = trackerBody || document.querySelector( '[role="tracker_body"]' )
        if ( !this.trackerBody ) return false

        this.input = this.trackerBody.querySelector( 'input' )
        //this.btn = this.trackerBody.querySelector( 'button' )
        this.inputBody = this.trackerBody.querySelector( '[role="input_body"]' )
        this.resultContainer = this.trackerBody.querySelector( '[role="resultContainer"]' )
        this.loader = new Loader( this.inputBody )
        this.attachEvents()
    }

    attachEvents() {
        this.input.addEventListener( 'input', ({ target }) => this.code = target.value.trim() )
        //this.btn.addEventListener ( 'click', this.process.bind( this ) )
        this.trackerBody.addEventListener ( 'submit', this.process.bind( this ) )
    }

    showError( err ) {
        let body = document.createElement( 'div' )
        body.classList.add( 'tracker-results' )
        this.resultContainer.classList.remove( 'show' )
        this.resultContainer.innerHTML = ''
        body.innerHTML = 'По данному коду пока нет информации'
        this.resultContainer.append( body )
        this.resultContainer.classList.add( 'show' )
    }

    showResult( data ) {
        let body = document.createElement( 'div' )
        body.classList.add( 'tracker-results' )
        this.resultContainer.classList.remove( 'show' )
        this.resultContainer.innerHTML = ''
        this.resultContainer.append( body )
        if ( data.history.length ) {
            body.innerHTML = data.history.map( item => `
                <div class="tracker-item">
                    <div class="ti-header">${ item.eventDateTime.toLocaleString() }</div>
                    <div class="ti-value">${ item.eventStatus }</div>
                </div>
            `).join('')
        } else {
            body.innerHTML = 'По данному коду пока нет информации'
        }

        this.resultContainer.classList.add( 'show' )
    }

    getData( callback ) {

        callback = callback || function(){ return null }
        fetch( this.url + this.code )
            .then( res => res.json() )
            .then( data => {
                data.history = data.history && Array.isArray( data.history ) ? data.history.map( item => {
                    item.eventDateTime = new Date( item.eventDateTime )
                    return item
                }) : []
                data.lastEvent = data.lastEvent || {}
                if ( data.lastEvent.eventDateTime ) {
                    data.lastEvent.eventDateTime = new Date( data.lastEvent.eventDateTime )
                }
                callback( null, data )
            } )
            .catch( err => callback( err, null ) )
    }

    process( evt ) {
        evt.preventDefault()
        if ( !this.code || !this.code.length ) {
            this.loader.hide()
            return false
        }
        this.loader.show()
        this.getData( ( err, data ) => {
            this.loader.hide()
            if ( err ) return this.showError( err )
            this.showResult( data )
        })
        return false
    }
    
}