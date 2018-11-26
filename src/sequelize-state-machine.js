const StateMachine = require('javascript-state-machine');
const capitalize = require('./utils/capitalize');
const camelCase = require('./utils/camelCase');


class SequelizeStateMachine {
  static addStateMachine(Model, options) {
    const { field = 'state', init = 'none', transitions } = options;

    const getFsm = (initState) => {
      return new StateMachine({
        transitions,
        init: initState,
      });
    };

    const states = getFsm(init).allStates();

    const handleInitStateMachine = (instance) => {
      instance[field] = init;
    };
    
    Model.prototype.fsm = function () {
      const initState = this.get(field);

      return getFsm(initState);
    };

    transitions.forEach((transition) => {
      Model.prototype[transition.name] = async function () {
        const fsm = this.fsm();

        if (fsm.can(transition.name)) {
          fsm[transition.name]();
          this.set(field, fsm.state);
          return this.save();
        }
        throw new Error('transition not allowed from that state');
      };
    });

    states.forEach((state) => {
      const capitalizedState = capitalize(camelCase(state));
      Model.prototype[`is${capitalizedState}`] = function () {
        const fsm = this.fsm();

        return fsm.is(state);
      };
    });

    Model.beforeCreate('handleInitStateMachine', handleInitStateMachine);
  }
}

module.exports = SequelizeStateMachine;
