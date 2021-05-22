import './styles/base.scss'

import 'whatwg-fetch'
import { Tracker } from './app/tracker'

( function() {
    document.addEventListener( 'DOMContentLoaded', () => {
        new Tracker()
    })
}) ()