const { errorFactory } = require('../../lib/errors');

const notFoundError = errorFactory('not_found');
// const unauthorizedError = errorFactory('unauthorized');
// const wrongInputError = errorFactory('wrong_input');
const serverError = errorFactory();

module.exports = () => {
	const start = async ({ store }) => {
		const listAll = async user => {
			try {
				const polls = await store.listAll(user);
				return polls;
			} catch (err) {
				throw serverError('Error listing polls');
			}
		};


		const create = async (name, description, options, userRole, user) => {
			try {
				const poll = await store.create(name, description, options, userRole, user);
				return poll;
			} catch (err) {
				throw serverError('Error creating a new poll');
			}
		};


		const details = async (id, userRole, user) => {
			try {
				const poll = await store.details(id, userRole, user);
				return poll;
			} catch (err) {
				if (err.message === 'poll_not_found') throw notFoundError(`Poll: ${id} not found`);
				throw serverError(`Error getting details of poll: ${id}`);
			}
		};


		const vote = async (id, user, option, userRole) => {
			try {
				const poll = await store.updateVotes(id, user, option, userRole);
				return poll;
			} catch (err) {
				if (err.message === 'poll_not_found') throw notFoundError(`Poll: ${id} not found`);
				if (err.message === 'poll_not_active') throw serverError(`Poll: ${id} is inactive`);
				if (err.message === 'user_has_already_voted') throw serverError(`User: ${user} has already voted for poll: ${id}`);
				throw serverError(`Error submitting vote for poll: ${id} - user: ${user} - option: ${option}`);
			}
		};


		const close = async (id, userRole, user) => {
			try {
				const poll = await store.close(id, userRole, user);
				return poll;
			} catch (err) {
				if (err.message === 'poll_not_found') throw notFoundError(`Poll: ${id} not found`);
				if (err.message === 'poll_already_closed') throw serverError(`Poll: ${id} is already closed`);
				throw serverError(`Error closing poll: ${id}`);
			}
		};


		const deleteById = async (id, userRole, user) => {
			try {
				const poll = await store.deleteById(id, userRole, user);
				return poll;
			} catch (err) {
				if (err.message === 'poll_not_found') throw notFoundError(`Poll: ${id} not found`);
				throw serverError(`Error deleting poll: ${id}`);
			}
		};


		return {
			listAll,
			create,
			details,
			vote,
			close,
			deleteById,
		};
	};

	return { start };
};
