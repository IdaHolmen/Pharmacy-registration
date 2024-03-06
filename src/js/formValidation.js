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

export {validateMedicineForm}
