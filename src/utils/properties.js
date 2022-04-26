import PropTypes from 'prop-types';

export const dataBurgerPropTypes = PropTypes.shape({
   _id: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   proteins: PropTypes.number.isRequired,
   fat: PropTypes.number.isRequired,
   carbohydrates: PropTypes.number.isRequired,
   calories: PropTypes.number.isRequired,
   price: PropTypes.number.isRequired,
   image: PropTypes.string.isRequired,
   image_mobile: PropTypes.string.isRequired,
   image_large: PropTypes.string.isRequired,
 });

 export const ROOT_API_URL = 'https://norma.nomoreparties.space/api';
 export const selectedBunId = '60d3b41abdacab0026a733c6';
 export const selectedIngredientIds = ['60d3b41abdacab0026a733c6','60d3b41abdacab0026a733c8', '60d3b41abdacab0026a733ca', '60d3b41abdacab0026a733cc','60d3b41abdacab0026a733d0', '60d3b41abdacab0026a733d1','60d3b41abdacab0026a733c9'];