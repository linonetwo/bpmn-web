
import { ModelsDatastore, Configuration} from '../';
import { TestAppDelegate } from './appDelegate';
import { IConfiguration, DataStore, ILogger , NoCacheManager} from '../';
import { Logger } from '../'
import { UserService } from '../../userAccess/UserService';
import 'dotenv/config';

let definitionsPath = __dirname + '/../processes/';
export const configuration = new Configuration(
	{
		definitionsPath: definitionsPath,
		templatesPath: __dirname + '/../emailTemplates',
		timers: {
			//forceTimersDelay: 1000,
			precision: 3000,
		},
		database: {
			MongoDB:
			{
				db_url: process.env.MONGO_DB_URL,
				db: 'bpmn'
			}
		},
		apiKey: process.env.API_KEY,
		logger: function (server) {
			new Logger(server);
		},							
		definitions: function (server) {
			return new ModelsDatastore(server);
		},			
		appDelegate: function (server) {
			return new TestAppDelegate(server);
		},		
		dataStore: function (server) {
			return new DataStore(server);
		},
		cacheManager: function (server) {
			return new NoCacheManager(server);
		},
		userService: function (server) {
			return new UserService(server);
		}

	});
