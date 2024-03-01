//ARRAYS TO STORE THE INFORMATION IN
const liquids = [];
const tablets = [];
const capsules = [];
const topicals = [];

//SELECTING THE ELEMENTS FROM THE DOM
const mainContainer = document.querySelector('.main-container');
const pharmacyForm = document.querySelector('.pharmacy-form');
const pharmacyList = document.querySelector('.pharmacy-list');
const headerText = document.querySelector('.header-text');

const productName = document.querySelector('.product-name');
const id = document.querySelector('.product-id');
const manufacturer = document.querySelector('.manufacturer');
const date = document.querySelector('.expiration-date');
const quantity = document.querySelector('.quantity');
const selectElement = document.querySelector('.medicine-type');

const liquidsContainer = document.querySelector('.display-liquids-info');
const tabletsContainer = document.querySelector('.display-tablets-info');
const capsulesContainer = document.querySelector('.display-capsules-info');
const topicalsContainer = document.querySelector('.display-topicals-info');


const displayLiquidMedicineContainer = document.querySelector('.display-liquid-medicine');
const displayTabletMedicineContainer = document.querySelector('.display-tablet-medicine');
const displayCapsuleMedicineContainer = document.querySelector('.display-capsule-medicine');
const displayTopicalMedicineContainer = document.querySelector('.display-topical-medicine');

const renderLiquidMedicineButton = document.querySelector('.render-liquids-button');
const renderTabletMedicineButton = document.querySelector('.render-tablets-button');
const renderCapsuleMedicineButton = document.querySelector('.render-capsules-button');
const renderTopicalMedicineButton = document.querySelector('.render-topicals-button');

const navigateToRegistrationButton = document.querySelector('.navigate-to-form-button');
const navigateToDisplayPageButton = document.querySelector('.navigate-to-display-button');


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
});


pharmacyForm.addEventListener('submit', (e)=> {
	e.preventDefault();
	let newMedicine;
	if(selectElement.value === 'liquid') {
		newMedicine = new Liquid (
			productName.value,
			id.value,
			manufacturer.value,
			date.value,
			quantity.value, 
			selectElement.value
		);
	} else if(selectElement.value === 'tablet') {
		newMedicine = new Tablet (
			productName.value,
			id.value,
			manufacturer.value,
			date.value,
			quantity.value, 
			selectElement.value
		);
	} else if (selectElement.value === 'capsule'){
		newMedicine = new Capsule (
			productName.value,
			id.value,
			manufacturer.value,
			date.value,
			quantity.value, 
			selectElement.value
		);
	} else {
		newMedicine = new Topical (
			productName.value,
			id.value,
			manufacturer.value,
			date.value,
			quantity.value, 
			selectElement.value
		);
	}
	Liquid.addMedicine(newMedicine);
	pharmacyForm.reset();
	console.log(newMedicine);
});

renderLiquidMedicineButton.addEventListener('click', ()=> {
	UI.activeTab = 'liquid';
	UI.renderLiquids(liquids);
	removeActiveClasses()
	renderLiquidMedicineButton.classList.add('render-liquids-button--active');
})

renderTabletMedicineButton.addEventListener('click', ()=> {
	UI.activeTab = 'tablet';
	UI.renderTablets(tablets);
	removeActiveClasses()
	renderTabletMedicineButton.classList.add('render-tablets-button--active');
})

renderCapsuleMedicineButton.addEventListener('click', ()=> {
	UI.activeTab = 'capsule';
	UI.renderCapsules(capsules);
	removeActiveClasses()
	renderCapsuleMedicineButton.classList.add('render-capsules-button--active');
})

renderTopicalMedicineButton.addEventListener('click', ()=> {
	UI.activeTab = 'topical';
	UI.renderTopicals(topicals);
	removeActiveClasses()
	renderTopicalMedicineButton.classList.add('render-topicals-button--active');
})

