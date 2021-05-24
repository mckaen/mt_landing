import './styles/base.scss'

import 'whatwg-fetch'
import { Tracker } from './app/tracker'
import { PageController } from './app/pageController'
import { Returns } from './app/return'

( function() {
    document.addEventListener( 'DOMContentLoaded', () => {
        new PageController()
        new Tracker()
        new Returns()
    })
}) ()