import { Loader } from './loader'
export class Tracker {
    constructor( trackerBody ) {
        this.url = 'https://www.mytoys.ru/servicesru/track/'
        this.trackerBody = trackerBody || document.querySelector( '[role="tracker_body"]' )
        if ( !this.trackerBody ) return false

        this.input = this.trackerBody.querySelector( 'input' )
        this.btn = this.trackerBody.querySelector( 'button' )
        this.inputBody = this.trackerBody.querySelector( '[role="input_body"]' )
        this.resultContainer = this.trackerBody.querySelector( '[role="resultContainer"]' )
        this.loader = new Loader( this.inputBody )
        this.attachEvents()
        this.code = 'MTS133937058'
    }

    attachEvents() {
        this.input.addEventListener( 'input', ({ target }) => this.code = target.value.trim() )
        this.btn.addEventListener ( 'click', this.process.bind( this ) )
    }

    showError() {
        
    }

    showResult( data ) {
        let body = document.createElement( 'div' )
        body.classList.add( 'tracker-results' )
        this.resultContainer.classList.remove( 'show' )
        this.resultContainer.innerHTML = ''
        this.resultContainer.append( body )
        body.innerHTML = data.history.map( item => `
            <div class="tracker-item">
                <div class="ti-header">${ item.eventDateTime.toLocaleString() }</div>
                <div class="ti-value">${ item.eventStatus }</div>
            </div>
        `).join('')
        this.resultContainer.classList.add( 'show' )
    }

    getData( callback ) {

        
        setTimeout( () => {
            let tdata = {"history":[{"eventStatus":"Загружен реестр ИМ","eventDateTime":"2021-05-20 18:53:56"},{"eventStatus":"Принято к доставке","eventDateTime":"2021-05-20 20:51:12"},{"eventStatus":"Передано на сортировку","eventDateTime":"2021-05-20 20:51:13"},{"eventStatus":"Отправлено в город назначения","eventDateTime":"2021-05-21 05:40:43"}],"lastEvent":{"eventStatus":"Отправлено в город назначения","eventDateTime":"2021-05-21 05:40:43"}}

            tdata.history = tdata.history && Array.isArray( tdata.history ) ? tdata.history.map( item => {
                item.eventDateTime = new Date( item.eventDateTime )
                return item
            }) : []
            if ( tdata.lastEvent && tdata.lastEvent.eventDateTime ) {
                tdata.lastEvent.eventDateTime = new Date( tdata.lastEvent.eventDateTime )
            }
            callback( null, tdata )
        }, 1000 )
        
        /*fetch( this.url + this.code )
            .then( res => json() )
            .then( data => console.log( data ) )
            .catch( e => {
                this.loader.hide()
                this.showError()
            })*/
    }

    process() {
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
    }
    
}