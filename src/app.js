import {Person} from './model/Person';
import {Renderer} from './model/Renderer'

global.app = function () {
    var christoph = new Person('Christoph', 'Burgdorf');
    let renderer = new Renderer();
    console.log(christoph.fullName);
};
