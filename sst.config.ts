import { SSTConfig } from 'sst'

import { API } from './stacks/Api'
import { Frontend } from './stacks/Frontend'
import { Resources } from './stacks/Resources'

const config: SSTConfig = {
	config() {
		return {
			name: 'trpc-demo',
			region: 'eu-central-1',
			stage: 'dev'
		}
	},
	stacks(app) {
		app.setDefaultRemovalPolicy('destroy')

		app.stack(Resources).stack(API).stack(Frontend)
	}
}

export default config
