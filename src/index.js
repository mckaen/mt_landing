import './styles/base.scss'

import 'whatwg-fetch'
import { Tracker } from './app/tracker'
import { PageController } from './app/pageController'

( function() {
    document.addEventListener( 'DOMContentLoaded', () => {
        new PageController()
        new Tracker()
    })
}) ()