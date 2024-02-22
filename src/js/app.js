//ARRAYS TO STORE THE INFORMATION IN
const liquids = [];
const tablets = [];
const capsules = [];
const topicals = [];

//SELECTING THE ELEMENTS FROM THE DOM
const pharmacyForm = document.querySelector('.pharmacy-form');

const productName = document.querySelector('.product-name');
const id = document.querySelector('.product-id');
const manufacturer = document.querySelector('.manufacturer');
const date = document.querySelector('.expiration-date');
const quantity = document.querySelector('.quantity');
const selectElement = document.querySelector('.medicine-type');

const liquidsUl = document.querySelector('.liquid-medicine-list');
const tabletsUl = document.querySelector('.tablet-medicine-list');
const capsulesUl = document.querySelector('.capsule-medicine-list');
const topicalsUl = document.querySelector('.topical-medicine-list');


const displayLiquidMedicineContainer = document.querySelector('.display-liquid-medicine');
const displayTabletMedicineContainer = document.querySelector('.display-tablet-medicine');
const displayCapsuleMedicineContainer = document.querySelector('.display-capsule-medicine');
const displayTopicalMedicineContainer = document.querySelector('.display-topical-medicine');

const renderLiquidMedicineButton = document.querySelector('.render-liquids-button');
const renderTabletMedicineButton = document.querySelector('.render-tablets-button');
const renderCapsuleMedicineButton = document.querySelector('.render-capsules-button');
const renderTopicalMedicineButton = document.querySelector('.render-topicals-button');


//ADDING EVENT LISTENERS
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
	renderLiquidMedicineButton.classList.add('render-liquids-button--active');

	if (UI.activeTab !== 'liquid') {
		renderLiquidMedicineButton.classList.remove('render-liquids-button--active');
	}
})

renderTabletMedicineButton.addEventListener('click', ()=> {
	UI.activeTab = 'tablet';
	UI.renderTablets(tablets);
	renderTabletMedicineButton.classList.add('render-tablets-button--active');

	if (UI.activeTab !== 'tablet') {
		renderTabletMedicineButton.classList.remove('render-tablets-button--active');
	}
})

renderCapsuleMedicineButton.addEventListener('click', ()=> {
	UI.activeTab = 'capsule';
	UI.renderCapsules(capsules);
	renderCapsuleMedicineButton.classList.add('render-capsules-button--active');

	if (UI.activeTab !== 'capsule') {
		renderCapsuleMedicineButton.classList.remove('render-capsules-button--active');
	}
})

