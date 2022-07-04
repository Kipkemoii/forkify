import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipe = async function () {
  try {
    let id = window.location.hash.slice(1);
    if (!id) return;
    //update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    recipeView.renderSpinner();
    //update bookmarks
    bookmarkView.update(model.state.bookmarks);
    //Loading recipe
    await model.loadRecipe(id);
    //Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView._renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //Get search query
    const query = searchView.getQuery();

    if (!query) return;
    //load search results
    await model.loadSearchResults(query);
    //Render results
    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    //Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  //Render  NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));
  //Render NEW pagination buttons
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  //update the recipe servings (in state)
  //update the recipe view
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  //add/ remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //update recipeView
  recipeView.update(model.state.recipe);
  //render bookmark
  bookmarkView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    //show spinner
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //render recipe
    recipeView.render(model.state.recipe);
    //close window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
    //success message
    addRecipeView._renderMessage();
    //render Bookmark view
    bookmarkView.render(model.state.bookmarks);
    //change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    console.log(err);
    addRecipeView._renderError(err.message);
  }
};
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
