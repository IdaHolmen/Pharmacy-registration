// LOCAL STORAGE
const saveToLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
}

const getFromLocalStorage = (key) => {
	const savedInfoJSON = localStorage.getItem(key);
	const savedObject = JSON.parse(savedInfoJSON);
	return savedObject;
}

let medicines = getFromLocalStorage('medicinesArray') ?? [];

//SELECTING THE ELEMENTS FROM THE DOM
const mainContainer = document.querySelector('.main-container');
const pharmacyForm = document.querySelector('.pharmacy-form');
const pharmacyList = document.querySelector('.pharmacy-list');
const headerText = document.querySelector('.header-text');

const productName = document.querySelector('.product-name');
const manufacturer = document.querySelector('.manufacturer');
const date = document.querySelector('.expiration-date');
const quantity = document.querySelector('.quantity');
const selectElement = document.querySelector('.medicine-type');

const displayMedicineContainer = document.querySelector('.display-medicine-container');
const displayMedicine = document.querySelector('.display-medicine');
const emptyContentContainer = document.querySelector('.content-empty-text');

const renderLiquidMedicineButton = document.querySelector('.render-liquids-button');
const renderTabletMedicineButton = document.querySelector('.render-tablets-button');
const renderCapsuleMedicineButton = document.querySelector('.render-capsules-button');
const renderTopicalMedicineButton = document.querySelector('.render-topicals-button');

const navigateToRegistrationButton = document.querySelector('.navigate-to-form-button');
const navigateToDisplayPageButton = document.querySelector('.navigate-to-display-button');

const submitButton = document.querySelector('.submit-button');
//ADDING EVENT LISTENERS

navigateToRegistrationButton.addEventListener('click', (e)=> {
	e.preventDefault();
	navigateToRegistrationButton.classList.add('navigate-to-form-button--active');

	navigateToDisplayPageButton.classList.remove('navigate-to-display-button--active');

	mainContainer.style.backgroundColor = '#d0f4de';
	pharmacyForm.style.display = 'flex';
	pharmacyList.style.display = 'none';
	headerText.textContent = 'Ready to Register some Medicines?';
});

navigateToDisplayPageButton.addEventListener('click', (e)=> {
	e.preventDefault();
	navigateToDisplayPageButton.classList.add('navigate-to-display-button--active');

	navigateToRegistrationButton.classList.remove('navigate-to-form-button--active');

	mainContainer.style.backgroundColor = '#a9def9';
	pharmacyForm.style.display = 'none';
	pharmacyList.style.display = 'flex';
	headerText.textContent = 'Medicines';

	renderLiquidMedicineButton.click()
});


pharmacyForm.addEventListener('submit', (e)=> {
	e.preventDefault();

	const validationResult = validateMedicineForm(productName.value, manufacturer.value, date.value,quantity.value, nameErrorElement, manufacturerErrorElement, dateErrorElement, quantityErrorElement);

	if (!validationResult.medicineFormStatus()) {
		let newMedicine;

		if(selectElement.value === 'liquid') {
		newMedicine = new Liquid (
			productName.value,
			manufacturer.value,
			date.value,
			quantity.value, 
			selectElement.value
		);
		} else if(selectElement.value === 'tablet') {
		newMedicine = new Tablet (
			productName.value,
			manufacturer.value,
			date.value,
			quantity.value, 
			selectElement.value
		);
		} else if (selectElement.value === 'capsule'){
		newMedicine = new Capsule (
			productName.value,
			manufacturer.value,
			date.value,
			quantity.value, 
			selectElement.value
		);
		} else {
		newMedicine = new Topical (
			productName.value,
			manufacturer.value,
			date.value,
			quantity.value, 
			selectElement.value
		);
		}
		Liquid.addMedicine(newMedicine);
		console.log(newMedicine);

		submitButton.classList.add('submit-button--success');
        submitButton.textContent = '✓ Added';

		setTimeout(() => {
            submitButton.classList.remove('submit-button--success');
            submitButton.textContent = 'Register Medicine';
        }, 2000);

		pharmacyForm.reset();
	} else {
		console.log('Form validation failed.');
	}
});


