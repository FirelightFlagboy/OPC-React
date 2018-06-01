import Adapter from 'enzyme-adapter-react-16'
import chai from 'chai'
import enzyme from 'enzyme'
import createChaiEnzyme from 'chai-enzyme'
import createChaiJestDiff from 'chai-jest-diff'
import dirtyChai from 'dirty-chai'

chai
	.use(dirtyChai)
	.use(createChaiJestDiff())
	.use(createChaiEnzyme());

enzyme.configure({ adapter: new Adapter() })