const removeActiveClasses = () => {
	renderLiquidMedicineButton.classList.remove('render-liquids-button--active');
    renderTabletMedicineButton.classList.remove('render-tablets-button--active');
    renderCapsuleMedicineButton.classList.remove('render-capsules-button--active');
	renderTopicalMedicineButton.classList.remove('render-topicals-button--active');
}

//DECLARING THE LIQUID MEDICINE CLASS
class Liquid {
	constructor(name, id, manufacturer, date, quantity, type){
		this.name = name;
		this.id = id;
		this.manufacturer = manufacturer;
		this.date = date;
		this.quantity = quantity;
		this.type = type;
		this.ID = Date.now();
	} 
	static addMedicine(medicine) {
		if (medicine.type === 'liquid') {
			liquids.push(medicine);
		} else if (medicine.type === 'tablet') {
			tablets.push(medicine);
		} else if (medicine.type === 'capsule'){
			capsules.push(medicine);
		} else {
			topicals.push(medicine);
		}
	}

	//DELETE METHOD
	static deleteMedicine(id, liquidsArray) {
		const index = liquidsArray.findIndex(medicine => medicine.ID.toString() === id.toString());
		if(index !== -1) {
			liquidsArray.splice(index, 1);
			if(UI.activeTab === 'liquid') {
				UI.renderLiquids(liquids)
			} else if (UI.activeTab === 'tablet') {
				UI.renderTablets(tablets)
			} else if (UI.activeTab === 'capsule') {
				UI.renderCapsules(capsules) 
			} else {
				UI.renderTopicals(topicals)
			}
		}
	}
}

//DECLARING THE TABLET CLASS
class Tablet extends Liquid {
	constructor(name, id, manufacturer, date, quantity, type){
		super(name, id, manufacturer, date, quantity, type);
		this.ID = Date.now();
	}
}

//DECLARING THE CAPSULE CLASS
class Capsule extends Liquid {
	constructor(name, id, manufacturer, date, quantity, type){
		super(name, id, manufacturer, date, quantity, type);
		this.ID = Date.now();
	}
}

//DECLARING THE TOPICAL CLASS
class Topical extends Liquid {
	constructor(name, id, manufacturer, date, quantity, type){
		super(name, id, manufacturer, date, quantity, type);
		this.ID = Date.now();
	}
}

//DECLARE THE UI CLASS
class UI {
	static activeTab = 'liquid';
	static renderLiquids(liquids) {
		
		displayTabletMedicineContainer.style.display = 'none';
		displayCapsuleMedicineContainer.style.display = 'none';
		displayTopicalMedicineContainer.style.display = 'none';
		
		displayLiquidMedicineContainer.style.display = 'flex';
		liquidsContainer.style.display = 'flex';
		liquidsContainer.textContent = '';
		if (UI.activeTab === 'liquid') {

			liquids.forEach((liquid) => {
				const listDiv = document.createElement('div');
				const renderedName = document.createElement('span');
				const renderedID = document.createElement('span');
				const renderedManufacturer = document.createElement('span');
				const renderedDate = document.createElement('span');
				const renderedQuantity = document.createElement('span');
				const renderedType = document.createElement('span');

				const buttonContainer = document.createElement('div');
				const deleteButton = document.createElement('button');
				const trashCan = document.createElement('img');
				const updateButton = document.createElement('button');
				const penImage = document.createElement('img');

				renderedName.textContent = `Product name: ${liquid.name}`;
				renderedID.textContent = `Product ID: ${liquid.id}`;
				renderedManufacturer.textContent = `Manufacturer: ${liquid.manufacturer}`;
				renderedDate.textContent = `Expiration date: ${liquid.date}`;
				renderedQuantity.textContent = `Quantity: ${liquid.quantity}`;
				renderedType.textContent = `Type of medicine: ${liquid.type}`;
				updateButton.textContent = 'Update';
				penImage.src = `./assets/pen-sharp-regular.svg`;
				deleteButton.textContent = 'Delete';
				trashCan.src = `./assets/trash-sharp-regular.svg`;

				listDiv.classList.add('liquid-medicine-div');
				buttonContainer.classList.add('delete-button-container');
				deleteButton.classList.add('delete-button');
				trashCan.classList.add('trash-can-image');
				updateButton.classList.add('update-button');
				penImage.classList.add('pen-image');

				listDiv.dataset.id = liquid.ID;

				liquidsContainer.append(listDiv, buttonContainer);
				listDiv.append(renderedName, renderedID, renderedManufacturer, renderedDate, renderedQuantity, renderedType);
				buttonContainer.append(updateButton, deleteButton);
				deleteButton.append(trashCan);
				updateButton.append(penImage);

				deleteButton.addEventListener('click', (e) => {
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
					Liquid.deleteMedicine(rowID, liquids);
				})

			});
		}
	}