renderLiquidMedicineButton.addEventListener('click', ()=> {
	UI.activeTab = 'liquid';
	UI.renderMedicines(medicines, 'Liquid Medicines');
	removeActiveClasses()
	renderLiquidMedicineButton.classList.add('render-liquids-button--active');
})

renderTabletMedicineButton.addEventListener('click', ()=> {
	UI.activeTab = 'tablet';
	UI.renderMedicines(medicines, 'Tablet Medicines');
	removeActiveClasses()
	renderTabletMedicineButton.classList.add('render-tablets-button--active');
})

renderCapsuleMedicineButton.addEventListener('click', ()=> {
	UI.activeTab = 'capsule';
	UI.renderMedicines(medicines, 'Capsule Medicines');
	removeActiveClasses()
	renderCapsuleMedicineButton.classList.add('render-capsules-button--active');
})

renderTopicalMedicineButton.addEventListener('click', ()=> {
	UI.activeTab = 'topical';
	UI.renderMedicines(medicines, 'Topical Medicines');
	removeActiveClasses()
	renderTopicalMedicineButton.classList.add('render-topicals-button--active');
})

const removeActiveClasses = () => {
	renderLiquidMedicineButton.classList.remove('render-liquids-button--active');
    renderTabletMedicineButton.classList.remove('render-tablets-button--active');
    renderCapsuleMedicineButton.classList.remove('render-capsules-button--active');
	renderTopicalMedicineButton.classList.remove('render-topicals-button--active');
}

// DECLARING THE MEDICINE CLASS
class Medicine {
	constructor(name, manufacturer, date, quantity, type){
		this.name = name;
		this.manufacturer = manufacturer;
		this.date = date;
		this.quantity = quantity;
		this.type = type;
		this.ID = Date.now();
	} 
	static addMedicine(medicine) {
		medicines.push(medicine);
		saveToLocalStorage('medicinesArray', medicines);
	}

	//DELETE METHOD
	static deleteMedicine(id, medicinesArray) {
		const updateMedicineList = medicinesArray.filter(medicine => medicine.ID !== id);
		medicines = updateMedicineList;
		saveToLocalStorage('medicinesArray', medicines);
		UI.renderMedicines(updateMedicineList, UI.activeTab);
	}
}

//DECLARING THE LIQUID CLASS
class Liquid extends Medicine {
	constructor(name, manufacturer, date, quantity, type){
		super(name, manufacturer, date, quantity, type);
		this.ID = Date.now();
	}
}

//DECLARING THE TABLET CLASS
class Tablet extends Medicine {
	constructor(name, manufacturer, date, quantity, type){
		super(name, manufacturer, date, quantity, type);
		this.ID = Date.now();
	}
}

//DECLARING THE CAPSULE CLASS
class Capsule extends Medicine {
	constructor(name, manufacturer, date, quantity, type){
		super(name, manufacturer, date, quantity, type);
		this.ID = Date.now();
	}
}

//DECLARING THE TOPICAL CLASS
class Topical extends Medicine {
	constructor(name, manufacturer, date, quantity, type){
		super(name, manufacturer, date, quantity, type);
		this.ID = Date.now();
	}
}