renderTopicalMedicineButton.addEventListener('click', ()=> {
	UI.activeTab = 'topical';
	UI.renderTopicals(topicals);
	renderTopicalMedicineButton.classList.add('render-topicals-button--active');

	if (UI.activeTab !== 'topical') {
		renderTopicalMedicineButton.classList.remove('render-topicals-button--active');
	}
})

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
		
		displayLiquidMedicineContainer.style.display = 'block';
		liquidsUl.textContent = '';
		if (UI.activeTab === 'liquid') {

			liquids.forEach((liquid) => {
				const listRow = document.createElement('li');
				const renderedName = document.createElement('span');
				const renderedID = document.createElement('span');
				const renderedManufacturer = document.createElement('span');
				const renderedDate = document.createElement('span');
				const renderedQuantity = document.createElement('span');
				const renderedType = document.createElement('span');
				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button');

				renderedName.textContent = liquid.name;
				renderedID.textContent = liquid.id;
				renderedManufacturer.textContent = liquid.manufacturer;
				renderedDate.textContent = liquid.date;
				renderedQuantity.textContent = liquid.quantity;
				renderedType.textContent = liquid.type;
				deleteButton.textContent = '';

				listRow.classList.add('liquid-medicine-row');
				deleteButton.classList.add('delete-button');

				listRow.dataset.id = liquid.ID;

				liquidsUl.append(listRow);
				listRow.append(renderedName, renderedID, renderedManufacturer, renderedDate, renderedQuantity, renderedType, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton);

				deleteButton.addEventListener('click', (e) => {
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
					Liquid.deleteMedicine(rowID, liquids);
				})

			});
		}
	}

	//--------------------------------------------------------------------
	static renderTablets(tablets) {
		tabletsUl.textContent = '';
		displayLiquidMedicineContainer.style.display = 'none';
		displayCapsuleMedicineContainer.style.display = 'none';
		displayTopicalMedicineContainer.style.display = 'none';

		displayTabletMedicineContainer.style.display = 'block';

		if(UI.activeTab === 'tablet'){
			tablets.forEach(tablet => {
				const listRow = document.createElement('li');
				const renderedName = document.createElement('span');
				const renderedID = document.createElement('span');
				const renderedManufacturer = document.createElement('span');
				const renderedDate = document.createElement('span');
				const renderedQuantity = document.createElement('span');
				const renderedType = document.createElement('span');
				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button');

				renderedName.textContent = tablet.name;
				renderedID.textContent = tablet.id;
				renderedManufacturer.textContent = tablet.manufacturer;
				renderedDate.textContent = tablet.date;
				renderedQuantity.textContent = tablet.quantity;
				renderedType.textContent = tablet.type;
				deleteButton.textContent = '';

				listRow.classList.add('tablet-medicine-row');
				deleteButton.classList.add('delete-button');

				listRow.dataset.id = tablet.ID;

				tabletsUl.append(listRow);
				listRow.append(renderedName, renderedID, renderedManufacturer, renderedDate, renderedQuantity, renderedType, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton);

				deleteButton.addEventListener('click', (e) => {
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
					Tablet.deleteMedicine(rowID, tablets);
				})
			});
		}
	}
	//--------------------------------------------------------------------
	static renderCapsules(capsules) {
		capsulesUl.textContent = '';
		displayLiquidMedicineContainer.style.display = 'none';
		displayTabletMedicineContainer.style.display = 'none';
		displayTopicalMedicineContainer.style.display = 'none';

		displayCapsuleMedicineContainer.style.display = 'block';

		if(UI.activeTab === 'capsule'){
			capsules.forEach(capsule => {
				const listRow = document.createElement('li');
				const renderedName = document.createElement('span');
				const renderedID = document.createElement('span');
				const renderedManufacturer = document.createElement('span');
				const renderedDate = document.createElement('span');
				const renderedQuantity = document.createElement('span');
				const renderedType = document.createElement('span');
				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button');

				renderedName.textContent = capsule.name;
				renderedID.textContent = capsule.id;
				renderedManufacturer.textContent = capsule.manufacturer;
				renderedDate.textContent = capsule.date;
				renderedQuantity.textContent = capsule.quantity;
				renderedType.textContent = capsule.type;
				deleteButton.textContent = '';

				listRow.classList.add('capsule-medicine-row');
				deleteButton.classList.add('delete-button');

				listRow.dataset.id = capsule.ID;

				capsulesUl.append(listRow);
				listRow.append(renderedName, renderedID, renderedManufacturer, renderedDate, renderedQuantity, renderedType, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton);

				deleteButton.addEventListener('click', (e) => {
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
					Capsule.deleteMedicine(rowID, capsules);
				})
			});
		}
	}		
	//--------------------------------------------------------------------
	static renderTopicals(topicals) {
		topicalsUl.textContent = '';
		displayLiquidMedicineContainer.style.display = 'none';
		displayTabletMedicineContainer.style.display = 'none';
		displayCapsuleMedicineContainer.style.display = 'none';

		displayTopicalMedicineContainer.style.display = 'block';

		if(UI.activeTab === 'topical'){
			topicals.forEach(topical => {
				const listRow = document.createElement('li');
				const renderedName = document.createElement('span');
				const renderedID = document.createElement('span');
				const renderedManufacturer = document.createElement('span');
				const renderedDate = document.createElement('span');
				const renderedQuantity = document.createElement('span');
				const renderedType = document.createElement('span');
				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button');

				renderedName.textContent = topical.name;
				renderedID.textContent = topical.id;
				renderedManufacturer.textContent = topical.manufacturer;
				renderedDate.textContent = topical.date;
				renderedQuantity.textContent = topical.quantity;
				renderedType.textContent = topical.type;
				deleteButton.textContent = '';

				listRow.classList.add('topical-medicine-row');
				deleteButton.classList.add('delete-button');

				listRow.dataset.id = topical.ID;

				topicalsUl.append(listRow);
				listRow.append(renderedName, renderedID, renderedManufacturer, renderedDate, renderedQuantity, renderedType, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton);

				deleteButton.addEventListener('click', (e) => {
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
					Topical.deleteMedicine(rowID, topicals);
				})
			});
		}
	}		
}
