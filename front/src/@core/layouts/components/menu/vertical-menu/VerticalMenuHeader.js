// ** React Imports
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

// ** Third Party Components
import { Disc, X, Circle } from 'react-feather'

// ** Config
import themeConfig from '@configs/themeConfig'

const VerticalMenuHeader = props => {
  // ** Props
  const { menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover } = props

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([])
  }, [menuHover, menuCollapsed])

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(true)}
        />
      )
    } else {
      return (
        <Circle
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(false)}
        />
      )
    }
  }

  return (
    <div className='navbar-header' ref={(node) => { if (node) { node.style.setProperty("height", "25%", "important"); } } }>
      <ul className='nav navbar-nav flex-row'>
        <li className='nav-item mr-auto'>
          <NavLink to='/' className='navbar-brand'  >
            <span className='brand-logo'>
              <img src={themeConfig.app.appLogoImage} alt='logo' ref={(node) => { if (node) { node.style.setProperty("max-width", "100%", "important"); } } } />
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default VerticalMenuHeader
