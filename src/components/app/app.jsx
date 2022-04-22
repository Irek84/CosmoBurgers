import {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import {url} from '../../utils/properties';

function App() {
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState({
		visible: false,
    title: null,
		content: null
	});

  useEffect(()=>{
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Ошибка в сети');
    })
    .then(data => {
      setIsLoading(false);
      data.success?  
      setData(data.data)
      :
        setHasError(true)
      }
    )
    .catch(e => {
      setHasError(true);
      setIsLoading(false);
    });
},[]);
  return (
    <>
      <AppHeader/>
      <main>
        <div className={styles.main_content}>
        {isLoading && <div className={`${styles.notification} text text_type_main-medium`}>Загрузка...</div>}
        {hasError &&  <div className={`${styles.error} text text_type_main-medium`}>Произошла ошибка</div>}
        {
          !isLoading &&
          !hasError &&
          data.length && <>
            <BurgerIngredients data={data} setModal={setModal}/>
            <BurgerConstructor data={data} setModal={setModal}/>
            </>
        }
        </div>
        {modal.visible && <Modal setModal={setModal} title={modal.title}>{modal.content}</Modal>}
      </main>
    </>
  );
}

export default App;