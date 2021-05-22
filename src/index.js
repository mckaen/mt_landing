import './styles/base.scss'

import { Tracker } from './app/tracker'

( function() {
    document.addEventListener( 'DOMContentLoaded', () => {
        new Tracker()
    })
}) ()