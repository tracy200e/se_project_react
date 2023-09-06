import './Header.css';

const Header = ({ onCreateModal }) => {
    console.log('Header');

    return(
        <header className='header'>
        <div className='header__logo'>
          <div>
            <img src={require('../../images/logo.svg').default} alt='logo' />
          </div>
          <div>Date</div>
        </div>
        <div className='header__avatar-logo'>
          <div>
            <button className='header__button' type='text' onClick={onCreateModal}>+ Add Clothes</button>
          </div>
          <div>Name</div>
          <div>
            <img src={require('../../images/avatar.svg').default} alt='logo' />
          </div>
        </div>
      </header>
    )
}

export default Header;