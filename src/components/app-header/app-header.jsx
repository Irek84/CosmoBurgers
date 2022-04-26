import styles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {
    return (
      <header>
          <nav>
                <div>
                    <a className={`${styles.active} pr-5 mt-4 mb-4`}>
                        <BurgerIcon/>
                        <span className='text text_type_main-default pl-2'>Конструктор</span>
                    </a>
                    <a className='pr-5 pl-5 mt-4 mb-4'>
                        <ListIcon type="secondary"/>
                        <span className="text text_type_main-default pl-2">Лента заказов</span>
                    </a>
                </div>
                <div>
                    <Logo/>
                </div> 
                <div>
                    <a className='pr-5 pl-5 mt-4 mb-4'>
                        <ProfileIcon type="secondary"/>
                        <span className="text text_type_main-default pl-2">Личный кабинет</span>
                    </a>
                </div>
          </nav>
      </header>
    );
}

export default AppHeader;