export class Returns {
    constructor() {
        this.dpdInputForm = document.querySelector( '[role="dpd_input_form"]' )
        if ( !this.dpdInputForm ) return false
        this.dpdInput = this.dpdInputForm.querySelector( 'input' )
        this.attachEvents()
        console.log( this )
    }
    attachEvents() {
        this.dpdInputForm.addEventListener( 'submit', this.dpdSubmitForm.bind( this ) )
        this.dpdInput.addEventListener( 'input', ({ target }) => this.dpdValue = target.value.trim() )
    }
    dpdSubmitForm( evt ) {
        evt.preventDefault()
        window.open( `https://www.dpd.ru/return.do2?1001050088$${ this.dpdValue }` )
        return false
    }
}