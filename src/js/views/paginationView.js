import icons from 'url:../../img/icons.svg';
import View from './view';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
      ${this._generateMarkupBtnNext(curPage)}
      `;
    }

    //last page
    if (curPage === numPages) {
      return `
      ${this._generateMarkupBtnPrev(curPage)}
            `;
    }
    //other page
    if (curPage < numPages) {
      return `${this._generateMarkupBtnPrev(
        curPage
      )} ${this._generateMarkupBtnNext(curPage)}`;
    }
    //page 1, no other page
    return '';
  }
  _generateMarkupBtnPrev(cPage) {
    return `
    <button data-goto="${cPage - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${cPage - 1}</span>
    </button>;
    `;
  }
  _generateMarkupBtnNext(cPage) {
    return `
      <button data-goto="${
        cPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${cPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
  }
}
export default new PaginationView();
