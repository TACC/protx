import * as _ from 'underscore';

export default class WorkbenchCtrl {

  constructor(systems) {
    'ngInject';
    this.systems = systems;
    this.mydata_system = _.find(this.systems, {name:'My Data'});
  }
}