// REMOVES ALL CHILD NODES FROM THE DOM
const removeAllChildNodes = (parent) => {
	while (parent && parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

// DECLARE THE UI CLASS
class UI {
	static activeTab = 'liquid';
	static renderMedicines(medicines, title) {
	
		// REMOVING ALL ELEMENTS FROM THE CONTAINER THAT DISPLAYS THE MEDICINES
		removeAllChildNodes(displayMedicine)


		const relevantMedicines = medicines.filter(medicine => medicine.type === UI.activeTab);
		// WORKING ON CREATING AN ELEMENT ON TOP THAT SHOW HOW MANY MEDICINES ARE IN THE ARRAY
		if (title) {
			const pageTitle = document.createElement('h3');
			pageTitle.textContent = `${title} (${relevantMedicines.length})`;
			pageTitle.style.display = 'block';
		}

		// IF THE MEDICINES ARE EMPTY
		if (!relevantMedicines.length) {
			emptyContentContainer.style.display = 'block';
			emptyContentContainer.textContent = 'No medicines to show.';
			displayMedicine.append(emptyContentContainer)
			return;
		}

		emptyContentContainer.style.display ='none';

		relevantMedicines.forEach(medicine => {
			// CREATING THE ELEMENTS
			const displayMedicineInfo = document.createElement('div');
			const listDiv = document.createElement('div');
			const renderedName = document.createElement('span');
			const renderedManufacturer = document.createElement('span');
			const renderedDate = document.createElement('span');
			const renderedQuantity = document.createElement('span');
			const renderedType = document.createElement('span');

			const buttonContainer = document.createElement('div');
			const deleteButton = document.createElement('button');
			const trashCan = document.createElement('img');
			const updateButton = document.createElement('button');
			const penImage = document.createElement('img');

			// SETTING THE CONTENT
			renderedName.textContent = `Product name: ${medicine.name}`;
			renderedManufacturer.textContent = `Manufacturer: ${medicine.manufacturer}`;
			renderedDate.textContent = `Expiration date: ${medicine.date}`;
			renderedQuantity.textContent = `Quantity: ${medicine.quantity}`;
			renderedType.textContent = `Type of medicine: ${medicine.type}`;
			updateButton.textContent = 'Update';
			penImage.src = `../src/assets/pen-sharp-regular.svg`;
			deleteButton.textContent = 'Delete';
			trashCan.src = `../src/assets/trash-sharp-regular.svg`;

			// ADDING THE CLASSES
			displayMedicineInfo.classList.add('display-info');
			listDiv.classList.add('medicine-div');
			buttonContainer.classList.add('button-container');
			deleteButton.classList.add('delete-button');
			trashCan.classList.add('trash-can-image');
			updateButton.classList.add('update-button');
			penImage.classList.add('pen-image');

			listDiv.dataset.id = medicine.ID;

			// APPEND THE ELEMENTS
			displayMedicine.append(displayMedicineInfo);
			displayMedicineInfo.append(listDiv, buttonContainer);
			listDiv.append(renderedName, renderedManufacturer, renderedDate, renderedQuantity, renderedType);
			buttonContainer.append(updateButton, deleteButton);
			deleteButton.append(trashCan);
			updateButton.append(penImage);

			// DELETE BUTTON
			deleteButton.addEventListener('click', (e) => {
				e.preventDefault()
				const rowID = medicine.ID;
				Medicine.deleteMedicine(rowID, medicines);
			})
		});	
	}
}


//SELECTING THE ERROR ELEMENT
const nameErrorElement = document.querySelector('.name-error-message');
const manufacturerErrorElement = document.querySelector('.manufacturer-error-message');
const dateErrorElement = document.querySelector('.date-error-message');
const quantityErrorElement = document.querySelector('.quantity-error-message');

// FORM VALIDATION
const validateMedicineForm = (name, manufacturer, date, quantity, nameErrorElement, manufacturerErrorElement, dateErrorElement, quantityErrorElement) => {
	const errors = {
		errorStatus: false, 
		nameError: '',
		manufacturerError: '',
		dateError: '',
		quantityError: '',
	}

	if (!name && !manufacturer && !date && !quantity) {
		errors.errorStatus = true,
		errors.nameError = 'Product name is required ⚠️',
		errors.manufacturerError = 'Manufacturer is required ⚠️',
		errors.dateError = 'Expiration date is required ',
		errors.quantityError = 'Quanitity is required ⚠️',

		nameErrorElement.style.visibility = 'visible';
		manufacturerErrorElement.style.visibility = 'visible';
		dateErrorElement.style.visibility = 'visible';
		quantityErrorElement.style.visibility = 'visible';

		nameErrorElement.textContent = errors.nameError;
		manufacturerErrorElement.textContent = errors.manufacturerError;
		dateErrorElement.textContent = errors.dateError;
		quantityErrorElement.textContent = errors.quantityError;

	} else if (!name) {
		errors.errorStatus = true,
		errors.nameError = 'Product name is required ⚠️',
		errors.manufacturerError = '',
		errors.dateError = '',
		errors.quantityError = '',

		nameErrorElement.style.visibility = 'visible';
		manufacturerErrorElement.style.visibility = 'hidden';
		dateErrorElement.style.visibility = 'hidden';
		quantityErrorElement.style.visibility = 'hidden';

		nameErrorElement.textContent = errors.nameError;
		manufacturerErrorElement.textContent = errors.manufacturerError;
		dateErrorElement.textContent = errors.dateError;
		quantityErrorElement.textContent = errors.quantityError;

	} else if (!manufacturer) {
		errors.errorStatus = true,
		errors.nameError = '',
		errors.manufacturerError = 'Manufacturer is required ⚠️',
		errors.dateError = '',
		errors.quantityError = '',

		nameErrorElement.style.visibility = 'hidden';
		manufacturerErrorElement.style.visibility = 'visible';
		dateErrorElement.style.visibility = 'hidden';
		quantityErrorElement.style.visibility = 'hidden';

		nameErrorElement.textContent = errors.nameError;
		manufacturerErrorElement.textContent = errors.manufacturerError;
		dateErrorElement.textContent = errors.dateError;
		quantityErrorElement.textContent = errors.quantityError;

	} else if (!date) {
		errors.errorStatus = true,
		errors.nameError = '',
		errors.manufacturerError = '',
		errors.dateError = 'Expiration date is required ⚠️',
		errors.quantityError = '',

		nameErrorElement.style.visibility = 'hidden';
		manufacturerErrorElement.style.visibility = 'hidden';
		dateErrorElement.style.visibility = 'visible';
		quantityErrorElement.style.visibility = 'hidden';

		nameErrorElement.textContent = errors.nameError;
		manufacturerErrorElement.textContent = errors.manufacturerError;
		dateErrorElement.textContent = errors.dateError;
		quantityErrorElement.textContent = errors.quantityError;

	} else if (!quantity) {
		errors.errorStatus = true,
		errors.nameError = '',
		errors.manufacturerError = '',
		errors.dateError = '',
		errors.quantityError = 'Quantity is required ⚠️',

		nameErrorElement.style.visibility = 'hidden';
		manufacturerErrorElement.style.visibility = 'hidden';
		dateErrorElement.style.visibility = 'hidden';
		quantityErrorElement.style.visibility = 'visible';

		nameErrorElement.textContent = errors.nameError;
		manufacturerErrorElement.textContent = errors.manufacturerError;
		dateErrorElement.textContent = errors.dateError;
		quantityErrorElement.textContent = errors.quantityError;
	} else {
		errors.errorStatus = false,
		errors.nameError = '',
		errors.manufacturerError = '',
		errors.dateError = '',
		errors.quantityError = '',

		nameErrorElement.style.visibility = 'hidden';
		manufacturerErrorElement.style.visibility = 'hidden';
		dateErrorElement.style.visibility = 'hidden';
		quantityErrorElement.style.visibility = 'hidden';

		nameErrorElement.textContent = errors.nameError;
		manufacturerErrorElement.textContent = errors.manufacturerError;
		dateErrorElement.textContent = errors.dateError;
		quantityErrorElement.textContent = errors.quantityError;
	}
	const medicineFormStatus = () => {
		return errors.errorStatus
	}
	return {medicineFormStatus}
}

// export {validateMedicineForm}
