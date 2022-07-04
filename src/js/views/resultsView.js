import icons from 'url:../../img/icons.svg';
import View from './view';
import previewView from './previewView';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _ErrorMessage =
    'No recipes were found for your query, kindly try another one!';
  _message = '';
  _generateMarkup() {
    return this._data
      .map(results => previewView.render(results, false))
      .join('');
  }
}
export default new ResultsView();
