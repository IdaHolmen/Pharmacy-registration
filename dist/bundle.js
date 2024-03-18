/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _formValidation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formValidation */ \"./src/js/formValidation.js\");\n\n\n// LOCAL STORAGE\nconst saveToLocalStorage = (key, value) => {\n  localStorage.setItem(key, JSON.stringify(value));\n};\nconst getFromLocalStorage = key => {\n  const savedInfoJSON = localStorage.getItem(key);\n  const savedObject = JSON.parse(savedInfoJSON);\n  return savedObject;\n};\nlet medicines = getFromLocalStorage('medicinesArray') ?? [];\n\n//SELECTING THE ELEMENTS FROM THE DOM\nconst mainContainer = document.querySelector('.main-container');\nconst pharmacyForm = document.querySelector('.pharmacy-form');\nconst pharmacyList = document.querySelector('.pharmacy-list');\nconst headerText = document.querySelector('.header-text');\nconst productName = document.querySelector('.product-name');\nconst manufacturer = document.querySelector('.manufacturer');\nconst date = document.querySelector('.expiration-date');\nconst quantity = document.querySelector('.quantity');\nconst selectElement = document.querySelector('.medicine-type');\nconst displayMedicine = document.querySelector('.display-medicine');\nconst displayMedicineContainer = document.querySelector('.display-medicine-container');\nconst emptyContentContainer = document.querySelector('.content-empty-text');\nconst renderLiquidMedicineButton = document.querySelector('.render-liquids-button');\nconst renderTabletMedicineButton = document.querySelector('.render-tablets-button');\nconst renderCapsuleMedicineButton = document.querySelector('.render-capsules-button');\nconst renderTopicalMedicineButton = document.querySelector('.render-topicals-button');\nconst navigateToRegistrationButton = document.querySelector('.navigate-to-form-button');\nconst navigateToDisplayPageButton = document.querySelector('.navigate-to-display-button');\nconst submitButton = document.querySelector('.submit-button');\nconst updateFormContainer = document.querySelector('.update-form-container');\nconst exitButton = document.querySelector('.exit-update-form-button');\n\n//SELECTING THE ERROR ELEMENT\nconst nameErrorElement = document.querySelector('.name-error-message');\nconst manufacturerErrorElement = document.querySelector('.manufacturer-error-message');\nconst dateErrorElement = document.querySelector('.date-error-message');\nconst quantityErrorElement = document.querySelector('.quantity-error-message');\n\n//ADDING EVENT LISTENERS\n\nnavigateToRegistrationButton.addEventListener('click', e => {\n  e.preventDefault();\n  navigateToRegistrationButton.classList.add('navigate-to-form-button--active');\n  navigateToDisplayPageButton.classList.remove('navigate-to-display-button--active');\n  mainContainer.style.backgroundColor = '#d0f4de';\n  pharmacyForm.style.display = 'flex';\n  pharmacyList.style.display = 'none';\n  headerText.textContent = 'Ready to Register some Medicines?';\n});\nnavigateToDisplayPageButton.addEventListener('click', e => {\n  e.preventDefault();\n  navigateToDisplayPageButton.classList.add('navigate-to-display-button--active');\n  navigateToRegistrationButton.classList.remove('navigate-to-form-button--active');\n  mainContainer.style.backgroundColor = '#a9def9';\n  pharmacyForm.style.display = 'none';\n  pharmacyList.style.display = 'flex';\n  headerText.textContent = 'Medicines';\n  renderLiquidMedicineButton.click();\n});\npharmacyForm.addEventListener('submit', e => {\n  e.preventDefault();\n  const {\n    medicineFormStatus\n  } = (0,_formValidation__WEBPACK_IMPORTED_MODULE_0__.validateMedicineForm)(productName.value, manufacturer.value, date.value, quantity.value, nameErrorElement, manufacturerErrorElement, dateErrorElement, quantityErrorElement);\n  if (!medicineFormStatus()) {\n    let newMedicine;\n    if (selectElement.value === 'liquid') {\n      newMedicine = new Liquid(productName.value, manufacturer.value, date.value, quantity.value, selectElement.value);\n    } else if (selectElement.value === 'tablet') {\n      newMedicine = new Tablet(productName.value, manufacturer.value, date.value, quantity.value, selectElement.value);\n    } else if (selectElement.value === 'capsule') {\n      newMedicine = new Capsule(productName.value, manufacturer.value, date.value, quantity.value, selectElement.value);\n    } else {\n      newMedicine = new Topical(productName.value, manufacturer.value, date.value, quantity.value, selectElement.value);\n    }\n    Liquid.addMedicine(newMedicine);\n    console.log(newMedicine);\n    submitButton.classList.add('submit-button--success');\n    submitButton.textContent = '✓ Added';\n    setTimeout(() => {\n      submitButton.classList.remove('submit-button--success');\n      submitButton.textContent = 'Register Medicine';\n    }, 2000);\n    pharmacyForm.reset();\n  } else {\n    console.log('Form validation failed.');\n  }\n});\nrenderLiquidMedicineButton.addEventListener('click', () => {\n  UI.activeTab = 'liquid';\n  UI.renderMedicines(medicines, 'Liquid Medicines');\n  removeActiveClasses();\n  renderLiquidMedicineButton.classList.add('render-liquids-button--active');\n});\nrenderTabletMedicineButton.addEventListener('click', () => {\n  UI.activeTab = 'tablet';\n  UI.renderMedicines(medicines, 'Tablet Medicines');\n  removeActiveClasses();\n  renderTabletMedicineButton.classList.add('render-tablets-button--active');\n});\nrenderCapsuleMedicineButton.addEventListener('click', () => {\n  UI.activeTab = 'capsule';\n  UI.renderMedicines(medicines, 'Capsule Medicines');\n  removeActiveClasses();\n  renderCapsuleMedicineButton.classList.add('render-capsules-button--active');\n});\nrenderTopicalMedicineButton.addEventListener('click', () => {\n  UI.activeTab = 'topical';\n  UI.renderMedicines(medicines, 'Topical Medicines');\n  removeActiveClasses();\n  renderTopicalMedicineButton.classList.add('render-topicals-button--active');\n});\nconst removeActiveClasses = () => {\n  renderLiquidMedicineButton.classList.remove('render-liquids-button--active');\n  renderTabletMedicineButton.classList.remove('render-tablets-button--active');\n  renderCapsuleMedicineButton.classList.remove('render-capsules-button--active');\n  renderTopicalMedicineButton.classList.remove('render-topicals-button--active');\n};\n\n// DECLARING THE MEDICINE CLASS\nclass Medicine {\n  constructor(name, manufacturer, date, quantity, type) {\n    this.name = name;\n    this.manufacturer = manufacturer;\n    this.date = date;\n    this.quantity = quantity;\n    this.type = type;\n    this.ID = Date.now();\n  }\n  static addMedicine(medicine) {\n    medicines.push(medicine);\n    saveToLocalStorage('medicinesArray', medicines);\n  }\n\n  //DELETE METHOD\n  static deleteMedicine(id, medicinesArray) {\n    const updateMedicineList = medicinesArray.filter(medicine => medicine.ID !== id);\n    medicines = updateMedicineList;\n    saveToLocalStorage('medicinesArray', medicines);\n    UI.renderMedicines(updateMedicineList, UI.activeTab);\n  }\n}\n\n//DECLARING THE LIQUID CLASS\nclass Liquid extends Medicine {\n  constructor(name, manufacturer, date, quantity, type) {\n    super(name, manufacturer, date, quantity, type);\n    this.ID = Date.now();\n  }\n}\n\n//DECLARING THE TABLET CLASS\nclass Tablet extends Medicine {\n  constructor(name, manufacturer, date, quantity, type) {\n    super(name, manufacturer, date, quantity, type);\n    this.ID = Date.now();\n  }\n}\n\n//DECLARING THE CAPSULE CLASS\nclass Capsule extends Medicine {\n  constructor(name, manufacturer, date, quantity, type) {\n    super(name, manufacturer, date, quantity, type);\n    this.ID = Date.now();\n  }\n}\n\n//DECLARING THE TOPICAL CLASS\nclass Topical extends Medicine {\n  constructor(name, manufacturer, date, quantity, type) {\n    super(name, manufacturer, date, quantity, type);\n    this.ID = Date.now();\n  }\n}\n\n// REMOVES ALL CHILD NODES FROM THE DOM\nconst removeAllChildNodes = parent => {\n  while (parent && parent.firstChild) {\n    parent.removeChild(parent.firstChild);\n  }\n};\n\n// DECLARE THE UI CLASS\nclass UI {\n  static activeTab = 'liquid';\n  static renderMedicines(medicines, title) {\n    // REMOVING ALL ELEMENTS FROM THE CONTAINER THAT DISPLAYS THE MEDICINES\n    removeAllChildNodes(displayMedicine);\n    const relevantMedicines = medicines.filter(medicine => medicine.type === UI.activeTab);\n    // WORKING ON CREATING AN ELEMENT ON TOP THAT SHOW HOW MANY MEDICINES ARE IN THE ARRAY\n    if (title) {\n      const pageTitle = document.createElement('h3');\n      pageTitle.textContent = `${title} (${relevantMedicines.length})`;\n      pageTitle.style.display = 'block';\n    }\n\n    // IF THE MEDICINES ARE EMPTY\n    if (!relevantMedicines.length) {\n      emptyContentContainer.style.display = 'block';\n      emptyContentContainer.textContent = 'No medicines to show.';\n      displayMedicine.append(emptyContentContainer);\n      return;\n    }\n    emptyContentContainer.style.display = 'none';\n    relevantMedicines.forEach(medicine => {\n      // CREATING THE ELEMENTS\n      const displayMedicineInfo = document.createElement('div');\n      const listDiv = document.createElement('div');\n      const renderedName = document.createElement('span');\n      const renderedManufacturer = document.createElement('span');\n      const renderedDate = document.createElement('span');\n      const renderedQuantity = document.createElement('span');\n      const renderedType = document.createElement('span');\n      const buttonContainer = document.createElement('div');\n      const deleteButton = document.createElement('button');\n      const trashCan = document.createElement('img');\n\n      // SETTING THE CONTENT\n      renderedName.textContent = `Product name: ${medicine.name}`;\n      renderedManufacturer.textContent = `Manufacturer: ${medicine.manufacturer}`;\n      renderedDate.textContent = `Expiration date: ${medicine.date}`;\n      renderedQuantity.textContent = `Quantity: ${medicine.quantity}`;\n      renderedType.textContent = `Type of medicine: ${medicine.type}`;\n      deleteButton.textContent = 'Delete';\n      trashCan.src = `../src/assets/trash-sharp-regular.svg`;\n\n      // ADDING THE CLASSES\n      displayMedicineInfo.classList.add('display-info');\n      listDiv.classList.add('medicine-div');\n      buttonContainer.classList.add('button-container');\n      deleteButton.classList.add('delete-button');\n      trashCan.classList.add('trash-can-image');\n      listDiv.dataset.id = medicine.ID;\n\n      // APPEND THE ELEMENTS\n      displayMedicine.append(displayMedicineInfo);\n      displayMedicineInfo.append(listDiv, buttonContainer);\n      listDiv.append(renderedName, renderedManufacturer, renderedDate, renderedQuantity, renderedType);\n      buttonContainer.append(deleteButton);\n      deleteButton.append(trashCan);\n\n      // DELETE BUTTON\n      deleteButton.addEventListener('click', e => {\n        e.preventDefault();\n        const rowID = medicine.ID;\n        Medicine.deleteMedicine(rowID, medicines);\n      });\n    });\n  }\n}\n\n//# sourceURL=webpack://assignment-2/./src/js/app.js?");

