import {generationObjects} from './data.js';
import {getAnnouncements} from './markup-generation.js';
import {addInactiveState} from './form.js';

getAnnouncements(generationObjects());

addInactiveState(true);
