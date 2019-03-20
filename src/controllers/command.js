import Command from '@/models/command';

class CommandController {

	static passCommand(_user, _space, _mealList) {
		return new Promise((resolve, reject) => {
			const newCommand = new Command({
				user: _user,
				space: _space,
				mealsList: _mealList.map(_obj => _obj._id),
				price: this.calculCommandPrice(_mealList)
			});
			newCommand.save().then(resolve).catch(reject);
		});
	};

	static calculCommandPrice(_mealList) {
		let total = 0;
		_mealList.forEach(element => {
			total += element.price;
		});
		return total;
	};
}

export default CommandController;