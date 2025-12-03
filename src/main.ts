import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './template/ListTemplate';

const initApp = (): void => {
	const fullList = FullList.instance;
	const template = ListTemplate.instance;

	const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;

	itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
		event.preventDefault();

		const input = document.getElementById("newItem") as HTMLInputElement;

		const newEntryText: string = input.value.trim();

		if(!newEntryText) return;

		// Calculate ItemId
		const itemId: number = fullList.list.length
		? parseInt((fullList.list[fullList.list.length - 1]).id) + 1 : 1;

		// Create new list entry with newEntryText and itemId
		const newItem = new ListItem(itemId.toString(), newEntryText);

		// Add new item to the fullList
		fullList.addItem(newItem);

		// Render fullList with new item
		template.render(fullList);

	});

	const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;

	clearItems.addEventListener("click", (): void => {
		fullList.clearList();
		template.clear();
	})

	fullList.load();
	template.render(fullList);
}

document.addEventListener("DOMContentLoaded", initApp);