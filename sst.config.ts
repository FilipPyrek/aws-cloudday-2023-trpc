import { SSTConfig } from 'sst'

import { API } from './stacks/Api'
import { Frontend } from './stacks/Frontend'

const config: SSTConfig = {
	config() {
		return {
			name: 'trpc-demo',
			region: 'eu-central-1',
			stage: 'dev'
		}
	},
	stacks(app) {
		app.stack(API).stack(Frontend)
	}
}

export default config
