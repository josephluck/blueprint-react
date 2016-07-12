import choo from 'choo';
import html from 'choo/html';
const Application = choo()

import AppModel from './models/App';
Application.model(AppModel);

import AppView from './pages/App';

Application.router((route) => [
  route('/', AppView)
])

const tree = Application.start()
document.body.appendChild(tree)