	//--------------------------------------------------------------------
	static renderTablets(tablets) {

		tabletsContainer.textContent = '';
		displayLiquidMedicineContainer.style.display = 'none';
		displayCapsuleMedicineContainer.style.display = 'none';
		displayTopicalMedicineContainer.style.display = 'none';

		displayTabletMedicineContainer.style.display = 'flex';
		tabletsContainer.style.display = 'flex';
		tabletsContainer.textContent = '';

		if(UI.activeTab === 'tablet'){
			tablets.forEach(tablet => {
				const listDiv = document.createElement('div');
				const renderedName = document.createElement('span');
				const renderedID = document.createElement('span');
				const renderedManufacturer = document.createElement('span');
				const renderedDate = document.createElement('span');
				const renderedQuantity = document.createElement('span');
				const renderedType = document.createElement('span');

				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button');
				const trashCan = document.createElement('img');
				const updateButton = document.createElement('button');
				const penImage = document.createElement('img');

				renderedName.textContent = `Product name: ${tablet.name}`;
				renderedID.textContent = `Product ID: ${tablet.id}`;
				renderedManufacturer.textContent = `Manufacturer: ${tablet.manufacturer}`;
				renderedDate.textContent = `Expiration date: ${tablet.date}`;
				renderedQuantity.textContent = `Quantity: ${tablet.quantity}`;
				renderedType.textContent = `Type of medicine: ${tablet.type}`;
				updateButton.textContent = 'Update';
				penImage.src = `./assets/pen-sharp-regular.svg`;
				deleteButton.textContent = 'Delete';
				trashCan.src = `./assets/trash-sharp-regular.svg`;

				listDiv.classList.add('tablet-medicine-div');
				deleteButtonContainer.classList.add('delete-button-container');
				deleteButton.classList.add('delete-button');
				trashCan.classList.add('trash-can-image');
				updateButton.classList.add('update-button');
				penImage.classList.add('pen-image');

				listDiv.dataset.id = tablet.ID;

				tabletsContainer.append(listDiv, deleteButtonContainer);
				listDiv.append(renderedName, renderedID, renderedManufacturer, renderedDate, renderedQuantity, renderedType);
				deleteButtonContainer.append(updateButton, deleteButton);
				deleteButton.append(trashCan);
				updateButton.append(penImage);

				deleteButton.addEventListener('click', (e) => {
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
					Tablet.deleteMedicine(rowID, tablets);
				})
			});
		}
	}
	//--------------------------------------------------------------------
	static renderCapsules(capsules) {
		capsulesContainer.textContent = '';
		displayLiquidMedicineContainer.style.display = 'none';
		displayTabletMedicineContainer.style.display = 'none';
		displayTopicalMedicineContainer.style.display = 'none';

		displayCapsuleMedicineContainer.style.display = 'flex';
		capsulesContainer.style.display = 'flex';
		capsulesContainer.textContent = '';

		if(UI.activeTab === 'capsule'){
			capsules.forEach(capsule => {
				const listDiv = document.createElement('div');
				const renderedName = document.createElement('span');
				const renderedID = document.createElement('span');
				const renderedManufacturer = document.createElement('span');
				const renderedDate = document.createElement('span');
				const renderedQuantity = document.createElement('span');
				const renderedType = document.createElement('span');

				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button');
				const trashCan = document.createElement('img');
				const updateButton = document.createElement('button');
				const penImage = document.createElement('img');

				renderedName.textContent = `Product name: ${capsule.name}`;
				renderedID.textContent = `Product ID: ${capsule.id}`;
				renderedManufacturer.textContent = `Manufacturer: ${capsule.manufacturer}`;
				renderedDate.textContent = `Expiration date: ${capsule.date}`;
				renderedQuantity.textContent = `Quantity: ${capsule.quantity}`;
				renderedType.textContent = `Type of medicine: ${capsule.type}`;
				updateButton.textContent = 'Update';
				penImage.src = `./assets/pen-sharp-regular.svg`;
				deleteButton.textContent = 'Delete';
				trashCan.src = `./assets/trash-sharp-regular.svg`;

				listDiv.classList.add('capsule-medicine-div');
				deleteButtonContainer.classList.add('delete-button-container');
				deleteButton.classList.add('delete-button');
				trashCan.classList.add('trash-can-image');
				updateButton.classList.add('update-button');
				penImage.classList.add('pen-image');

				listDiv.dataset.id = capsule.ID;

				capsulesContainer.append(listDiv, deleteButtonContainer);
				listDiv.append(renderedName, renderedID, renderedManufacturer, renderedDate, renderedQuantity, renderedType);
				deleteButtonContainer.append(updateButton, deleteButton);
				deleteButton.append(trashCan);
				updateButton.append(penImage);

				deleteButton.addEventListener('click', (e) => {
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
					Capsule.deleteMedicine(rowID, capsules);
				})
			});
		}
	}		
	//--------------------------------------------------------------------
	static renderTopicals(topicals) {
		topicalsContainer.textContent = '';
		displayLiquidMedicineContainer.style.display = 'none';
		displayTabletMedicineContainer.style.display = 'none';
		displayCapsuleMedicineContainer.style.display = 'none';

		displayTopicalMedicineContainer.style.display = 'flex';
		topicalsContainer.style.display = 'flex';
		topicalsContainer.textContent = '';

		if(UI.activeTab === 'topical'){
			topicals.forEach(topical => {
				const listDiv = document.createElement('div');
				const renderedName = document.createElement('span');
				const renderedID = document.createElement('span');
				const renderedManufacturer = document.createElement('span');
				const renderedDate = document.createElement('span');
				const renderedQuantity = document.createElement('span');
				const renderedType = document.createElement('span');
				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button');
				const trashCan = document.createElement('img');
				const updateButton = document.createElement('button');
				const penImage = document.createElement('img');

				renderedName.textContent = `Product name: ${topical.name}`;
				renderedID.textContent = `Product ID: ${topical.id}`;
				renderedManufacturer.textContent = `Manufacturer: ${topical.manufacturer}`;
				renderedDate.textContent = `Expiration date: ${topical.date}`;
				renderedQuantity.textContent = `Quantity: ${topical.quantity}`;
				renderedType.textContent = `Type of medicine: ${topical.type}`;
				updateButton.textContent = 'Update';
				penImage.src = `./assets/pen-sharp-regular.svg`;
				deleteButton.textContent = 'Delete';
				trashCan.src = `./assets/trash-sharp-regular.svg`;

				listDiv.classList.add('topical-medicine-div');
				deleteButtonContainer.classList.add('delete-button-container');
				deleteButton.classList.add('delete-button');
				trashCan.classList.add('trash-can-image');
				updateButton.classList.add('update-button');
				penImage.classList.add('pen-image');

				listDiv.dataset.id = topical.ID;

				topicalsContainer.append(listDiv, deleteButtonContainer);
				listDiv.append(renderedName, renderedID, renderedManufacturer, renderedDate, renderedQuantity, renderedType);
				deleteButtonContainer.append(updateButton, deleteButton);
				deleteButton.append(trashCan);
				updateButton.append(penImage);

				deleteButton.addEventListener('click', (e) => {
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
					Topical.deleteMedicine(rowID, topicals);
				})
			});
		}
	}		
}
