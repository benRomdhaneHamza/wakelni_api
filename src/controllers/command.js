import Command from '@/models/command';
import Space from '@/models/space';

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
			total += Number(element.price);
		});
		return total;
	};

	static getCommand(_id) {
		return new Promise((resolve, reject) => {
			Command.findById(_id).exec().then(resolve).catch(reject);
		})
	}

	static updateCommand(_commandId, newMealsList) {
		return new Promise(async (resolve, reject) => {
			const command = await Command.findById(_commandId);
			command.mealsList = newMealsList.map(_obj => _obj._id);
			command.price = this.calculCommandPrice(newMealsList);
			command.save().then(resolve).catch(reject);
		})
	}

	static verifCommandValidity(_space, _mealListIds){
		_mealListIds.forEach(_idMeal => {
			if (String(_idMeal) != String(_space)) return false;
		});
		return true;
	}

	static getUserCommands(_user) {
		return new Promise((resolve, reject) => {
			Command.find({ user: _user })
			.populate({ path: 'mealsList' })
			.populate({ path: 'space' })
			.then(resolve)
			.catch(reject);
		});
	}

	static getCommandsBySpace(_space, _state = undefined) {
		const query = {}
		if (_space) query.space = _space;
		if (_state != 'undefined') query.state = _state;
		return new Promise((resolve, reject) => {
			Command.find(query)
			.populate({ path: 'mealsList' })
			.then(resolve)
			.catch(reject);
		});
	}
}

export default CommandController;