/***/ }),

/***/ "./src/js/formValidation.js":
/*!**********************************!*\
  !*** ./src/js/formValidation.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   validateMedicineForm: function() { return /* binding */ validateMedicineForm; }\n/* harmony export */ });\n// FORM VALIDATION\nconst validateMedicineForm = (name, manufacturer, date, quantity, nameErrorElement, manufacturerErrorElement, dateErrorElement, quantityErrorElement) => {\n  const errors = {\n    errorStatus: false,\n    nameError: '',\n    manufacturerError: '',\n    dateError: '',\n    quantityError: ''\n  };\n  if (!name && !manufacturer && !date && !quantity) {\n    errors.errorStatus = true, errors.nameError = 'Product name is required ⚠️', errors.manufacturerError = 'Manufacturer is required ⚠️', errors.dateError = 'Expiration date is required ', errors.quantityError = 'Quanitity is required ⚠️', nameErrorElement.style.visibility = 'visible';\n    manufacturerErrorElement.style.visibility = 'visible';\n    dateErrorElement.style.visibility = 'visible';\n    quantityErrorElement.style.visibility = 'visible';\n    nameErrorElement.textContent = errors.nameError;\n    manufacturerErrorElement.textContent = errors.manufacturerError;\n    dateErrorElement.textContent = errors.dateError;\n    quantityErrorElement.textContent = errors.quantityError;\n  } else if (!name) {\n    errors.errorStatus = true, errors.nameError = 'Product name is required ⚠️', errors.manufacturerError = '', errors.dateError = '', errors.quantityError = '', nameErrorElement.style.visibility = 'visible';\n    manufacturerErrorElement.style.visibility = 'hidden';\n    dateErrorElement.style.visibility = 'hidden';\n    quantityErrorElement.style.visibility = 'hidden';\n    nameErrorElement.textContent = errors.nameError;\n    manufacturerErrorElement.textContent = errors.manufacturerError;\n    dateErrorElement.textContent = errors.dateError;\n    quantityErrorElement.textContent = errors.quantityError;\n  } else if (!manufacturer) {\n    errors.errorStatus = true, errors.nameError = '', errors.manufacturerError = 'Manufacturer is required ⚠️', errors.dateError = '', errors.quantityError = '', nameErrorElement.style.visibility = 'hidden';\n    manufacturerErrorElement.style.visibility = 'visible';\n    dateErrorElement.style.visibility = 'hidden';\n    quantityErrorElement.style.visibility = 'hidden';\n    nameErrorElement.textContent = errors.nameError;\n    manufacturerErrorElement.textContent = errors.manufacturerError;\n    dateErrorElement.textContent = errors.dateError;\n    quantityErrorElement.textContent = errors.quantityError;\n  } else if (!date) {\n    errors.errorStatus = true, errors.nameError = '', errors.manufacturerError = '', errors.dateError = 'Expiration date is required ⚠️', errors.quantityError = '', nameErrorElement.style.visibility = 'hidden';\n    manufacturerErrorElement.style.visibility = 'hidden';\n    dateErrorElement.style.visibility = 'visible';\n    quantityErrorElement.style.visibility = 'hidden';\n    nameErrorElement.textContent = errors.nameError;\n    manufacturerErrorElement.textContent = errors.manufacturerError;\n    dateErrorElement.textContent = errors.dateError;\n    quantityErrorElement.textContent = errors.quantityError;\n  } else if (!quantity) {\n    errors.errorStatus = true, errors.nameError = '', errors.manufacturerError = '', errors.dateError = '', errors.quantityError = 'Quantity is required ⚠️', nameErrorElement.style.visibility = 'hidden';\n    manufacturerErrorElement.style.visibility = 'hidden';\n    dateErrorElement.style.visibility = 'hidden';\n    quantityErrorElement.style.visibility = 'visible';\n    nameErrorElement.textContent = errors.nameError;\n    manufacturerErrorElement.textContent = errors.manufacturerError;\n    dateErrorElement.textContent = errors.dateError;\n    quantityErrorElement.textContent = errors.quantityError;\n  } else {\n    errors.errorStatus = false, errors.nameError = '', errors.manufacturerError = '', errors.dateError = '', errors.quantityError = '', nameErrorElement.style.visibility = 'hidden';\n    manufacturerErrorElement.style.visibility = 'hidden';\n    dateErrorElement.style.visibility = 'hidden';\n    quantityErrorElement.style.visibility = 'hidden';\n    nameErrorElement.textContent = errors.nameError;\n    manufacturerErrorElement.textContent = errors.manufacturerError;\n    dateErrorElement.textContent = errors.dateError;\n    quantityErrorElement.textContent = errors.quantityError;\n  }\n  const medicineFormStatus = () => {\n    return errors.errorStatus;\n  };\n  return {\n    medicineFormStatus\n  };\n};\n\n\n//# sourceURL=webpack://assignment-2/./src/js/formValidation.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/app.js");
/******/ 	
/******/ })()
;