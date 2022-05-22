import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - AMI Assurance'

// ** Default Route
const DefaultRoute = '/Tableau'

// ** Merge Routes
const Routes = [
  {
    path: '/Tableau',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/addReclamation',
    component: lazy(() => import('../../views/addReclamation'))
  },

  {
    path: '/register',
    component: lazy(() => import('../../views/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/profil',
    component: lazy(() => import('../../views/profil'))
  },

  {
    path: '/listeFile',
    component: lazy(() => import('../../views/listeFile'))
  },


  {
    path: '/addExpert',
    component: lazy(() => import('../../views/addExpert'))
  },
  {
    path: '/compte',
    component: lazy(() => import('../../views/listeExpert'))
  },

  {
    path: '/edit',
    component: lazy(() => import('../../views/EditExpert'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  },

  {
    path: '/addRapport',
    component: lazy(() => import('../../views/rapportAdd'))
  },


  {
    path: '/addevis',
    component: lazy(() => import('../../views/addDevis'))
  },
  {
    path: '/Déclaration',
    component: lazy(() => import('../../views/reclamation'))
  }
]

export { DefaultRoute, TemplateTitle, Routes }
