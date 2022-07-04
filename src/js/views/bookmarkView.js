import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './view';
class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _ErrorMessage =
    'No recipes were found for your query, kindly try another one!';
  _message = '';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new bookmarkView();
