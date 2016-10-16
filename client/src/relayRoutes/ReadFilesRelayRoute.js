import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
	  files: (Component) => Relay.QL`query {
	    readFiles(id: $id) { ${Component.getFragment('files')}
    `,
  };
  static paramDefinitions = {
    // By setting `required` to true, `ProfileRoute` will throw if a `userID`
    // is not supplied when instantiated.
    id: {required: true},
  };
  static routeName = 'ReadFiles';
}
